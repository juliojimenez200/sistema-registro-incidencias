# Guía paso a paso: Git, GitHub y GitHub Actions

Esta guía acompaña las 4 fases de la actividad. Cada integrante debe ejecutar los comandos **desde su propia cuenta de GitHub** para que los commits y pull requests queden registrados a su nombre (requisito de la Fase 1: cada integrante debe tener al menos dos commits propios).

---

## 0. Preparación

1. Uno de los integrantes crea el repositorio en GitHub (público o privado):
   - **New repository** → nombre, por ejemplo `sistema-registro-incidencias` → **Create repository**.
2. Agregar al resto del equipo como colaboradores:
   - **Settings → Collaborators → Add people** → escribir el usuario de GitHub de cada integrante → enviar invitación.
3. Cada integrante acepta la invitación (llega por correo o en https://github.com/notifications).
4. Cada integrante clona el repositorio en su computador:
   ```bash
   git clone https://github.com/<usuario-o-organizacion>/sistema-registro-incidencias.git
   cd sistema-registro-incidencias
   ```
5. Copiar dentro del repositorio los archivos de esta carpeta (`index.html`, `style.css`, `script.js`, `README.md`, `RELEASE_NOTES.md`, `ISSUE_EJEMPLO.md`, `GUIA_GIT_GITHUB.md`, `.github/`, `versiones/`).
6. Primer commit (puede hacerlo quien creó el repo):
   ```bash
   git add .
   git commit -m "chore: estructura inicial del proyecto"
   git push origin main
   ```

---

## Fase 1 — Ramas, commits y pull requests

**Objetivo:** cada integrante aporta al menos 2 commits propios mediante ramas y pull requests (no se debe hacer `push` directo a `main` después del commit inicial).

Para cada cambio que un integrante quiera aportar:

1. Actualizar la rama principal local:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Crear una rama con un nombre descriptivo:
   ```bash
   git checkout -b feature/nombre-del-cambio
   ```
3. Editar los archivos correspondientes.
4. Guardar el cambio con un commit (usar mensajes claros, en modo imperativo):
   ```bash
   git add .
   git commit -m "feat: agregar validacion de campos obligatorios"
   ```
5. Repetir edición + commit tantas veces como se necesite (así cada integrante acumula sus commits).
6. Subir la rama:
   ```bash
   git push origin feature/nombre-del-cambio
   ```
7. En GitHub, abrir un **Pull Request**: `feature/nombre-del-cambio` → `main`.
8. Otro integrante del equipo revisa y aprueba el Pull Request (comentarios, sugerencias).
9. Fusionar (**Merge pull request**) y eliminar la rama.

**Convención de nombres de rama sugerida:**
- `feature/...` → nueva funcionalidad
- `fix/...` → corrección de errores
- `docs/...` → documentación

**Convención de mensajes de commit sugerida (Conventional Commits):**
- `feat: ...` nueva funcionalidad
- `fix: ...` corrección de error
- `docs: ...` cambios en documentación
- `style: ...` cambios de formato/estilo
- `refactor: ...` cambios internos sin alterar el comportamiento

---

## Fase 2 — Versionamiento semántico y releases

**Objetivo:** publicar 3 releases (`v1.0.0`, `v1.1.0`, `v1.1.1`) con sus notas de versión.

### 2.1 Crear el release v1.0.0

1. Asegurarse de que `main` contiene la versión inicial (carpeta `versiones/v1.0.0`, o esos mismos archivos en la raíz).
2. Crear la etiqueta (tag) y subirla:
   ```bash
   git tag -a v1.0.0 -m "Version inicial: registro y listado de incidencias"
   git push origin v1.0.0
   ```
3. En GitHub: **Releases → Draft a new release**.
   - Tag: `v1.0.0`
   - Título: `v1.0.0 - Version inicial`
   - Descripción: copiar la sección correspondiente de `RELEASE_NOTES.md`.
   - **Publish release**.

### 2.2 Incorporar la funcionalidad de v1.1.0

1. Repetir el flujo de la Fase 1 (rama `feature/filtro-por-estado`) para llevar la aplicación de `v1.0.0` a `v1.1.0` (agregar estado y filtro — ver `versiones/v1.1.0`).
2. Una vez fusionado a `main`:
   ```bash
   git checkout main
   git pull origin main
   git tag -a v1.1.0 -m "Agrega filtro de incidencias por estado"
   git push origin v1.1.0
   ```
3. Crear el release `v1.1.0` en GitHub de la misma forma que el anterior, usando las notas de `RELEASE_NOTES.md`.

### 2.3 Release v1.1.1 (corrección)

Este release se genera en la **Fase 4**, después de corregir el bug mediante un Pull Request. Ver el flujo completo en la sección "Fase 4" más abajo. Al finalizar:

```bash
git checkout main
git pull origin main
git tag -a v1.1.1 -m "Corrige eliminacion de incidencias con filtro activo"
git push origin v1.1.1
```

Y se crea el release `v1.1.1` en GitHub con sus notas correspondientes.

---

## Fase 3 — Despliegue continuo con GitHub Actions

**Objetivo:** validar y desplegar automáticamente la aplicación en GitHub Pages en cada `push` a `main`.

1. Confirmar que el archivo `.github/workflows/deploy.yml` está en el repositorio (ya incluido en este proyecto).
2. Habilitar GitHub Pages con origen "GitHub Actions":
   - Ir a **Settings → Pages**.
   - En **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Hacer un `push` a `main` (por ejemplo, fusionando cualquier Pull Request de la Fase 1):
   ```bash
   git push origin main
   ```
4. Ir a la pestaña **Actions** del repositorio y verificar que el workflow "Validar y desplegar en GitHub Pages" se ejecuta y termina en verde (✅), mostrando los dos jobs: `validar` y `desplegar`.
5. Una vez finalizado, la URL pública aparece en:
   - **Settings → Pages** (sección "Your site is live at...")
   - o en la pestaña **Actions**, dentro del job `desplegar` (salida `page_url`).
6. Verificar que la aplicación funciona correctamente abriendo esa URL en el navegador.

**Evidencias a capturar para el informe:**
- Captura de la pestaña **Actions** con la ejecución en verde.
- Captura de **Settings → Pages** mostrando la URL pública.
- Captura de la aplicación funcionando en esa URL.

---

## Fase 4 — Mejora continua (Issue → fix → release v1.1.1)

**Objetivo:** demostrar el ciclo completo de mejora continua: reportar un problema, corregirlo y documentarlo en un release.

Seguir el flujo detallado en [`ISSUE_EJEMPLO.md`](./ISSUE_EJEMPLO.md):

1. **Crear el Issue** en GitHub (pestaña **Issues → New issue**) describiendo el bug (usar el texto de `ISSUE_EJEMPLO.md` o uno propio si el equipo detectó otro error).
2. **Asignar un responsable** al Issue (campo *Assignees*).
3. **Capturar evidencia del bug** (captura de pantalla reproduciéndolo) — esta es la evidencia "antes" de la corrección.
4. Crear una rama para el fix:
   ```bash
   git checkout -b fix/eliminar-con-filtro-activo
   ```
5. Aplicar la corrección en el código (ver `versiones/v1.1.1/script.js` como referencia).
6. Hacer commit y push:
   ```bash
   git add .
   git commit -m "fix: eliminar incidencia por id en lugar de por indice filtrado"
   git push origin fix/eliminar-con-filtro-activo
   ```
7. Abrir un **Pull Request** hacia `main`. En la descripción, escribir:
   ```
   Closes #<número-del-issue>
   ```
   (esto cierra el Issue automáticamente al fusionar el PR).
8. **Capturar evidencia de la corrección funcionando** — evidencia "después".
9. Revisar y fusionar el Pull Request.
10. Confirmar que el Issue se cerró automáticamente (aparece tachado/cerrado en la lista de Issues).
11. Crear el tag y el release `v1.1.1` (ver sección 2.3) documentando la corrección.
12. Verificar en la pestaña **Actions** que el push a `main` disparó un nuevo despliegue exitoso.

---

## Defensa práctica — checklist rápido

Antes de la defensa, cada integrante del equipo debería poder responder sin ayuda:

- [ ] ¿Qué cambios introdujo cada versión (`v1.0.0`, `v1.1.0`, `v1.1.1`)?
- [ ] ¿Cómo se crea una rama y cómo se fusiona mediante un Pull Request?
- [ ] ¿Qué hace el workflow de GitHub Actions, paso a paso?
- [ ] ¿Dónde se ve el historial de ejecuciones del workflow y cómo se interpreta un fallo?
- [ ] ¿Cuál fue el bug reportado en el Issue y cómo se corrigió?
- [ ] ¿Cuál es la URL pública de la aplicación desplegada?
