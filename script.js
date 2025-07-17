// Dependencias de cada curso
const dependencias = {
  ingles2: ["ingles1"],
  discapacidad: ["compu1"],
  compu2: ["compu1"],
  ingles3: ["ingles2"],
  epidemiologia: ["compu2"],
  compu3: ["compu2"],
  metodologia: ["estadistica"],
  ingles4: ["ingles3"],
  patologia: ["compu3"],
  microbiologia: ["biologia"],
  diagnostico: ["morfofisiologia"],
  clinica1: ["diagnostico"],
  cirugia1: ["farmacologia"],
  protesis: ["restauradora"],
  ingles5: ["ingles4"],
  clinica2: ["clinica1"],
  cirugia2: ["cirugia1"],
  odontogeriatria: ["protesis"],
  ingles6: ["ingles5"],
  protesis_rem: ["odontogeriatria"],
  clinica_nino: ["odontopediatria"],
  ingles7: ["ingles6"],
  ingles8: ["ingles7"],
  desarrollo: ["proyecto"],
  internado2: ["internado1"],
  ingles9: ["ingles8"],
  ingles10: ["ingles9"],

  // Dummies para prevenir desbloqueo automático
  biologia: ["biologia_dummy"],
  morfofisiologia: ["morfo_dummy"],
  farmacologia: ["farmaco_dummy"],
  restauradora: ["resta_dummy"],
  odontopediatria: ["odonto_dummy"],
  estadistica: ["estad_dummy"],
  proyecto: ["proyecto_dummy"],
  internado1: ["internado_dummy"],
};

// Cursos dummy que no existen en el DOM
const cursosDummy = [
  "biologia_dummy", "morfo_dummy", "farmaco_dummy", "resta_dummy",
  "odonto_dummy", "estad_dummy", "proyecto_dummy", "internado_dummy"
];

window.addEventListener("DOMContentLoaded", () => {
  const todosLosCursos = document.querySelectorAll(".curso");

  // Bloquear todos los cursos al inicio
  todosLosCursos.forEach(curso => curso.classList.add("bloqueado"));

  // Asignar eventos de clic
  todosLosCursos.forEach(curso => {
    curso.addEventListener("click", () => toggleCurso(curso.id));
  });

  // Desbloquear cursos sin dependencias
  const todosIds = Array.from(todosLosCursos).map(c => c.id);
  const cursosConDependencias = new Set(Object.keys(dependencias));
  const cursosSinDependencias = todosIds.filter(id => !cursosConDependencias.has(id));

  cursosSinDependencias.forEach(id => desbloquear(id));
});

function toggleCurso(id) {
  const curso = document.getElementById(id);
  if (curso.classList.contains("bloqueado")) return;

  const estaAprobado = curso.classList.contains("aprobado");

  if (estaAprobado) {
    curso.classList.remove("aprobado");
    bloquearDependientes(id);
  } else {
    curso.classList.add("aprobado");
    desbloquearDependientes(id);
  }
}

function desbloquear(id) {
  const curso = document.getElementById(id);
  if (curso) curso.classList.remove("bloqueado");
}

function bloquear(id) {
  const curso = document.getElementById(id);
  if (curso && !curso.classList.contains("aprobado")) {
    curso.classList.add("bloqueado");
  }
}

function desbloquearDependientes(id) {
  for (const [curso, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      const puedeDesbloquear = requisitos.every(req => {
        const el = document.getElementById(req);
        return el && el.classList.contains("aprobado");
      });
      if (puedeDesbloquear) desbloquear(curso);
    }
  }
}

function bloquearDependientes(id) {
  for (const [curso, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      bloquear(curso);
      bloquearDependientes(curso); // Recursivo en cascada
    }
  }
}
