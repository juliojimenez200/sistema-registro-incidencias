# Ejemplo de Issue para la Fase 4 (Mejora continua)

Copiar este contenido al crear el Issue en GitHub (pestaña **Issues → New issue**).

---

**Título:**
`Eliminar incidencia con filtro activo borra el registro incorrecto`

**Etiquetas (labels) sugeridas:** `bug`, `v1.1.0`

**Responsable (assignee):** _(asignar a un integrante del equipo)_

**Descripción:**

### Comportamiento actual
Al aplicar un filtro por estado (por ejemplo, mostrar solo las incidencias en estado "Abierta") y presionar el botón **Eliminar** sobre una de las filas visibles, la aplicación elimina una incidencia distinta a la que se muestra en pantalla.

### Pasos para reproducir
1. Registrar al menos 3 incidencias con diferentes estados (`Abierta`, `En progreso`, `Cerrada`).
2. En el filtro de estado, seleccionar `Abierta`.
3. Presionar **Eliminar** sobre la primera incidencia filtrada.
4. Cambiar el filtro a `Todas`.

### Resultado esperado
Debería eliminarse únicamente la incidencia que se presionó "Eliminar" en el paso 3.

### Resultado obtenido
Se elimina la incidencia que ocupa esa misma posición dentro del listado completo (sin filtrar), que puede tener un título, descripción o estado diferente.

### Causa probable
El índice usado por el botón "Eliminar" corresponde a la posición dentro del arreglo **filtrado**, pero se aplica para eliminar sobre el arreglo **completo** guardado en `localStorage`.

### Impacto
Pérdida de datos: un usuario puede eliminar accidentalmente una incidencia que no pretendía borrar.

### Versión afectada
`v1.1.0`

---

## Flujo sugerido para resolverlo (Fase 4)

1. Crear el Issue anterior en GitHub.
2. Crear una rama a partir de `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b fix/eliminar-con-filtro-activo
   ```
3. Aplicar la corrección (identificar cada incidencia con un `id` único y eliminar por `id` en lugar de por índice — ver `versiones/v1.1.1/script.js`).
4. Probar manualmente:
   - Capturar pantalla **antes** del fix, reproduciendo el bug.
   - Capturar pantalla **después** del fix, confirmando que se elimina el registro correcto.
5. Subir la rama y abrir un Pull Request hacia `main`:
   ```bash
   git add .
   git commit -m "fix: eliminar incidencia por id en lugar de por indice filtrado"
   git push origin fix/eliminar-con-filtro-activo
   ```
6. En GitHub, abrir el Pull Request, describir el cambio y vincular el Issue (escribir `Closes #<número-del-issue>` en la descripción).
7. Revisar y fusionar (merge) el Pull Request a `main`.
8. Confirmar que el Issue se cerró automáticamente.
9. Documentar la corrección en el release `v1.1.1` (ya incluida en `RELEASE_NOTES.md`).
