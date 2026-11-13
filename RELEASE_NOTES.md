# Notas de versión

Versionamiento semántico: `MAJOR.MINOR.PATCH`

- **MAJOR**: cambios incompatibles con versiones anteriores.
- **MINOR**: nuevas funcionalidades compatibles con versiones anteriores.
- **PATCH**: correcciones de errores compatibles con versiones anteriores.

---

## v1.1.1 — Corrección de errores

**Fecha:** 2026-11-13
**Tipo:** PATCH

### Corregido
- **Bug:** al eliminar una incidencia mientras había un filtro de estado activo (por ejemplo, "Abierta"), la aplicación eliminaba el registro ubicado en esa posición dentro del listado **completo**, en lugar del registro que el usuario veía y había seleccionado en el listado **filtrado**. Esto podía borrar una incidencia distinta a la deseada, o incluso una con un estado diferente.
  - **Causa raíz:** el botón "Eliminar" usaba el índice del arreglo filtrado (`visibles`) para eliminar directamente del arreglo completo guardado en `localStorage`.
  - **Solución:** cada incidencia ahora recibe un identificador único (`id`) al crearse. La eliminación busca y elimina por `id`, de modo que el filtro aplicado ya no afecta qué registro se borra.
  - **Issue relacionado:** #5 (ver [`ISSUE_EJEMPLO.md`](./ISSUE_EJEMPLO.md)).
  - **Pull request:** `fix/eliminar-con-filtro-activo` → `main`.

### Sin cambios
- No se agregaron ni modificaron funcionalidades visibles para el usuario; el comportamiento esperado (registrar, listar, filtrar, eliminar) es el mismo de `v1.1.0`, pero ahora funciona correctamente.

---

## v1.1.0 — Filtro por estado

**Fecha:** 2026-11-10
**Tipo:** MINOR

### Agregado
- Campo **Estado** al registrar una incidencia, con tres valores posibles: `Abierta`, `En progreso`, `Cerrada`.
- Columna de estado en el listado de incidencias, mostrada como una etiqueta de color (badge).
- Selector de **filtro por estado** sobre el listado, que permite mostrar solo las incidencias de un estado específico o todas.
- Botón **Eliminar** para quitar una incidencia del listado.

### Cambiado
- El modelo de datos de cada incidencia ahora incluye el campo `estado`.

### Errores conocidos
- Eliminar una incidencia con un filtro activo puede borrar el registro incorrecto. Corregido en `v1.1.1`.

---

## v1.0.0 — Versión inicial

**Fecha:** 2026-11-08
**Tipo:** MAJOR (primera versión estable)

### Agregado
- Formulario para registrar una nueva incidencia (título y descripción).
- Listado de todas las incidencias registradas, con fecha de creación.
- Persistencia de los datos en el `localStorage` del navegador.
