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
};

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".curso").forEach(curso => {
    curso.classList.add("bloqueado");
  });

  // Desbloquear automáticamente los cursos sin dependencias (sin prerrequisitos)
  const todosIds = Array.from(document.querySelectorAll(".curso")).map(c => c.id);
  const cursosConDependencias = new Set(Object.keys(dependencias));
  const cursosSinDependencias = todosIds.filter(id => !cursosConDependencias.has(id));

  cursosSinDependencias.forEach(id => desbloquear(id));
});

// Click para aprobar/desaprobar
document.querySelectorAll(".curso").forEach(curso => {
  curso.addEventListener("click", () => toggleCurso(curso.id));
});

function toggleCurso(id) {
  const curso = document.getElementById(id);
  const aprobado = curso.classList.contains("aprobado");

  if (aprobado) {
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
  if (curso && !curso.classList.contains("aprobado")) curso.classList.add("bloqueado");
}

function desbloquearDependientes(id) {
  for (const [curso, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      const puedeDesbloquear = requisitos.every(req =>
        document.getElementById(req).classList.contains("aprobado")
      );
      if (puedeDesbloquear) desbloquear(curso);
    }
  }
}

function bloquearDependientes(id) {
  for (const [curso, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      bloquear(curso);
      bloquearDependientes(curso); // en cascada
    }
  }
}
