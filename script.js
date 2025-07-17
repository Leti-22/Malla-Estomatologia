const cursos = [
  {
    ciclo: "Primer ciclo",
    items: [
      { nombre: "Pensamiento Lógico" },
      { nombre: "Habilidades Comunicativas" },
      { nombre: "Objetivos de Desarrollo Sostenible" },
      { nombre: "Introducción a la Salud Pública", asterisco: true },
      { nombre: "Inglés I", abre: ["Inglés II"] },
      { nombre: "Computación I", abre: ["Discapacidad y Educación en Salud", "Computación II"] },
    ]
  },
  {
    ciclo: "Segundo ciclo",
    items: [
      { nombre: "Cambio Climático y Gestión de Riesgos" },
      { nombre: "Constitución y Derechos Humanos" },
      { nombre: "Cátedra Vallejo" },
      { nombre: "Discapacidad y Educación en Salud", asterisco: true },
      { nombre: "Inglés II", abre: ["Inglés III"] },
      { nombre: "Computación II", abre: ["Epidemiología", "Computación III"] },
    ]
  },
  {
    ciclo: "Tercer ciclo",
    items: [
      { nombre: "Creatividad e Innovación" },
      { nombre: "Filosofía y Ética" },
      { nombre: "Epidemiología", asterisco: true },
      { nombre: "Estadística y Análisis de Datos", abre: ["Metodología de la Investigación Científica"] },
      { nombre: "Inglés III", abre: ["Inglés IV"] },
      { nombre: "Computación III", abre: ["Patología General y Estomatológica"] },
    ]
  },
  {
    ciclo: "Cuarto ciclo",
    items: [
      { nombre: "Metodología de la Investigación Científica" },
      { nombre: "Biología Celular, Molecular y Bioquímica", asterisco: true, abre: ["Microbiología General y Estomatológica"] },
      { nombre: "Morfofisiología Humana y Estomatológica", asterisco: true, abre: ["Diagnostico y Radiología Estomatológica"] },
      { nombre: "Patología General y Estomatológica", asterisco: true },
      { nombre: "Inglés IV", abre: ["Inglés V"] },
    ]
  },
  {
    ciclo: "Quinto ciclo",
    items: [
      { nombre: "Microbiología General y Estomatológica", asterisco: true },
      { nombre: "Diagnostico y Radiología Estomatológica", asterisco: true, abre: ["Clínica Integral del Adulto I"] },
      { nombre: "Farmacología General y Estomatológica", asterisco: true, abre: ["Cirugía Bucal I"] },
      { nombre: "Estomatología Restauradora y Oclusión", asterisco: true, abre: ["Prótesis Fija"] },
      { nombre: "Inglés V", abre: ["Inglés VI"] },
    ]
  },
  {
    ciclo: "Sexto ciclo",
    items: [
      { nombre: "Clínica Integral del Adulto I", asterisco: true, abre: ["Clínica Integral del Adulto II"] },
      { nombre: "Cirugía Bucal I", asterisco: true, abre: ["Cirugía Bucal II"] },
      { nombre: "Prótesis Fija", asterisco: true, abre: ["Odontogeriatría"] },
      { nombre: "Experiencia Curricular Electiva" },
      { nombre: "Inglés VI", abre: ["Inglés VII"] },
    ]
  },
  {
    ciclo: "Séptimo ciclo",
    items: [
      { nombre: "Clínica Integral del Adulto II", asterisco: true },
      { nombre: "Odontogeriatría", asterisco: true, abre: ["Prótesis Parcial Removible"] },
      { nombre: "Cirugía Bucal II", asterisco: true },
      { nombre: "Odontopediatría", asterisco: true, abre: ["Clínica Integral del Niño"] },
      { nombre: "Inglés VII", abre: ["Inglés VIII"] },
    ]
  },
  {
    ciclo: "Octavo ciclo",
    items: [
      { nombre: "Prótesis Parcial Removible", asterisco: true },
      { nombre: "Clínica Integral del Niño", asterisco: true },
      { nombre: "Experiencia Curricular Electiva" },
      { nombre: "Gestión de Proyectos" },
      { nombre: "Inglés VIII", abre: ["Inglés IX"] },
    ]
  },
  {
    ciclo: "Noveno ciclo",
    items: [
      { nombre: "Proyecto de Investigación", abre: ["Desarrollo del Proyecto de Investigación"] },
      { nombre: "Internado I", asterisco: true, abre: ["Internado II"] },
      { nombre: "Inglés IX", abre: ["Inglés X"] },
    ]
  },
  {
    ciclo: "Décimo ciclo",
    items: [
      { nombre: "Desarrollo del Proyecto de Investigación" },
      { nombre: "Internado II", asterisco: true },
      { nombre: "Inglés X" },
    ]
  }
];

const estadoCursos = new Map();

function crearCurso(nombre, asterisco) {
  const div = document.createElement("div");
  div.classList.add("curso");
  div.textContent = nombre;
  if (asterisco) div.classList.add("asterisco");
  div.addEventListener("click", () => aprobarCurso(nombre, div));
  estadoCursos.set(nombre, { aprobado: false, elemento: div });
  return div;
}

function aprobarCurso(nombre, div) {
  if (estadoCursos.get(nombre).aprobado) return;
  div.classList.add("aprobado");
  estadoCursos.get(nombre).aprobado = true;

  // Buscar qué cursos se desbloquean
  for (const ciclo of cursos) {
    for (const curso of ciclo.items) {
      if (curso.abre && curso.abre.includes(nombre)) continue; // evitar clic por error
      if (curso.nombre === nombre && curso.abre) {
        for (const desbloqueado of curso.abre) {
          const cursoDesbloqueado = estadoCursos.get(desbloqueado);
          if (cursoDesbloqueado) {
            cursoDesbloqueado.elemento.classList.add("activo");
          }
        }
      }
    }
  }
}

function inicializarMalla() {
  const contenedor = document.getElementById("malla");

  cursos.forEach(ciclo => {
    const titulo = document.createElement("div");
    titulo.classList.add("ciclo-titulo");
    titulo.textContent = ciclo.ciclo;
    contenedor.appendChild(titulo);

    ciclo.items.forEach(curso => {
      const div = crearCurso(curso.nombre, curso.asterisco);
      contenedor.appendChild(div);
    });
  });

  // Activar cursos iniciales (primer ciclo
