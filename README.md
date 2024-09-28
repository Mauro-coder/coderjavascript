# Proyecto de Cotización de Obra Social y Agendamiento de Turnos


Este proyecto es una aplicación simple que permite a los usuarios **cotizar un plan de obra social** en base a sus datos personales y luego **agendar un turno** para consultar sobre la obra social. Utiliza **HTML**, **CSS**, **JavaScript**, **SweetAlert2** para notificaciones interactivas y maneja peticiones **asíncronas** con **fetch**. 

## Funcionalidades

- **Cotización de Planes de Obra Social:**
  - El usuario ingresa su nombre, apellido, edad y selecciona un plan de obra social (Plan V1, Plan V2, Plan V3).
  - Se calcula el costo total basado en el plan seleccionado, la edad y las coberturas adicionales (dental y visión).
  - El costo final es mostrado en pantalla.

- **Agendamiento de Turnos:**
  - Una vez calculado el costo, el usuario puede agendar un turno.
  - Se generan dinámicamente fechas y horarios disponibles para los próximos 5 días desde la fecha actual.
  - El usuario selecciona una fecha y horario, y se agenda el turno.

- **Notificaciones Interactivas:**
  - Se utilizan **SweetAlert2** para mostrar alertas y mensajes de error o éxito.

- **Almacenamiento en LocalStorage:**
  - Los datos ingresados por el usuario se almacenan en **LocalStorage** para poder ser utilizados posteriormente.

- **Manejo de Peticiones Asíncronas:**
  - El código utiliza **fetch** y **async / await** para simular el envío de datos del usuario a un servidor.

## Estructura del Proyecto

### 1. **HTML** (`index.html`)
   - Contiene el formulario donde el usuario ingresa sus datos personales.
   - Incluye un select dinámico con fechas y horarios disponibles.

### 2. **CSS** (`styles.css`)
   - Estiliza el formulario y los elementos de la página.
   - Proporciona un fondo acorde a la temática de la obra social.

### 3. **JavaScript** (`app.js`)
   - **Lógica de Cotización:** Calcula el costo total según los datos del usuario.
   - **Generación Dinámica de Fechas y Horarios:** Calcula fechas y horarios desde la fecha actual.
   - **Agendamiento de Turnos:** Envía los datos al servidor usando fetch.
   - **Manejo de Errores:** Informa al usuario sobre campos incompletos o errores.
   - **LocalStorage:** Almacena los datos del usuario en el navegador.

## Instalación y Uso

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador web.
3. Completa los campos del formulario.
4. Selecciona el plan de obra social y haz clic en **Cotizar**.
5. Selecciona una fecha y horario para agendar un turno.
6. Confirma el turno y recibirás una notificación de que ha sido agendado exitosamente.

## Requisitos

- Navegador web moderno con soporte para **LocalStorage**, **fetch API**, y **JavaScript ES6+**.
- Conexión a internet para cargar la librería **SweetAlert2** y simular la petición fetch.

## Librerías Utilizadas

- [**SweetAlert2**](https://sweetalert2.github.io/): Para notificaciones interactivas.
- **Fetch API**: Para enviar los datos del usuario a un servidor simulado.
