// Obtener elementos del DOM
const horario = document.getElementById('horario');
const formAgregar = document.getElementById('form-agregar');

// Crear array para almacenar las asignaturas
const asignaturas = [];

// Función para agregar una asignatura al horario
function agregarAsignatura(nombre, dia, horaInicio, horaFin, aula, grupo, codGrupo) {
    const idCelda = `${dia}-${horaInicio.getHours()}`;
    const celda = document.querySelector(`[data-id="${idCelda}"]`);

    if (!celda) {
        console.error('La celda no existe');
        return;
    }

    const asignatura = document.createElement('div');
    asignatura.className = 'asignatura';
    asignatura.innerHTML = nombre + ' ' + codGrupo + '-' + grupo + '<br>' + aula;

    celda.appendChild(asignatura);

    asignaturas.push({ nombre, dia, horaInicio, horaFin, aula, grupo, codGrupo });
}


function horaIndex(horaInicio) {
    const hora = horaInicio.getHours();
    const minutos = horaInicio.getMinutes();

    // Ajustar la hora y minutos para que coincidan con los índices de fila y columna
    if (minutos >= 45) {
        hora++;
    } else if (minutos >= 15) {
        hora += 0.5;
    }

    return hora + 1; // Sumar 1 para compensar la fila de horas en la tabla
}




// Función para eliminar una asignatura del horario
function eliminarAsignatura(index) {
    // Obtener la asignatura del array y la duración en horas
    const asignatura = asignaturas[index];
    const duracion = Math.round((asignatura.horaFin - asignatura.horaInicio) / (1000 * 60 * 60));

    // Eliminar la asignatura de la matriz del horario
    for (let i = 0; i < duracion; i++) {
        const filaAsignatura = horario.querySelector(`tr:nth-child(${asignatura.horaInicio.getHours() - 7 + i})`);
        const columnaAsignatura = filaAsignatura.querySelector(`td:nth-child(${diaIndex(asignatura.dia)})`);
        columnaAsignatura.classList.remove('asignatura');
        columnaAsignatura.textContent = '';
    }

    // Eliminar la asignatura del array
    asignaturas.splice(index, 1);
}

// Función para obtener el índice del día en la tabla del horario
function diaIndex(dia) {
    const primerDiaSemana = 1; // Lunes = 1, Domingo = 7
    switch (dia) {
        case 'lunes':
            return primerDiaSemana + 1;
        case 'martes':
            return primerDiaSemana + 2;
        case 'miércoles':
            return primerDiaSemana + 3;
        case 'jueves':
            return primerDiaSemana + 4;
        case 'viernes':
            return primerDiaSemana + 5;
        case 'sábado':
            return primerDiaSemana + 6;
        case 'domingo':
            return primerDiaSemana + 7;
        default:
            console.error('Día inválido: ' + dia);
            return null;
    }
}


// Manejador de eventos para el formulario de agregar una asignatura
formAgregar.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = event.target.elements.nombre.value;
    const dia = event.target.elements.dia.value;
    const aula = event.target.elements.aula.value;
    const grupo = event.target.elements.grupo.value;
    const codGrupo = event.target.elements.codGrupo.value;
    const horaInicio = new Date(`1970-01-01T${event.target.elements.hora_inicio.value}`);
    const horaFin = new Date(`1970-01-01T${event.target.elements.hora_fin.value}`);

    console.log(nombre)
    console.log(dia)
    console.log(horaInicio)
    console.log(horaFin)
    console.log(aula)
    console.log(grupo)
    console.log(codGrupo)

    // Agregar la asignatura al horario y limpiar el formulario
    agregarAsignatura(nombre, dia, horaInicio, horaFin, aula, grupo, codGrupo);
    dibujarListaAsignaturas();
    formAgregar.reset();
});

// Manejador de eventos para el botón de eliminar una asignatura
horario.addEventListener('click', function(event) {
    if (event.target.classList.contains('asignatura')) {
        // Obtener la columna y fila de la asignatura
        const columna = event.target;
        const fila = columna.parentNode;

        // Obtener el índice de la asignatura en el array
        const index = asignaturas.findIndex(function(asignatura) {
            return asignatura.dia === diaNombre(columna.cellIndex) &&
                asignatura.horaInicio.getHours() === fila.rowIndex + 7;
        });

        // Eliminar la asignatura del horario y del array
        eliminarAsignatura(index);
    }
});

// Función para obtener el nombre del día en la tabla del horario
function diaNombre(index) {
    switch (index) {
        case 2:
            return 'lunes';
        case 3:
            return 'martes';
        case 4:
            return 'miercoles';
        case 5:
            return 'jueves';
        case 6:
            return 'viernes';
        case 7:
            return 'sabado';
        case 8:
            return 'domingo';
    }
}

//_______________________________________________________________________________

function dibujarListaAsignaturas() {
    const lista = document.createElement('ul');
    for (let i = 0; i < asignaturas.length; i++) {
        const asignatura = asignaturas[i];
        const texto = `${asignatura.nombre} (${asignatura.aula}, ${asignatura.codGrupo} - ${asignatura.grupo})`;
        const elementoLista = document.createElement('li');
        elementoLista.textContent = texto;
        lista.appendChild(elementoLista);
    }
    const contenedorLista = document.getElementById('lista-asignaturas');
    contenedorLista.innerHTML = '';
    contenedorLista.appendChild(lista);
}