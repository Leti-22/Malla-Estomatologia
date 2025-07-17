// Dependencias de cada curso
const dependencias = {
  ingles2: ["ingles1"],
  compu2: ["compu1"],
  discapacidad: ["compu1"],
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
  ingles10: ["ingles9"]
};

// Cursos desbloqueados por defecto (Primer ciclo)
const cursosIniciales = [
  "pensamiento", "comunicativas", "ods",
  "salud_publica", "ingles1", "compu1"
];

// Inicializa los cursos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  // Bloquea todos los cursos
  document.querySelectorAll(".curso").forEach(curso => {
    curso.classList.add("bloqueado");
  });

  // Desbloquea cursos iniciales
  cursosIniciales.forEach(id => desbloquear(id));

  // Agrega manejadores de clic
  document.querySelectorAll(".curso").forEach(curso => {
    curso.addEventListener("click", () => toggleCurso(curso.id));
  });
});

// Alterna estado de aprobado/no aprobado
function toggleCurso(id) {
  const curso = document.getElementById(id);
  if (!curso || curso.classList.contains("bloqueado")) return;

  const aprobado = curso.classList.contains("aprobado");

  if (aprobado) {
    curso.classList.remove("aprobado");
    bloquearDependientes(id);
  } else {
    curso.classList.add("aprobado");
    desbloquearDependientes(id);
  }
}

// Desbloquea un curso visualmente
function desbloquear(id) {
  const curso = document.getElementById(id);
  if (curso) curso.classList.remove("bloqueado");
}

// Bloquea un curso visualmente (solo si no está aprobado)
function bloquear(id) {
  const curso = document.getElementById(id);
  if (curso && !curso.classList.contains("aprobado")) {
    curso.classList.add("bloqueado");
  }
}

// Desbloquea cursos dependientes si todos sus requisitos están aprobados
function desbloquearDependientes(id) {
  for (const [cursoId, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      const puedeDesbloquear = requisitos.every(req =>
        document.getElementById(req).classList.contains("aprobado")
      );
      if (puedeDesbloquear) desbloquear(cursoId);
    }
  }
}

// Bloquea todos los cursos que dependían del curso desaprobado
function bloquearDependientes(id) {
  for (const [cursoId, requisitos] of Object.entries(dependencias)) {
    if (requisitos.includes(id)) {
      bloquear(cursoId);
      bloquearDependientes(cursoId); // efecto cascada
    }
  }
}
