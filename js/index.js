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
  const fechaInicial = new Date(2024, 8, 9); // 9 de Septiembre, 2024

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

// Manipular DOM al cargar
document.getElementById("calcular").addEventListener("click", function() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const plan = document.getElementById("plan").value;
  const edad = document.getElementById("edad").value;
  const incluyeDental = document.getElementById("dental").checked;
  const incluyeVision = document.getElementById("vision").checked;

  // Validaciones
  if (nombre === "" || apellido === "" || edad === "") {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  if (edad <= 0 || isNaN(edad)) {
    alert("Por favor, ingrese una edad válida (mayor a 0).");
    return;
  }

  const costoFinal = calcularCosto(plan, parseInt(edad), incluyeDental, incluyeVision);

  document.getElementById("resultado").innerHTML = `El costo final es: $${costoFinal}`;

  // Guardar en localStorage
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("planSeleccionado", plan);
  localStorage.setItem("edad", edad);
  localStorage.setItem("costoFinal", costoFinal);

  // Mostrar la sección de fechas y horarios
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
});

// Manejar la selección de la fecha y agendar el turno
document.getElementById("agendar").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("fechas").value;
  alert(`Su turno ha sido agendado para: ${fechaSeleccionada}`);

  // Guardar fecha seleccionada en localStorage
  localStorage.setItem("fechaTurno", fechaSeleccionada);

  // Mostrar en consola
  console.log(`Su horario es: ${fechaSeleccionada}`);
});
