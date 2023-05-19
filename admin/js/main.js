let countaddrs = 2;
let countadelivery = 2;
$(document).ready(function () {
    URL_OBEN = new URLSearchParams(window.location.search);
    if (URL_OBEN.get('action') === "directlogin") {
        $('.m-crea-section.right').addClass('inactive')
        $('.m-crea-section.right').children('.m-crea__content').removeClass('active')
        $('.m-crea-section.right').children('.m-crea__content:last-child').addClass('active')
        $('.m-crea-section.left').addClass('inactive')
    } else
        if (URL_OBEN.get('action') === "openmodal") {
            $('.m-crea-modal').fadeIn();
        }
})

function OpenSection(e) {
    switch ($(e).attr('data-open')) {
        case 'login':
            new WOW().init();
            if ($('.m-crea-section.left').hasClass('inactive')) {
                $('.m-crea-section.left').removeClass('inactive')
            } else {
                $('.m-crea-section.left').addClass('inactive')
            }
            if ($('.m-crea-section.right').hasClass('inactive')) {
                $('.m-crea-section.right').removeClass('inactive')
            } else {
                $('.m-crea-section.right').addClass('inactive')
            }
            if ($('.m-crea-section.right').children('.m-crea__content:last-child').hasClass('active')) {
                $('.m-crea-section.right').children('.m-crea__content:first-child').addClass('active')
                $('.m-crea-section.right').children('.m-crea__content:last-child').removeClass('active')
            } else {
                $('.m-crea-section.right').children('.m-crea__content:first-child').removeClass('active')
                $('.m-crea-section.right').children('.m-crea__content:last-child').addClass('active')
            }
            break;
        case 'register':
            $('.m-crea-section.left').addClass('inactive')
            window.location.href = "/register.html";
            break;
        //         case 'bussiness':
        //             $('.m-crea-section.left').addClass('inactive')
        //             window.location.href = "/register-bussiness.html" ;
        //             break; 
        //             case 'rescue':
        //                 $('.m-crea-section.left').addClass('inactive')
        //                 window.location.href = "/rescue-account.html";
        //             break; 
        //             case 'directlogin':
        //                 $('.m-crea-section.left').addClass('inactive')
        //                 window.location.href = "/?action=directlogin" ;
        //     break;


        case 'profile':
            window.location.href = "/bgroup/admin/edit-profile.html";
            break;

        case 'logout':
            window.location.href = "/bgroup/admin/index.html";
            break;
        // case 'new-historical':
        //     window.location.href = "/nueva-solicitud.html" ;
        //     break;
        // case 'historical':
        //     window.location.href = "/historico-solicitudes.html" ;
        //     break;

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
                    if (!(EMAIL.val() === 'admin@gmail.com' && PASSWORD.val() === '123456')) {
                        MESSAGE.text('Correo electrónico o contraseña incorrectos.')
                        EMAIL.addClass('border-warning')
                        PASSWORD.addClass('border-warning')
                        e.preventDefault()
                        return
                    }
            break;

        /** recuperar contraseña validator */
        case 'rescue':
            var EMAIL = $('#email');
            var MESSAGE = $('.text-warning')
            if (!ValidateEmail(EMAIL.val())) {
                MESSAGE.text('Correo inválido. Por favor ingrese un correo con el formato correcto.')
                e.preventDefault()
                EMAIL.addClass('border-warning')
                return
            } else {
                $('.m-crea-modal').fadeIn();
                e.preventDefault()
                timeooutredirect('login')
            }
            break;
        /** post recuperador de contraseña validator */
        case 'post-rescue':
            var CONTRASEÑA1 = $('#password');
            var CONTRASEÑA2 = $('#password2');
            var MESSAGE1 = $('#pasword1-message')
            var MESSAGE2 = $('#pasword2-message')
            if (itsempyornull(CONTRASEÑA1.val())) {
                MESSAGE1.text('El campo no puede quedar vacío.')
                e.preventDefault()
                CONTRASEÑA1.addClass('border-warning')
                return
            } else if (CONTRASEÑA1.val().length < 8) {
                MESSAGE1.text('Debe contenener un mínimo de 8 caracteres.')
                e.preventDefault()
                CONTRASEÑA1.addClass('border-warning')
                return
            } else
                if (!(CONTRASEÑA1.val() === CONTRASEÑA2.val())) {
                    MESSAGE2.text('Las contraseñas no coinciden.')
                    CONTRASEÑA1.addClass('border-warning')
                    CONTRASEÑA2.addClass('border-warning')
                    e.preventDefault()
                    return
                } else {
                    $('.m-crea-modal').fadeIn();
                    e.preventDefault()
                    timeooutredirect('login')
                }
            break;
        /** Registrar validator */
        case 'register':
            var NAME = $('#name');
            var LASTNAME = $('#lastname')
            var EMAIL = $('#email')
            var IDFISCAL = $('#fiscal')
            var CARGO = $('#position');
            var PHONE = $('#phone')
            if (itsempyornull(NAME.val())) {
                NAME.siblings('.text-warning').text('El campo nombre no puede quedar vacio')
                NAME.addClass('border-warning')
                e.preventDefault()
                return
            } else
                if (itsempyornull(LASTNAME.val())) {
                    LASTNAME.siblings('.text-warning').text('El campo apellido no puede quedar vacio')
                    LASTNAME.addClass('border-warning')
                    e.preventDefault()
                    return
                } else
                    if (!ValidateEmail(EMAIL.val())) {
                        EMAIL.siblings('.text-warning').text('Debe introducir una direccion de email válida')
                        e.preventDefault()
                        EMAIL.addClass('border-warning')
                        return
                    } /*else 
            if (itsempyornull(IDFISCAL.val())) {
                IDFISCAL.siblings('.text-warning').text('El campo id fiscal no puede quedar vacio') 
                IDFISCAL.addClass('border-warning')
                e.preventDefault()
                return
            } else
            if (itsempyornull(CARGO.val())) {
                CARGO.siblings('.text-warning').text('El campo cargo no puede quedar vacio') 
                CARGO.addClass('border-warning')
                e.preventDefault()
                return
            } else*/
            /* if (itsempyornull(PHONE.val())) {
                 PHONE.siblings('.text-warning').text('El campo telefono no puede quedar vacio') 
                 PHONE.addClass('border-warning')
                 e.preventDefault()
                 return
             }*/
            break;
        case 'form-cotiza':
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
function timeooutredirect(path) {
    switch (path) {
        case 'login':
            setTimeout(() => {
                window.location.href = "/?action=directlogin";
            }, "5000")
            break;
        case 'cotizar':
            setTimeout(() => {
                window.location.href = "/historico-solicitudes.html";
            }, "5000")
            break;
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