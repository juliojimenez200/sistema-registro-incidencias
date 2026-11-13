# Sistema de Registro de Incidencias

Aplicación web para registrar, listar y filtrar las incidencias reportadas por los usuarios de una empresa de desarrollo de software. Proyecto desarrollado como actividad práctica grupal de la asignatura **Gestión de la Configuración del Software** (Unidad 3 – Despliegue continuo).

🔗 **Demo en línea:** `https://<usuario-o-organizacion>.github.io/<nombre-del-repositorio>/`
*(Reemplazar con la URL real una vez publicado en GitHub Pages — ver sección "Despliegue").*

## Descripción del proyecto

La aplicación permite:

- Registrar una nueva incidencia indicando título, descripción y estado.
- Listar todas las incidencias registradas.
- Filtrar las incidencias por estado (`Abierta`, `En progreso`, `Cerrada`).
- Eliminar una incidencia del listado.

Es una aplicación 100% **frontend** (HTML, CSS y JavaScript puro), sin backend ni base de datos: los datos se guardan en el `localStorage` del navegador. Esto permite desplegarla directamente en **GitHub Pages**, que solo sirve archivos estáticos.

## Historial de versiones

| Versión | Descripción |
|---|---|
| `v1.0.0` | Versión inicial: registro y listado de incidencias. |
| `v1.1.0` | Nueva funcionalidad: estado de la incidencia y filtro por estado. |
| `v1.1.1` | Corrección de un error al eliminar una incidencia con un filtro activo. |

Las notas detalladas de cada versión están en [`RELEASE_NOTES.md`](./RELEASE_NOTES.md).

## Estructura del repositorio

```
.
├── index.html              # Página principal (versión vigente)
├── style.css               # Estilos de la aplicación
├── script.js                # Lógica de la aplicación
├── versiones/                # Snapshot de cada versión, para referencia y comparación
│   ├── v1.0.0/
│   ├── v1.1.0/
│   └── v1.1.1/
├── .github/workflows/
│   └── deploy.yml           # Workflow de validación y despliegue continuo
├── RELEASE_NOTES.md         # Notas de versión de cada release
├── ISSUE_EJEMPLO.md          # Ejemplo de incidencia (bug) usada en la Fase 4
├── GUIA_GIT_GITHUB.md       # Guía de comandos Git/GitHub para el equipo
└── README.md
```

## Cómo ejecutar el proyecto localmente

No requiere instalación de dependencias ni un servidor backend.

**Opción 1 — Abrir directamente el archivo:**

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/<usuario-o-organizacion>/<nombre-del-repositorio>.git
   cd <nombre-del-repositorio>
   ```
2. Abrir `index.html` en el navegador (doble clic, o arrastrarlo a una pestaña).

**Opción 2 — Con un servidor local (recomendado para evitar restricciones del navegador):**

```bash
# Con Python 3
python3 -m http.server 8080

# o con la extensión "Live Server" de VS Code
```

Luego abrir `http://localhost:8080` en el navegador.

## Despliegue continuo

El repositorio incluye un workflow de **GitHub Actions** (`.github/workflows/deploy.yml`) que, en cada `push` a la rama `main`:

1. Valida que existan los archivos principales (`index.html`, `style.css`, `script.js`) y que no tengan errores de sintaxis.
2. Si la validación es exitosa, despliega automáticamente el contenido en **GitHub Pages**.

Para habilitarlo en un repositorio nuevo: ir a **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**.

## Equipo de desarrollo

| Integrante | Rol / responsabilidad |
|---|---|
| Nombre 1 | |
| Nombre 2 | |
| Nombre 3 | |
| Nombre 4 | |

## Licencia

Proyecto académico, sin fines comerciales.
