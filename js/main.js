(function ($) {
    "use strict";

    /* Selecionando os elementos do formulário */
    var name = $('#nameInput');
    var email = $('#emailInput');
    var phone = $('#phoneInput');
    var altura = $('#altura');
    var pesoValue = $('#peso-value');
    var pesoIdealValue = $('#peso-ideal-value');

    /* Manipulando o envio do formulário */
    $('#contactForm').on('submit', function(event) {
        var isValid = true;

        // Validação do campo de nome
        if (name.val().trim() === '') {
            showValidate(name);
            isValid = false;
        }

        // Validação do campo de e-mail
        if (email.val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            isValid = false;
        }

        // Validação do campo de telefone
        if (phone.val().trim() === '') {
            showValidate(phone);
            isValid = false;
        }

        return isValid;
    });

    // Remover alertas de validação ao focar
    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    // Mostrar erro de validação
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    // Esconder erro de validação
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    // Funções para ajustar peso e peso ideal
    window.adjustPeso = function(delta) {
        var peso = parseInt(pesoValue.text()) + delta;
        if (peso >= 0) { // Evitar valores negativos
            pesoValue.text(peso);
        }
    }

    window.adjustPesoIdeal = function(delta) {
        var pesoIdeal = parseInt(pesoIdealValue.text()) + delta;
        if (pesoIdeal >= 0) { // Evitar valores negativos
            pesoIdealValue.text(pesoIdeal);
        }
    }

    // Exibir valor de altura atualizado
    altura.on('input', function() {
        $('#altura-value').text($(this).val() + 'm');
    });

})(jQuery);
