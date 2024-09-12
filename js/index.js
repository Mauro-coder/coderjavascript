// Variables y constantes globales
const PLANES = {
  "Plan V1": 10000,
  "Plan V2": 15000,
  "Plan V3": 30000
};

const EDAD_FACTORES = {
  menor30: 1,
  entre30y60: 1.5,
  mayor60: 2
};

const COBERTURA_ADICIONAL = {
  dental: 5000,
  vision: 10500
};

// Función para calcular el costo total
function calcularCosto(plan, edad, incluyeDental, incluyeVision) {
  let factorEdad = 1;
  if (edad < 30) {
      factorEdad = EDAD_FACTORES.menor30;
  } else if (edad <= 60) {
      factorEdad = EDAD_FACTORES.entre30y60;
  } else {
      factorEdad = EDAD_FACTORES.mayor60;
  }

  let costoTotal = PLANES[plan] * factorEdad;

  if (incluyeDental) costoTotal += COBERTURA_ADICIONAL.dental;
  if (incluyeVision) costoTotal += COBERTURA_ADICIONAL.vision;

  return costoTotal;
}

// Función para generar las fechas y horarios disponibles
function generarFechasYHorarios() {
  const fechasYHorarios = [];
  const fechaInicial = new Date(2024, 8, 9);

  for (let i = 0; i < 5; i++) {
      const fecha = new Date(fechaInicial);
      fecha.setDate(fechaInicial.getDate() + i);

      for (let hora = 9; hora <= 12; hora++) {
          const horario = new Date(fecha);
          horario.setHours(hora, 0, 0);
          fechasYHorarios.push(horario);
      }
  }
  return fechasYHorarios;
}

// Evento cuando el formulario se envía
document.getElementById("obra-social-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const plan = document.getElementById("plan").value;
  const edad = document.getElementById("edad").value;
  const incluyeDental = document.getElementById("dental").checked;
  const incluyeVision = document.getElementById("vision").checked;

  // Validaciones
  if (!nombre || !apellido || !edad || edad <= 0) {
      alert("Por favor, complete todos los campos obligatorios correctamente.");
      return;
  }

  const costoFinal = calcularCosto(plan, parseInt(edad), incluyeDental, incluyeVision);

  // Crear un objeto con los datos del usuario
  const datosUsuario = {
      nombre: nombre,
      apellido: apellido,
      planSeleccionado: plan,
      edad: edad,
      incluyeDental: incluyeDental,
      incluyeVision: incluyeVision,
      costoFinal: costoFinal
  };

  // Almacenar en localStorage usando JSON
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  document.getElementById("resultado").innerHTML = `El costo final es: $${costoFinal}`;

  // Mostrar la sección de fechas y horarios
  mostrarFechasYHorarios();
});

// Función para mostrar las fechas y horarios
function mostrarFechasYHorarios() {
  const fechasYHorarios = generarFechasYHorarios();
  const selectFechas = document.getElementById("fechas");
  selectFechas.innerHTML = "";

  fechasYHorarios.forEach((fechaHora, index) => {
      const option = document.createElement("option");
      option.value = fechaHora.toLocaleString();
      option.textContent = fechaHora.toLocaleString();
      selectFechas.appendChild(option);
  });

  document.getElementById("fechas-horarios").style.display = "block";
}

// Evento cuando se selecciona una fecha y horario
document.getElementById("agendar").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("fechas").value;
  if (!fechaSeleccionada) {
      alert("Por favor, seleccione una fecha y horario.");
      return;
  }

  // Recuperar datos del usuario desde localStorage
  const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));

  // Añadir la fecha seleccionada al objeto de datos
  datosUsuario.fechaTurno = fechaSeleccionada;

  // Guardar nuevamente en localStorage con la fecha seleccionada
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  alert(`Su turno ha sido agendado para: ${fechaSeleccionada}`);

  // Mostrar en consola el JSON completo
  console.log("Datos completos del usuario:", datosUsuario);
});
