
$(document).ready(function () {
    URL_OBEN = new URLSearchParams(window.location.search);

})

function OpenSection(e) {
    switch ($(e).attr('data-open')) {
        case 'profile':
            window.location.href = "/edit-profile.html";
            break;

        case 'logout':
            window.location.href = "/index.html";
            break;
    }
}

$(document).on('click', function (e) {
    if (e.target.className === 'm-crea-modal__background') {
        $('.m-crea-modal').fadeOut();
    }
    if (!$(e.target).closest(".intranet-select").length) {
        $('.intranet-select.opened').removeClass('opened')
    }
    if ($(document).width() <= 768) {
        if (!$(e.target).closest(".sub-menu__amb").length) {
            $('.sub-menu__amb').removeClass('active')
            $('.sidebar').fadeOut()
        }
    }

})

$('.modal-btn__close').on('click', function () {
    $('.m-crea-modal').fadeOut();
})

/** Custom Select */
$('.intranet-select').on('click', function () {
    if (!$(this).is('[disabled]')) {
        if (!$(this).hasClass('opened')) {
            $(this).addClass('opened')
        } else {
            $(this).removeClass('opened')
        }
        $('.intranet-select').not($(this)).removeClass('opened');
    }
})
$('.i-options span').on('click', function () {
    $(this).parent().find('span').removeAttr('selected')
    this.setAttribute('selected', '');
    $(this).parents().siblings('h1').text($(this).text())
})
$('form input').on('change keyup paste', function () {
    $(this).removeClass('border-warning')
    $(this).siblings('.text-warning').text('')
    if ($(this).val().length > 0) {
        $(this).siblings('span.icon-eye').fadeIn()
    } else {
        $(this).siblings('span.icon-eye').fadeOut()
    }
})
$('fieldset span.icon-eye').on('click', function () {
    $(this).toggleClass('op-eye')
    if ($(this).siblings('input').attr('type') === 'password') {
        $(this).siblings('input').attr('type', 'text')
    } else {
        $(this).siblings('input').attr('type', 'password')
    }
})
$('.sub-menu__amb').on('click', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $('.sidebar').fadeIn()
    } else {
        $('.sidebar').fadeOut()
    }
})
$('form').submit(function (e) {
    $('.text-warning').text('')
    switch ($(this).attr('data-form')) {
        /** Validaciones para inicio de sesion */
        case 'login':
            var EMAIL = $('#email');
            var PASSWORD = $('#password');
            var MESSAGE = $('#login')
            if (!ValidateEmail(EMAIL.val())) {
                MESSAGE.text('Debe introducir una direccion de email válida')
                e.preventDefault()
                EMAIL.addClass('border-warning')
                return
            } else
                if (itsempyornull(PASSWORD.val())) {
                    MESSAGE.text('El campo contraseña no puede quedar vacio')
                    PASSWORD.addClass('border-warning')
                    e.preventDefault()
                    return
                } else
                    if (!(EMAIL.val() === 'apoderado@gmail.com' && PASSWORD.val() === '123456')) {
                        MESSAGE.text('Correo electrónico o contraseña incorrectos.')
                        EMAIL.addClass('border-warning')
                        PASSWORD.addClass('border-warning')
                        e.preventDefault()
                        return
                    }
            break;
            $('.steps-process').children('.space').last().addClass('active')
            $('.steps-process').children('.stp').last().children('.tag').addClass('active')
            $('.steps-process').children('.stp').last().children('.number').addClass('active')
            $('.m-crea-modal').fadeIn();
            e.preventDefault()
            timeooutredirect('cotizar')
            break;
    }

})

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
function itsempyornull(val) {
    if (val === '' || val === ' ' || val === null) {
        return (true)
    } else {
        return (false)
    }
}


const ModalgenerarMatricula = () => {
    $('#modal-generarmatricula').fadeIn(500);

}
const ModalOpcionesPago = () => {
    $('#modal-opcionespago').fadeIn(500);

}







/*SCRIPS FOR REGISTER PAGE*/

/*FUNCIONES PARA LA PARTE DE APODERADO*/

const parentesco = document.getElementById("parentesco");
const opciones = document.getElementById("tipo-parentesco");
const apoderado1 = document.getElementById("apoderado1");
const apoderado2 = document.getElementById("apoderado2");
const archivoApoderado = document.getElementById("archivo-apoderado");

const boton = document.getElementById("boton");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const boton3 = document.getElementById("boton3");
const boton4 = document.getElementById("boton4");
const boton5 = document.getElementById("boton5");

