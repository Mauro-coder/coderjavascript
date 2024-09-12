// Variables y constantes globales
const PLANES = [
  { nombre: "Plan V1", precio: 10000 },
  { nombre: "Plan V2", precio: 15000 },
  { nombre: "Plan V3", precio: 30000 },
];

// Constantes para factores adicionales
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
  // Encontrar el plan seleccionado
  const plan = PLANES.find((p) => p.nombre === planSeleccionado);

  // Factor de edad
  let factorEdad;
  if (edad < 30) {
    factorEdad = EDAD_FACTORES.menor30;
  } else if (edad <= 60) {
    factorEdad = EDAD_FACTORES.entre30y60;
  } else {
    factorEdad = EDAD_FACTORES.mayor60;
  }

  // Calcular el costo base con el factor de edad
  let costoTotal = plan.precio * factorEdad;

  // Agregar costos adicionales si se incluyen
  if (incluyeDental) {
    costoTotal += COBERTURA_ADICIONAL.dental;
  }

  if (incluyeVision) {
    costoTotal += COBERTURA_ADICIONAL.vision;
  }

  return costoTotal;
}

// Función para generar las fechas y horarios disponibles
function generarFechasYHorarios() {
  const fechasYHorarios = [];
  const fechaInicial = new Date(2024, 8, 9); // 9 de Septiembre, 2024

  for (let i = 0; i < 5; i++) {
    const fecha = new Date(fechaInicial);
    fecha.setDate(fechaInicial.getDate() + i);

    // Generar horarios desde las 9 a.m. hasta las 12 p.m. en intervalos de una hora
    for (let hora = 9; hora <= 12; hora++) {
      const horario = new Date(fecha);
      horario.setHours(hora, 0, 0);
      fechasYHorarios.push(horario);
    }
  }

  return fechasYHorarios;
}

// Función para mostrar las fechas y horarios disponibles
function mostrarFechasYHorariosDisponibles() {
  const fechasYHorarios = generarFechasYHorarios();
  let mensaje = "Por favor, elija una fecha y horario disponible:\n";

  fechasYHorarios.forEach((fechaHora, index) => {
    mensaje += `${index + 1}. ${fechaHora.toLocaleString()}\n`;
  });

  let seleccionFechaHora;
  let fechaSeleccionada;
  while (true) {
    seleccionFechaHora = parseInt(prompt(mensaje));
    if (seleccionFechaHora > 0 && seleccionFechaHora <= fechasYHorarios.length) {
      fechaSeleccionada = fechasYHorarios[seleccionFechaHora - 1];
      alert(`Has seleccionado la fecha y horario: ${fechaSeleccionada.toLocaleString()}`);
      
      // Guardar la fecha seleccionada en localStorage
      localStorage.setItem("fechaTurno", fechaSeleccionada.toLocaleString());

      // Confirmación de agendado
      alert("Su turno ha sido agendado, le esperamos. Muchas Gracias.");
      break;
    } else {
      alert("Por favor, seleccione una opción válida.");
    }
  }

  // Mostrar la fecha seleccionada en la consola
  console.log(`Su horario es: ${fechaSeleccionada.toLocaleString()}`);
}

// Bienvenida
alert("Bienvenido a nuestra obra social");

// Solicitar datos al usuario y almacenarlos en localStorage
let nombre;
while (true) {
  nombre = prompt("Ingrese su nombre:");
  if (nombre && nombre.trim() !== "") {
    localStorage.setItem("nombre", nombre);
    break;
  }
  alert("Por favor, ingrese un nombre válido.");
}

let apellido;
while (true) {
  apellido = prompt("Ingrese su apellido:");
  if (apellido && apellido.trim() !== "") {
    localStorage.setItem("apellido", apellido);
    break;
  }
  alert("Por favor, ingrese un apellido válido.");
}

alert(`Bienvenido, ${nombre} ${apellido}!`);

alert(
  "Procederemos a realizar una serie de preguntas para cotizar su obra social de elección."
);

let planSeleccionado;
while (true) {
  planSeleccionado = prompt(
    "Ingrese el nombre del plan (Plan V1, Plan V2, Plan V3):"
  );
  if (PLANES.some((p) => p.nombre === planSeleccionado)) {
    localStorage.setItem("planSeleccionado", planSeleccionado);
    break;
  }
  alert("Por favor, ingrese un plan válido.");
}

let edad;
while (true) {
  edad = parseInt(prompt("Ingrese su edad:"));
  if (!isNaN(edad) && edad > 0) {
    localStorage.setItem("edad", edad);
    break;
  }
  alert("Por favor, ingrese una edad válida (un número positivo).");
}

const incluyeDental = confirm("¿Desea incluir cobertura dental?");
localStorage.setItem("incluyeDental", incluyeDental);

const incluyeVision = confirm("¿Desea incluir cobertura de visión?");
localStorage.setItem("incluyeVision", incluyeVision);

const costoFinal = calcularCosto(
  planSeleccionado,
  edad,
  incluyeDental,
  incluyeVision
);
alert(`El costo final es: $${costoFinal}`);
localStorage.setItem("costoFinal", costoFinal);

// Preguntar si desea continuar con el pedido del turno
const continuarPedido = confirm("¿Desea continuar con el pedido de un turno?");
if (continuarPedido) {
  mostrarFechasYHorariosDisponibles();
} else {
  alert("Gracias por utilizar nuestro servicio. ¡Hasta pronto!");
}