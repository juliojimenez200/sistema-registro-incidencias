// Sistema de Registro de Incidencias - v1.1.0
// Nueva funcionalidad: estado de la incidencia y filtro por estado.

const STORAGE_KEY = "incidencias";

function obtenerIncidencias() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarIncidencias(incidencias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidencias));
}

function claseBadge(estado) {
  return estado.toLowerCase().replace(" ", "-");
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

  // NOTA: se itera sobre el arreglo FILTRADO y se usa ese índice
  // directamente para eliminar. Esto es la causa del bug reportado
  // en el Issue (ver v1.1.1 para la corrección).
  visibles.forEach((inc, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${inc.titulo}</td>
      <td>${inc.descripcion}</td>
      <td>${inc.fecha}</td>
      <td><span class="badge ${claseBadge(inc.estado)}">${inc.estado}</span></td>
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

  if (!titulo || !descripcion) return;

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

  // BUG: este índice corresponde a la posición dentro del arreglo
  // FILTRADO (visibles), pero se usa para eliminar sobre el arreglo
  // COMPLETO guardado en localStorage. Cuando hay un filtro activo,
  // esto borra la incidencia equivocada.
  const index = Number(e.target.dataset.index);
  const incidencias = obtenerIncidencias();
  incidencias.splice(index, 1);
  guardarIncidencias(incidencias);
  renderizarIncidencias();
});

renderizarIncidencias();