const nombreA = document.getElementById("nombre-apoderado");
const apellidoA = document.getElementById("apellido-apoderado");
const correo = document.getElementById("correoelectronico");
const telefono = document.getElementById("telefono");
const dni = document.getElementById("dni-apoderado");
const domicilio = document.getElementById("direccioncasa");
const trabajo = document.getElementById("direccion");
const clave1 = document.getElementById("contra");
const clave2 = document.getElementById("confirmarcontra");

const nombreA1 = document.getElementById("nombre-apoderado1");
const apellidoA1 = document.getElementById("apellido-apoderado1");
const correo1 = document.getElementById("correoelectronico1");
const telefono1 = document.getElementById("telefono1");
const dni1 = document.getElementById("dni-apoderado1");
const domicilio1 = document.getElementById("direccioncasa1");
const trabajo1 = document.getElementById("direccion1");
const clave11 = document.getElementById("contra1");
const clave21 = document.getElementById("confirmarcontra1");

const nombreA2 = document.getElementById("nombre-alumno");
const apellidoA2 = document.getElementById("apellido-alumno");
const dni2 = document.getElementById("dni-alumno");
const fechaN = document.getElementById("nacimiento-alumno");
const nivelA = document.getElementById("nivel-academico");

parentesco.addEventListener("change", function () {
    const valorSeleccionado = parentesco.value;

    opciones.innerHTML = "";

    if (valorSeleccionado === "0") {
        document.getElementById('responsable').style.display = 'none';
        document.getElementById('documentos').style.display = 'none';
    } else if (valorSeleccionado === "1") {
        document.getElementById('responsable').style.display = 'flex';
        document.getElementById('documentos').style.display = 'none';
        const options = ["Eliga una opción", "Padre", "Madre"];
        options.forEach(function (opcion) {
            const newOpcion = document.createElement("option");
            newOpcion.value = opcion;
            newOpcion.textContent = opcion;
            opciones.appendChild(newOpcion);
        })
    } else {
        document.getElementById('responsable').style.display = 'flex';
        document.getElementById('documentos').style.display = 'flex';
        const options = ["Eliga una opción", "Abuelo"];
        options.forEach(function (opcion) {
            const newOpcion = document.createElement("option");
            newOpcion.value = opcion;
            newOpcion.textContent = opcion;
            opciones.appendChild(newOpcion);
        })
    }
});


/*FUNCIONES PARA MOSTRAR Y OCULTAR FORMULARIOS DEL REGISTER*/

function mostrar() {
    apoderado1.textContent = "Padre"
    apoderado2.textContent = "Madre"
    if (opciones.value === "Padre") {
        document.getElementById('form-tipo-apoderado').style.display = 'none';
        document.getElementById('form-apoderado').style.display = 'block';
        document.getElementById('pss-padre').style.display = 'flex';
        ocultar1;
        boton.value = "0";
        boton1.value = "1";
        boton2.value = "2";
        boton3.value = "3";
        boton4.value = "4";
        boton5.value = "5";
    } else if (opciones.value === "Madre") {
        document.getElementById('form-apoderado-madre').style.display = 'block';
        document.getElementById('form-tipo-apoderado').style.display = 'none';
        document.getElementById('pss-madre').style.display = 'flex';
        ocultar2;
        boton.value = "0";
        boton1.value = "6";
        boton2.value = "7";
        boton3.value = "8";
        boton4.value = "9";
        boton5.value = "10";
        document.getElementById('pss-madre').style.display = 'flex';
    } else if (opciones.value === "Abuelo") {
        if (archivoApoderado.value === '') {
            alert("Seleccione un archivo");
        } else {
            document.getElementById('form-tipo-apoderado').style.display = 'none';
            document.getElementById('form-apoderado').style.display = 'block';
            document.getElementById('pss-padre').style.display = 'flex';
            apoderado1.textContent = "Abuelo"
            boton.value = "0";
            boton1.value = "11";
            boton2.value = "12";
            boton3.value = "13";
            boton4.value = "14";
            boton5.value = "15";
        }
    } else {
        alert("Seleccione una opción");
    }
}

