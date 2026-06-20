# Trabajo Final JS — Consulta del Clima

Aplicación web que consume la [Open-Meteo API](https://open-meteo.com/) para geocodificar ciudades y mostrar el clima actual. Desarrollada con HTML, CSS y JavaScript vanilla.

## Funcionalidades

- Buscar el clima de una ciudad por nombre
- Geocodificación y consulta meteorológica mediante API externa con `fetch`
- Mostrar temperatura, sensación térmica, humedad, viento y condición del cielo
- Botón de ejemplo aleatorio para probar ciudades
- Manejo de errores (ciudad no encontrada, fallos de red, respuestas inválidas)
- Diseño responsive para móvil y escritorio

## Estructura del proyecto

```
trabajo-final-js/
├── index.html    # Estructura HTML semántica
├── styles.css    # Estilos y diseño responsive
├── app.js        # Lógica, eventos y consumo de API
└── README.md
```

## Cómo ejecutar

1. Abre `index.html` en tu navegador (doble clic o arrastrando el archivo).
2. Escribe una ciudad (ej.: `Ciudad de México`, `Madrid`, `Tokio`) y presiona **Consultar**.
3. También puedes usar **Ejemplo aleatorio** para cargar una ciudad de muestra.
4. Opcional: usa una extensión Live Server en VS Code/Cursor para recarga automática.

> **Nota:** Se requiere conexión a internet para consumir la API.

## Repositorio en GitHub

Para cumplir los criterios de entrega (3 pts + 3 pts), sube esta carpeta a un repositorio **público** en GitHub y comparte la URL en la entrega del curso.

## API utilizada

- **Open-Meteo** — `https://open-meteo.com/`
- No requiere API key
- Geocodificación: `https://geocoding-api.open-meteo.com/v1/search`
- Clima: `https://api.open-meteo.com/v1/forecast`

## Checklist — Lista de cotejo (50 pts)

| # | Criterio | Pts | Estado |
|---|----------|-----|--------|
| 1 | Entrega de URL de repositorio GitHub | 3 | Pendiente (subir a GitHub) |
| 2 | Repositorio público y accesible | 3 | Pendiente (subir a GitHub) |
| 3 | Estructura HTML organizada y semántica | 4 | ✅ |
| 4 | Estilos CSS organizados y visualmente apropiados | 4 | ✅ |
| 5 | Diseño responsive (móvil y escritorio) | 5 | ✅ |
| 6 | JavaScript en archivos separados | 3 | ✅ |
| 7 | Eventos con `addEventListener()` | 5 | ✅ |
| 8 | Manipulación correcta de elementos del DOM | 6 | ✅ |
| 9 | Consumo de API externa con `fetch` | 8 | ✅ |
| 10 | Visualización correcta de datos de la API | 4 | ✅ |
| 11 | Manejo básico de errores en peticiones | 2 | ✅ |
| 12 | Código organizado, indentado y documentado | 2 | ✅ |
| 13 | Archivo README con descripción del proyecto | 1 | ✅ |

## Tecnologías utilizadas

### HTML
- Etiquetas semánticas: `main`, `header`, `section`, `form`, `article`
- Atributos de accesibilidad: `aria-label`, `aria-live`, `role="status"`

### CSS
- Variables CSS, grid responsive y media queries
- Breakpoints: 480px y 520px

### JavaScript
- `fetch()` — peticiones HTTP a la API
- `addEventListener()` — submit, click y keydown
- `document.getElementById()`, `createElement()`, `append()`, `replaceChildren()`
- `classList.add()`, `classList.remove()`
- `try/catch` — manejo de errores de red y respuestas HTTP

## Autor

Rusbel Monegro
