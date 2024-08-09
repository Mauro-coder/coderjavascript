//Variables y constantes globales
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
// Bienvenida
alert("Bienvenido a nuestra obra social");

// Solicitar datos al usuario
let nombre;
while (true) {
  nombre = prompt("Ingrese su nombre:");
  if (nombre && nombre.trim() !== "") {
    break;
  }
  alert("Por favor, ingrese un nombre válido.");
}

let apellido;
while (true) {
  apellido = prompt("Ingrese su apellido:");
  if (apellido && apellido.trim() !== "") {
    break;
  }
  alert("Por favor, ingrese un apellido válido.");
}

alert(`Bienvenido, ${nombre} ${apellido}!`);

alert(
  "Procederemos a realizar una serie de preguntas para cotizar su obra social de eleccion."
);

let planSeleccionado;
while (true) {
  planSeleccionado = prompt(
    "Ingrese el nombre del plan (Plan V1, Plan V2, Plan V3):"
  );
  if (PLANES.some((p) => p.nombre === planSeleccionado)) {
    break;
  }
  alert("Por favor, ingrese un plan válido.");
}
let edad;
while (true) {
  edad = parseInt(prompt("Ingrese su edad:"));
  if (!isNaN(edad) && edad > 0) {
    break;
  }
  alert("Por favor, ingrese una edad válida (un número positivo).");
}
const incluyeDental = confirm("¿Desea incluir cobertura dental?");
const incluyeVision = confirm("¿Desea incluir cobertura de visión?");
const costoFinal = calcularCosto(
  planSeleccionado,
  edad,
  incluyeDental,
  incluyeVision
);
alert(`El costo final es: $${costoFinal}`);

//console.log
console.log(nombre + " " + apellido);
console.log(planSeleccionado);
console.log(edad);
console.log(incluyeDental);
console.log(incluyeVision);
console.log("El costo es de $", costoFinal);
