const cursos = [
  { nombre: 'Pensamiento Lógico', ciclo: 1 },
  { nombre: 'Habilidades Comunicativas', ciclo: 1 },
  { nombre: 'Objetivos de Desarrollo Sostenible', ciclo: 1 },
  { nombre: 'Introducción a la Salud Pública', ciclo: 1, importante: true },
  { nombre: 'Inglés I', ciclo: 1, desbloquea: ['Inglés II'] },
  { nombre: 'Computación I', ciclo: 1, desbloquea: ['Discapacidad y Educación en Salud', 'Computación II'] },

  { nombre: 'Cambio Climático y Gestión de Riesgos', ciclo: 2 },
  { nombre: 'Constitución y Derechos Humanos', ciclo: 2 },
  { nombre: 'Cátedra Vallejo', ciclo: 2 },
  { nombre: 'Discapacidad y Educación en Salud', ciclo: 2, importante: true, requiere: ['Computación I'] },
  { nombre: 'Inglés II', ciclo: 2, desbloquea: ['Inglés III'], requiere: ['Inglés I'] },
  { nombre: 'Computación II', ciclo: 2, desbloquea: ['Epidemiología', 'Computación III'], requiere: ['Computación I'] },

  { nombre: 'Creatividad e Innovación', ciclo: 3 },
  { nombre: 'Filosofía y Ética', ciclo: 3 },
  { nombre: 'Epidemiología', ciclo: 3, importante: true, requiere: ['Computación II'] },
  { nombre: 'Estadística y Análisis de Datos', ciclo: 3, desbloquea: ['Metodología de la Investigación Científica'] },
  { nombre: 'Inglés III', ciclo: 3, desbloquea: ['Inglés IV'], requiere: ['Inglés II'] },
  { nombre: 'Computación III', ciclo: 3, desbloquea: ['Patología General y Estomatológica'], requiere: ['Computación II'] },

  { nombre: 'Metodología de la Investigación Científica', ciclo: 4, requiere: ['Estadística y Análisis de Datos'] },
  { nombre: 'Biología Celular, Molecular y Bioquímica', ciclo: 4, importante: true, desbloquea: ['Microbiología General y Estomatológica'] },
  { nombre: 'Morfofisiología Humana y Estomatológica', ciclo: 4, importante: true, desbloquea: ['Diagnostico y Radiología Estomatológica'] },
  { nombre: 'Patología General y Estomatológica', ciclo: 4, importante: true, requiere: ['Computación III'] },
  { nombre: 'Inglés IV', ciclo: 4, desbloquea: ['Inglés V'], requiere: ['Inglés III'] },

  { nombre: 'Microbiología General y Estomatológica', ciclo: 5, importante: true, requiere: ['Biología Celular, Molecular y Bioquímica'] },
  { nombre: 'Diagnostico y Radiología Estomatológica', ciclo: 5, importante: true, desbloquea: ['Clínica Integral del Adulto I'], requiere: ['Morfofisiología Humana y Estomatológica'] },
  { nombre: 'Farmacología General y Estomatológica', ciclo: 5, importante: true, desbloquea: ['Cirugía Bucal I'] },
  { nombre: 'Estomatología Restauradora y Oclusión', ciclo: 5, importante: true, desbloquea: ['Prótesis Fija'] },
  { nombre: 'Inglés V', ciclo: 5, desbloquea: ['Inglés VI'], requiere: ['Inglés IV'] },

  { nombre: 'Clínica Integral del Adulto I', ciclo: 6, importante: true, desbloquea: ['Clínica Integral del Adulto II'], requiere: ['Diagnostico y Radiología Estomatológica'] },
  { nombre: 'Cirugía Bucal I', ciclo: 6, importante: true, desbloquea: ['Cirugía Bucal II'], requiere: ['Farmacología General y Estomatológica'] },
  { nombre: 'Prótesis Fija', ciclo: 6, importante: true, desbloquea: ['Odontogeriatría'], requiere: ['Estomatología Restauradora y Oclusión'] },
  { nombre: 'Experiencia Curricular Electiva', ciclo: 6 },
  { nombre: 'Inglés VI', ciclo: 6, desbloquea: ['Inglés VII'], requiere: ['Inglés V'] },

  { nombre: 'Clínica Integral del Adulto II', ciclo: 7, importante: true, requiere: ['Clínica Integral del Adulto I'] },
  { nombre: 'Odontogeriatría', ciclo: 7, importante: true, desbloquea: ['Prótesis Parcial Removible'], requiere: ['Prótesis Fija'] },
  { nombre: 'Cirugía Bucal II', ciclo: 7, importante: true, requiere: ['Cirugía Bucal I'] },
  { nombre: 'Odontopediatría', ciclo: 7, importante: true, desbloquea: ['Clínica Integral del Niño'] },
  { nombre: 'Inglés VII', ciclo: 7, desbloquea: ['Inglés VIII'], requiere: ['Inglés VI'] },

  { nombre: 'Prótesis Parcial Removible', ciclo: 8, importante: true, requiere: ['Odontogeriatría'] },
  { nombre: 'Clínica Integral del Niño', ciclo: 8, importante: true, requiere: ['Odontopediatría'] },
  { nombre: 'Experiencia Curricular Electiva', ciclo: 8 },
  { nombre: 'Gestión de Proyectos', ciclo: 8 },
  { nombre: 'Inglés VIII', ciclo: 8, desbloquea: ['Inglés IX'], requiere: ['Inglés VII'] },

  { nombre: 'Proyecto de Investigación', ciclo: 9, desbloquea: ['Desarrollo del Proyecto de Investigación'] },
  { nombre: 'Internado I', ciclo: 9, importante: true, desbloquea: ['Internado II'] },
  { nombre: 'Inglés IX', ciclo: 9, desbloquea: ['Inglés X'], requiere: ['Inglés VIII'] },

  { nombre: 'Desarrollo del Proyecto de Investigación', ciclo: 10, requiere: ['Proyecto de Investigación'] },
  { nombre: 'Internado II', ciclo: 10, importante: true, requiere: ['Internado I'] },
  { nombre: 'Inglés X', ciclo: 10, requiere: ['Inglés IX'] },
];

const grid = document.getElementById("grid");
const cursosActivos = new Set();

function puedeActivarse(curso) {
  if (!curso.requiere) return true;
  return curso.requiere.every((r) => cursosActivos.has(r));
}

function renderCursos() {
  grid.innerHTML = "";
  cursos.forEach((curso) => {
    const div = document.createElement("div");
    div.className = "course";
    if (curso.importante) div.classList.add("important");
    if (!puedeActivarse(curso)) div.classList.add("locked");
    if (cursosActivos.has(curso.nombre)) div.classList.add("active");
    div.textContent = curso.nombre;
    div.onclick = () => {
      if (!puedeActivarse(curso)) return;
      cursosActivos.add(curso.nombre);
      renderCursos();
    };
    grid.appendChild(div);
  });
}

renderCursos();
