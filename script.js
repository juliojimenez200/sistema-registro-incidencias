// Sistema de Registro de Incidencias - v1.1.1
// Corrección de bug: eliminar una incidencia borraba el registro
// equivocado cuando había un filtro de estado activo.
//
// Causa raíz (ver Issue "Eliminar incidencia con filtro activo
// borra el registro incorrecto"): el botón "Eliminar" usaba el
// índice de la incidencia dentro del arreglo FILTRADO (visibles)
// para eliminarla del arreglo COMPLETO guardado en localStorage.
// Como ambos arreglos no coinciden cuando el filtro no es "todas",
// se eliminaba la incidencia ubicada en esa posición dentro del
// arreglo completo, no la que el usuario veía en pantalla.
//
// Corrección: cada incidencia recibe un "id" único e inmutable al
// crearse. Eliminar ahora busca por ese id en lugar de por índice,
// así que el filtro aplicado ya no afecta qué registro se borra.

const STORAGE_KEY = "incidencias";

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

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

  visibles.forEach((inc, posicion) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${posicion + 1}</td>
      <td>${inc.titulo}</td>
      <td>${inc.descripcion}</td>
      <td>${inc.fecha}</td>
      <td><span class="badge ${claseBadge(inc.estado)}">${inc.estado}</span></td>
      <td><button class="btn-eliminar" data-id="${inc.id}">Eliminar</button></td>
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
    id: generarId(),
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

  // FIX: se elimina por id, no por índice del arreglo filtrado.
  const id = e.target.dataset.id;
  const incidencias = obtenerIncidencias().filter((inc) => inc.id !== id);
  guardarIncidencias(incidencias);
  renderizarIncidencias();
});

renderizarIncidencias();
