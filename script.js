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

// Inicializa
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".curso").forEach(curso => {
    if (!curso.classList.contains("bloqueado")) {
      curso.addEventListener("click", () => toggleCurso(curso.id));
    }
  });

  // Desbloquear cursos sin prerrequisitos
  const cursosConDependencias = new Set(Object.values(dependencias).flat());
  document.querySelectorAll(".curso").forEach(curso => {
    if (!cursosConDependencias.has(curso.id)) {
      curso.classList.remove("bloqueado");
    }
  });
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

function desbloquear(cursoID) {
  const curso = document.getElementById(cursoID);
  if (curso && curso.classList.contains("bloqueado")) {
    curso.classList.remove("bloqueado");
    curso.addEventListener("click", () => toggleCurso(cursoID));
  }
}

function bloquear(cursoID) {
  const curso = document.getElementById(cursoID);
  if (curso && !curso.classList.contains("aprobado")) {
    curso.classList.add("bloqueado");
    curso.removeEventListener("click", () => toggleCurso(cursoID));
  }
}

function desbloquearDependientes(id) {
  for (const [curso, prereqs] of Object.entries(dependencias)) {
    if (prereqs.includes(id)) {
      const puedeDesbloquear = prereqs.every(req =>
        document.getElementById(req).classList.contains("aprobado")
      );
      if (puedeDesbloquear) desbloquear(curso);
    }
  }
}

function bloquearDependientes(id) {
  for (const [curso, prereqs] of Object.entries(dependencias)) {
    if (prereqs.includes(id)) {
      bloquear(curso);
      bloquearDependientes(curso); // cascada
    }
  }
}
