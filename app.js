/**
 * Trabajo Final JS — Consulta del Clima
 *
 * Aplicación que consume la API de Open-Meteo para geocodificar
 * ciudades y mostrar el clima actual mediante manipulación del DOM.
 */

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const SAMPLE_CITIES = [
  "Ciudad de México",
  "Madrid",
  "Tokio",
  "Buenos Aires",
  "París",
  "Lima",
  "Bogotá",
];

const WEATHER_CODES = {
  0: { label: "Despejado", icon: "☀️" },
  1: { label: "Mayormente despejado", icon: "🌤️" },
  2: { label: "Parcialmente nublado", icon: "⛅" },
  3: { label: "Nublado", icon: "☁️" },
  45: { label: "Niebla", icon: "🌫️" },
  48: { label: "Niebla con escarcha", icon: "🌫️" },
  51: { label: "Llovizna ligera", icon: "🌦️" },
  53: { label: "Llovizna moderada", icon: "🌦️" },
  55: { label: "Llovizna intensa", icon: "🌧️" },
  61: { label: "Lluvia ligera", icon: "🌧️" },
  63: { label: "Lluvia moderada", icon: "🌧️" },
  65: { label: "Lluvia intensa", icon: "🌧️" },
  71: { label: "Nieve ligera", icon: "🌨️" },
  73: { label: "Nieve moderada", icon: "🌨️" },
  75: { label: "Nieve intensa", icon: "❄️" },
  80: { label: "Chubascos ligeros", icon: "🌦️" },
  81: { label: "Chubascos moderados", icon: "🌧️" },
  82: { label: "Chubascos fuertes", icon: "⛈️" },
  95: { label: "Tormenta", icon: "⛈️" },
};

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const sampleBtn = document.getElementById("sample-btn");
const statusMessage = document.getElementById("status-message");
const weatherSection = document.getElementById("weather-section");
const weatherCard = document.getElementById("weather-card");

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = "status";

  if (type) {
    statusMessage.classList.add(`status--${type}`);
  }
}

function showLoading() {
  setStatus("Consultando datos del clima...", "loading");
  searchBtn.disabled = true;
  sampleBtn.disabled = true;
}

function hideLoading() {
  searchBtn.disabled = false;
  sampleBtn.disabled = false;
}

function hideWeather() {
  weatherCard.replaceChildren();
  weatherSection.classList.add("weather--hidden");
}

function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? { label: "Condición desconocida", icon: "🌡️" };
}

function createDetailRow(label, value) {
  const row = document.createElement("div");
  row.classList.add("weather-card__detail");

  const labelEl = document.createElement("span");
  labelEl.classList.add("weather-card__label");
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.classList.add("weather-card__value");
  valueEl.textContent = value;

  row.append(labelEl, valueEl);
  return row;
}

function renderWeather(location, weather) {
  hideWeather();

  const current = weather.current;
  const weatherInfo = getWeatherInfo(current.weather_code);

  const header = document.createElement("div");
  header.classList.add("weather-card__header");

  const cityName = document.createElement("h2");
  cityName.classList.add("weather-card__city");
  cityName.textContent = location.name;

  const region = document.createElement("p");
  region.classList.add("weather-card__region");
  region.textContent = [location.admin1, location.country].filter(Boolean).join(", ");

  header.append(cityName, region);

  const main = document.createElement("div");
  main.classList.add("weather-card__main");

  const icon = document.createElement("span");
  icon.classList.add("weather-card__icon");
  icon.textContent = weatherInfo.icon;

  const condition = document.createElement("p");
  condition.classList.add("weather-card__condition");
  condition.textContent = weatherInfo.label;

  const temperature = document.createElement("p");
  temperature.classList.add("weather-card__temp");
  temperature.textContent = `${Math.round(current.temperature_2m)} °C`;

  main.append(icon, condition, temperature);

  const grid = document.createElement("div");
  grid.classList.add("weather-card__grid");
  grid.append(
    createDetailRow("Sensación térmica", `${Math.round(current.apparent_temperature)} °C`),
    createDetailRow("Humedad", `${current.relative_humidity_2m} %`),
    createDetailRow("Viento", `${Math.round(current.wind_speed_10m)} km/h`),
    createDetailRow("Zona horaria", weather.timezone ?? "No disponible")
  );

  weatherCard.append(header, main, grid);
  weatherSection.classList.remove("weather--hidden");
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error del servidor (${response.status}). Intenta de nuevo más tarde.`);
  }

  return response.json();
}

async function geocodeCity(cityName) {
  const url = `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=es&format=json`;
  const data = await fetchJson(url);

  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontró la ciudad. Verifica el nombre e intenta de nuevo.");
  }

  return data.results[0];
}

async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    timezone: "auto",
  });

  const url = `${WEATHER_API}?${params.toString()}`;
  return fetchJson(url);
}

async function searchWeather(cityName) {
  const query = cityName.trim();

  if (query === "") {
    setStatus("Escribe el nombre de una ciudad para consultar.", "error");
    cityInput.focus();
    return;
  }

  showLoading();
  hideWeather();

  try {
    const location = await geocodeCity(query);
    const weather = await fetchWeather(location.latitude, location.longitude);

    if (!weather.current) {
      throw new Error("La API no devolvió datos de clima actuales.");
    }

    renderWeather(location, weather);
    setStatus(`Clima actualizado para ${location.name}.`, "success");
  } catch (error) {
    setStatus(error.message || "Ocurrió un error inesperado.", "error");
  } finally {
    hideLoading();
  }
}

function loadSampleCity() {
  const randomCity = SAMPLE_CITIES[Math.floor(Math.random() * SAMPLE_CITIES.length)];
  cityInput.value = randomCity;
  searchWeather(randomCity);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchWeather(cityInput.value);
});

sampleBtn.addEventListener("click", () => {
  loadSampleCity();
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cityInput.value = "";
    hideWeather();
    setStatus("");
    cityInput.focus();
  }
});

setStatus("Escribe una ciudad y presiona Consultar para comenzar.");
