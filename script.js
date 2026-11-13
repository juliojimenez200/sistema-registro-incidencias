// Sistema de Registro de Incidencias - v1.0.0
// Funcionalidad: registrar y listar incidencias (persistencia en localStorage)

const STORAGE_KEY = "incidencias";
const ESTADO_POR_DEFECTO = "Abierta";

function obtenerIncidencias() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarIncidencias(incidencias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidencias));
}

function renderizarIncidencias() {
  const incidencias = obtenerIncidencias();
  const tbody = document.getElementById("incidencias-body");
  const emptyMsg = document.getElementById("empty-msg");

  tbody.innerHTML = "";

  if (incidencias.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  incidencias.forEach((inc, index) => {
    const estado = inc.estado || ESTADO_POR_DEFECTO;
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${inc.titulo}</td>
      <td>${inc.descripcion}</td>
      <td>${estado}</td>
      <td>${inc.fecha}</td>
    `;
    tbody.appendChild(fila);
  });
}

document.getElementById("incidencia-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const estado = document.getElementById("estado").value;

  if (!titulo || !descripcion || !estado) return;

  const incidencias = obtenerIncidencias();
  incidencias.push({
    titulo,
    descripcion,
    estado,
    fecha: new Date().toLocaleDateString(),
  });
  guardarIncidencias(incidencias);

  e.target.reset();
  renderizarIncidencias();
});

renderizarIncidencias();