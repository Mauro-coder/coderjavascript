// Variables y constantes globales
const PLANES = [
  { nombre: "Plan V1", precio: 10000 },
  { nombre: "Plan V2", precio: 15000 },
  { nombre: "Plan V3", precio: 30000 },
];

const EDAD_FACTORES = {
  menor30: 1,
  entre30y60: 1.5,
  mayor60: 2,
};

const COBERTURA_ADICIONAL = {
  dental: 5000,
  vision: 10500,
};

// Función para calcular el costo total
function calcularCosto(planSeleccionado, edad, incluyeDental, incluyeVision) {
  const plan = PLANES.find((p) => p.nombre === planSeleccionado);
  let factorEdad;

  if (edad < 30) {
      factorEdad = EDAD_FACTORES.menor30;
  } else if (edad <= 60) {
      factorEdad = EDAD_FACTORES.entre30y60;
  } else {
      factorEdad = EDAD_FACTORES.mayor60;
  }

  let costoTotal = plan.precio * factorEdad;

  if (incluyeDental) {
      costoTotal += COBERTURA_ADICIONAL.dental;
  }

  if (incluyeVision) {
      costoTotal += COBERTURA_ADICIONAL.vision;
  }

  return costoTotal;
}

// Función para mostrar fechas y horarios
function mostrarFechasYHorarios() {
  const fechas = [
      "2024-09-09 09:00",
      "2024-09-09 10:00",
      "2024-09-09 11:00",
      "2024-09-09 12:00",
      "2024-09-10 09:00",
      "2024-09-10 10:00",
      "2024-09-10 11:00",
      "2024-09-10 12:00",
      "2024-09-11 09:00",
      "2024-09-11 10:00",
      "2024-09-11 11:00",
      "2024-09-11 12:00",
      "2024-09-12 09:00",
      "2024-09-12 10:00",
      "2024-09-12 11:00",
      "2024-09-12 12:00",
      "2024-09-13 09:00",
      "2024-09-13 10:00",
      "2024-09-13 11:00",
      "2024-09-13 12:00",
  ];

  const fechasSelect = document.getElementById("fechas");
  fechasSelect.innerHTML = "";
  fechas.forEach(fecha => {
      const option = document.createElement("option");
      option.value = fecha;
      option.textContent = fecha;
      fechasSelect.appendChild(option);
  });

  document.getElementById("fechas-horarios").style.display = "block";
}

// Evento para el envío del formulario
document.getElementById("obra-social-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const plan = document.getElementById("plan").value;
  const edad = document.getElementById("edad").value;
  const incluyeDental = document.getElementById("dental").checked;
  const incluyeVision = document.getElementById("vision").checked;

  if (!nombre || !apellido || !edad || edad <= 0) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, complete todos los campos obligatorios correctamente.',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  const costoFinal = calcularCosto(plan, parseInt(edad), incluyeDental, incluyeVision);

  const datosUsuario = {
      nombre: nombre,
      apellido: apellido,
      planSeleccionado: plan,
      edad: edad,
      incluyeDental: incluyeDental,
      incluyeVision: incluyeVision,
      costoFinal: costoFinal
  };
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  document.getElementById("resultado").innerHTML = `El costo final es: $${costoFinal}`;
  
  mostrarFechasYHorarios();
});

// Evento para agendar el turno
document.getElementById("agendar").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("fechas").value;
  if (!fechaSeleccionada) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, seleccione una fecha y horario.',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
  datosUsuario.fechaTurno = fechaSeleccionada;
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  Swal.fire({
      icon: 'success',
      title: 'Turno Agendado',
      text: `Su turno ha sido agendado para: ${fechaSeleccionada}`,
      confirmButtonText: 'Aceptar'
  });

  console.log("Datos completos del usuario:", datosUsuario);
});
