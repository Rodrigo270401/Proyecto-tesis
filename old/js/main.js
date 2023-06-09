
$(document).ready(function () {
    URL_OBEN = new URLSearchParams(window.location.search);

})

function OpenSection(e) {
    switch ($(e).attr('data-open')) {
        
        case 'profile':
            window.location.href = "/old/edit-profile.html";
            break;

        case 'logout':
            window.location.href = "/old/index.html";
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
                    if (!(EMAIL.val() === 'antiguo@gmail.com' && PASSWORD.val() === '123456')) {
                        MESSAGE.text('Correo electrónico o contraseña incorrectos.')
                        EMAIL.addClass('border-warning')
                        PASSWORD.addClass('border-warning')
                        e.preventDefault()
                        return
                    }
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
const ModaldeleteRegistro = () => {
    $('#modal-deleteRegistro').fadeIn(500);
}

const BtnAprobarMatricula = () => {
    $('#modal-aprobar-matricula').fadeIn(500);
}

const BtnRechazarMatricula = () => {
    $('#modal-rechazar-matricula').fadeIn(500);
}

const BtnCorregirMatricula = () => {
    $('#modal-corregir-matricula').fadeIn(500);
}




/*SCRIPS DONE BY ANTONY*/
function mostrar() {
    document.getElementById('form-alumno').style.display = 'block';
    document.getElementById('form-apoderado').style.display = 'none';
}


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