function ocultar1() {
    if (boton1.value === "1") {
        document.getElementById('form-tipo-apoderado').style.display = 'block';
        document.getElementById('form-apoderado').style.display = 'none';
    } else if (boton1.value === "3") {
        document.getElementById('form-apoderado-madre').style.display = 'block';
        document.getElementById('form-apoderado').style.display = 'none';
    } else if (boton1.value === "6") {
        document.getElementById('form-apoderado-madre').style.display = 'block';
        document.getElementById('form-apoderado').style.display = 'none';
    } else if (boton1.value === "11") {
        document.getElementById('form-tipo-apoderado').style.display = 'block';
        document.getElementById('form-apoderado').style.display = 'none';
    }
}

function mostrar1() {
    if (boton2.value === "2") {
        if (nombreA.value === "" || apellidoA.value === "" || correo.value === "" || telefono.value === "" || dni.value === "" || domicilio.value === "" || trabajo.value === "" || clave1.value === "" || clave2.value === "") {
            alert("Por favor, complete los campos");
        } else if (clave1.value == clave2.value) {
            document.getElementById('form-apoderado-madre').style.display = 'block';
            document.getElementById('form-apoderado').style.display = 'none';
            document.getElementById('pss-madre').style.display = 'none';
        } else {
            alert("Las contraseñas no coiciden");
        }
    } else if (boton2.value === "7") {
        if (nombreA.value === "" || apellidoA.value === "" || correo.value === "" || telefono.value === "" || dni.value === "" || domicilio.value === "" || trabajo.value === "") {
            alert("Por favor, complete los campos");
        } else {
            document.getElementById('form-alumno').style.display = 'block';
            document.getElementById('form-apoderado').style.display = 'none';
        }
    } else if (boton2.value === "12") {
        if (nombreA.value === "" || apellidoA.value === "" || correo.value === "" || telefono.value === "" || dni.value === "" || domicilio.value === "" || trabajo.value === "" || clave1.value === "" || clave2.value === "") {
            alert("Por favor, complete los campos");
        } else if (clave1.value == clave2.value) {
            document.getElementById('form-alumno').style.display = 'block';
            document.getElementById('form-apoderado').style.display = 'none';
        } else {
            alert("Las contraseñas no coiciden");
        }
    }
}

function mostrar2() {
    if (boton4.value === "4") {
        if (nombreA1.value === "" || apellidoA1.value === "" || correo1.value === "" || telefono1.value === "" || dni1.value === "" || domicilio1.value === "" || trabajo1.value === "") {
            alert("Por favor, complete los campos");
        } else {
            document.getElementById('form-alumno').style.display = 'block';
            document.getElementById('form-apoderado-madre').style.display = 'none';
        }
    } else if (boton4.value === "9") {
        if (nombreA1.value === "" || apellidoA1.value === "" || correo1.value === "" || telefono1.value === "" || dni1.value === "" || domicilio1.value === "" || trabajo1.value === "" || clave11.value === "" || clave21.value === "") {
            alert("Por favor, complete los campos");
        } else if (clave11.value == clave21.value) {
            document.getElementById('form-apoderado-madre').style.display = 'none';
            document.getElementById('form-apoderado').style.display = 'block';
            document.getElementById('pss-padre').style.display = 'none';
        } else {
            alert("Las contraseñas no coiciden");
        }
    }
}

function ocultar() {
    if (boton5.value === "5") {
        document.getElementById('form-alumno').style.display = 'none';
        document.getElementById('pss-madre').style.display = 'none';
        document.getElementById('form-apoderado-madre').style.display = 'block';
    } else if (boton5.value === "10") {
        document.getElementById('form-alumno').style.display = 'none';
        document.getElementById('form-apoderado').style.display = 'block';
        document.getElementById('pss-padre').style.display = 'none';
    } else if (boton5.value === "15") {
        document.getElementById('form-alumno').style.display = 'none';
        document.getElementById('form-apoderado').style.display = 'block';
    }
}

function ocultar2() {
    if (boton3.value === "3") {
        document.getElementById('form-apoderado-madre').style.display = 'none';
        document.getElementById('form-apoderado').style.display = 'block';
        document.getElementById('pss-padre').style.display = 'flex';
    } else if (boton3.value === "8") {
        document.getElementById('form-apoderado-madre').style.display = 'none';
        document.getElementById('form-tipo-apoderado').style.display = 'block';
    }
}

/*FUNCIONES PARA LA PARTE DE GRADO Y SECCION*/

const nivelAcademicoSelect = document.getElementById("nivel-academico");
const resultadoSelect = document.getElementById("resultado");

resultadoSelect.innerHTML = "<option value='0'>Eliga un Grado</option>";

