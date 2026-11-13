// Sistema de Registro de Incidencias - v1.1.0
// Funcionalidad: registrar y listar incidencias (persistencia en localStorage)

const STORAGE_KEY = "incidencias";
const ESTADO_POR_DEFECTO = "Abierta";

// Relaciona cada estado con su clase CSS en style.css
const CLASES_ESTADO = {
  "Abierta": "abierta",
  "En progreso": "en-progreso",
  "Cerrada": "cerrada",
};

function obtenerIncidencias() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarIncidencias(incidencias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidencias));
}

function renderizarIncidencias() {
  const todas = obtenerIncidencias();
  const filtro = document.getElementById("filtro-estado").value;

  const visibles = filtro === "todas"
    ? todas
    : todas.filter((inc) => inc.estado === filtro);
  const tbody = document.getElementById("incidencias-body");
  const emptyMsg = document.getElementById("empty-msg");

  tbody.innerHTML = "";

  if (visibles.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  visibles.forEach((inc, index) => {
    const estado = inc.estado || ESTADO_POR_DEFECTO;
    const claseEstado = CLASES_ESTADO[estado] || "abierta";
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${inc.titulo}</td>
      <td>${inc.descripcion}</td>
      <td><span class="badge ${claseEstado}">${estado}</span></td>
      <td>${inc.fecha}</td>
      <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
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

document.getElementById("filtro-estado").addEventListener("change", renderizarIncidencias);
document.getElementById("incidencias-body").addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-eliminar")) return;

  const index = Number(e.target.dataset.index);
  const incidencias = obtenerIncidencias();
  incidencias.splice(index, 1);
  guardarIncidencias(incidencias);
  renderizarIncidencias();
});
renderizarIncidencias();