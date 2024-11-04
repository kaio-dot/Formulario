// Inicializar efeito tilt
$('.js-tilt').tilt({ scale: 1.1 });

// Formatação do telefone
document.getElementById('phoneInput').addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1)$2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1)$2');
    }
    this.value = value;
});

// Função de loading do botão
document.getElementById('submitButton').addEventListener('click', function() {
    const button = this;
    
    // Adiciona o spinner de loading e desativa o botão
    button.classList.add('loading');
    button.innerHTML = '<span class="spinner"></span> Enviando...';

    // Simulação de tempo para envio (ajuste conforme necessário)
    setTimeout(() => {
        // Troca o conteúdo do botão para "Enviado" e adiciona um ícone de check
        button.classList.remove('loading');
        button.innerHTML = '<span>Enviado</span> <i class="fa fa-check" aria-hidden="true"></i>';
    }, 2000); // 2 segundos de espera para o loading
});

function handleSubmit(event) {
    event.preventDefault();

    // Captura os valores dos inputs
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const phoneInputValue = document.getElementById('phoneInput').value.trim();
    const alturaInput = document.getElementById('heightInput').value.trim();
    const pesoInput = document.getElementById('weightInput').value.trim();
    const pesoIdealInput = document.getElementById('idealWeightInput').value.trim();

    // Validações dos campos (sem validação específica do telefone)
    if (!nameInput || !emailInput || !phoneInputValue || !alturaInput || !pesoInput || !pesoIdealInput) {
        alert('Por favor, preencha todos os campos antes de prosseguir.');
        return;
    }

    // Validação do e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Enviar dados para o backend via AJAX
    $.ajax({
        url: 'app.php',
        type: 'POST',
        data: { 
            nome: nameInput,
            email: emailInput,
            phone: phoneInputValue,
            altura: alturaInput,
            peso: pesoInput,
            pesoIdeal: pesoIdealInput
        },
        success: function(response) {
            const jsonResponse = JSON.parse(response);
            console.log("Resposta do servidor:", jsonResponse);
            if (jsonResponse.success) {
                document.getElementById('contactForm').reset();
                const whatsappUrl = `#`;
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1500); //1,5 segundos
            } else if (jsonResponse.errors) {
                alert(jsonResponse.errors.join('\n'));
            } else {
                alert('Ocorreu um erro inesperado.');
            }
        },
        error: function(error) {
            console.error("Erro ao enviar dados:", error);
            alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
        }
    });
}

document.getElementById('contactForm').addEventListener('submit', handleSubmit);
