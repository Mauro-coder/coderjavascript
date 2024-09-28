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

// Función para generar las fechas y horarios a partir de la fecha actual
function generarFechasYHorarios() {
  const hoy = new Date(); // Fecha actual
  const fechas = [];

  // Generamos fechas para los próximos 5 días
  for (let i = 0; i < 5; i++) {
      let fecha = new Date();
      fecha.setDate(hoy.getDate() + i); // Sumamos días a la fecha actual
      const opcionesHorarios = ["09:00", "10:00", "11:00", "12:00"];

      // Agregamos la fecha y horarios
      opcionesHorarios.forEach(horario => {
          const fechaCompleta = `${fecha.toLocaleDateString()} ${horario}`;
          fechas.push(fechaCompleta);
      });
  }

  const fechasSelect = document.getElementById("fechas");
  fechasSelect.innerHTML = ""; // Limpiamos las opciones previas
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
  
  // Llamamos a la función que genera las fechas dinámicamente
  generarFechasYHorarios();
});

// Evento para agendar el turno con manejo de fetch y promesas
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

  // Recuperar datos del usuario desde localStorage
  const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
  datosUsuario.fechaTurno = fechaSeleccionada;

  // Simulación de envío de datos al servidor
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(datosUsuario),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al agendar el turno');
      }
      return response.json();
  })
  .then(data => {
      // Si todo sale bien, mostramos el SweetAlert
      Swal.fire({
          icon: 'success',
          title: 'Turno Agendado',
          text: `Su turno ha sido agendado para: ${fechaSeleccionada}`,
          confirmButtonText: 'Aceptar'
      });

      console.log("Datos enviados correctamente al servidor:", data);
  })
  .catch(error => {
      // Manejo de error si la petición falla
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agendar su turno. Por favor, intente nuevamente.',
          confirmButtonText: 'Aceptar'
      });

      console.error("Error al enviar los datos al servidor:", error);
  });
});
