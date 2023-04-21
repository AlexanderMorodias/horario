// Elemento contenedor de la tabla
const contenedor = document.getElementById('horario');

// Definir los días de la semana
const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

// Definir las horas de inicio y fin del horario
const horaInicio = 7;
const horaFin = 22;

// Crear la tabla de horarios
const tabla = document.createElement('table');
tabla.id = 'horario';

// Crear el encabezado de la tabla
const encabezado = document.createElement('thead');
const filaEncabezado = document.createElement('tr');
const encabezadosDias = dias.map(dia => {
    const encabezadoDia = document.createElement('th');
    encabezadoDia.textContent = dia;
    return encabezadoDia;
});
const indexHora = filaEncabezado.appendChild(document.createElement('th'));
indexHora.textContent = 'Hora';
encabezadosDias.forEach(encabezadoDia => filaEncabezado.appendChild(encabezadoDia));
encabezado.appendChild(filaEncabezado);
tabla.appendChild(encabezado);

console.log(encabezado);
console.log(filaEncabezado);
console.log(encabezadosDias);

// Crear el cuerpo de la tabla
const cuerpo = document.createElement('tbody');
for (let hora = horaInicio; hora < horaFin; hora = hora + 2) {
    const filaHora = document.createElement('tr');
    const celdaHora = document.createElement('th');
    hora == 13 ? hora++ : hora;
    celdaHora.textContent = `${hora}:00 - ${hora + 2}:00`;
    filaHora.appendChild(celdaHora);
    for (let dia = 0; dia < dias.length; dia++) {
        const celda = document.createElement('td');
        celda.className = 'asignatura';
        celda.dataset.id = `${dias[dia].toLowerCase()}-${hora}`;
        filaHora.appendChild(celda);
    }
    cuerpo.appendChild(filaHora);
}
tabla.appendChild(cuerpo);

// Agregar la tabla al contenedor
contenedor.appendChild(tabla);