nivelAcademicoSelect.addEventListener("change", function () {
    const valorSeleccionado = nivelAcademicoSelect.value;

    resultadoSelect.innerHTML = "";

    if (valorSeleccionado === "1") {
        const nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = "0";
        nuevaOpcion.textContent = "Eliga un Grado";
        resultadoSelect.appendChild(nuevaOpcion);
    } else if (valorSeleccionado === "2") {
        const opciones = ["1", "2", "3", "4", "5", "6"];
        opciones.forEach(function (opcion) {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = opcion;
            nuevaOpcion.textContent = opcion;
            resultadoSelect.appendChild(nuevaOpcion);
        })
    } else if (valorSeleccionado === "3") {
        const opciones = ["1", "2", "3", "4", "5"];
        opciones.forEach(function (opcion) {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = opcion;
            nuevaOpcion.textContent = opcion;
            resultadoSelect.appendChild(nuevaOpcion);
        });
    }
});

/*FUNCIONES PARA AUMENTAR Y DISMINUIR LA CANTIDAD DE ALUMNOS RESGISTRADOS*/

const disminuir = document.getElementById('decrease-btn');
const aumentar = document.getElementById('increase-btn');
const cantidadtexto = document.getElementById('cantidad-alumno');

disminuir.addEventListener('click', () => {
    event.preventDefault();
    let cantidad = parseInt(cantidadtexto.value);
    if (cantidad > 1) {
        cantidad--;
        cantidadtexto.value = cantidad;
    }
});

aumentar.addEventListener('click', () => {
    event.preventDefault();
    let cantidad = parseInt(cantidadtexto.value);
    if (cantidad < 5) {
        cantidad++;
        cantidadtexto.value = cantidad;
    }
})


/*FUNCIONES MODAL PARA FINALIZAR EL REGISTRO*/

let openModal = document.getElementById('openModal');
let modalMensaje = document.getElementById('modal');
let closeModal = document.getElementById('closeModal')

//Abrir Modal

openModal.onclick = function () {
    if (nombreA2.value === "" || apellidoA2.value === "" || dni2.value === "" || fechaN.value === "" || nivelA.value === "1") {
        alert("Por favor, complete los campos");
    } else {
        modalMensaje.style.visibility = "visible";
    }
}

closeModal.onclick = function () {
    modalMensaje.style.visibility = "hidden";
}


/*AGREGAR FORMULARIOS ALUMNO*/
const fomrs = document.getElementById("formularios-alumnos");

function AddCallback(e) {
    switch ($(e).attr('data-action')) {
        case 'add-alumno':
            if (cantidadtexto.value == 5) {
                alert('No se pueden registrar más de 5 alumnos')
            } else {
                $('.formularios-container').append(`

                <div class="item-form-alumno">
                <div class="input-box">
                    <fieldset>
                        <label for="alumno">Alumnos ${parseInt(cantidadtexto.value) + 1}</label>
                    </fieldset>
                </div>
                <div class="formulario-apoderado">
                    <div class="input-box">
                        <div class="box">
                            <label for="nombre-alumno">Nombres</label>
                            <input type="text" placeholder="Ingrese su nombre" id="nombre-alumno"
                                class="input-padron">
                        </div>
                        <div class="box">
                            <label for="apellido-alumno">Apellidos</label>
                            <input type="text" placeholder="Ingreses sus Apellidos" id="apellido-alumno"
                                class="input-padron">
                        </div>
                    </div>
                    <div class="input-box">
                        <div class="box">
                            <label for="dni-alumno">DNI</label>
                            <input type="number" placeholder="XXXXXXXX" id="dni-alumno"
                                class="input-padron">
                        </div>
                        <div class="box">
                            <label for="nacimiento-alumno">Fecha de Nacimiento</label>
                            <input type="date" id="nacimiento-alumno" class="input-padron">
                        </div>
                    </div>
                    <div class="input-box">
                        <div class="box">
                            <label for="nivelacademico">Nivel Académico</label>
                            <select class="input-padron" id="nivel-academico">
                                <option value="1">Elige una opción</option>
                                <option value="2">Primaria</option>
                                <option value="3">Secundaria</option>
                            </select>
                        </div>
                        <div class="box">
                            <label for="grado">Grado</label>
                            <select class="input-padron" id="resultado"> </select>
                        </div>
                    </div>
                </div>
            </div>
            `)
            }
            break;
        case 'rm-alumno':
            // $(e).parent().remove();
            if (cantidadtexto.value > 1) {
                // $('.formularios-container').remove();
                $('.item-form-alumno').last().remove();
            }
            break;
    }
}