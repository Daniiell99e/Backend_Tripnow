// Máscara de CEP (aplicada uma única vez)
document.getElementById('cep').addEventListener('input', function (e) {
    let cep = e.target.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
    e.target.value = cep;
});

// Listener para o envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Elementos do formulário
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const number = document.getElementById('number');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmpassword');
    const gender = document.querySelector('input[name="gender"]:checked');
    const contrato = document.getElementById('contrato');

    // Endereço
    const cep = document.getElementById('cep');
    const rua = document.getElementById('rua');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const complemento = document.getElementById('complemento');

    // Mensagens de erro
    const firstnameError = document.getElementById('firstnameError');
    const lastnameError = document.getElementById('lastnameError');
    const emailError = document.getElementById('emailError');
    const numberError = document.getElementById('numberError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');
    const contratoError = document.getElementById('contratoError');

    // Limpa os erros anteriores
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => input.classList.remove('error'));

    let isValid = true;

    // Validações
    if (!firstname.value.trim()) {
        firstnameError.style.display = 'block';
        firstname.classList.add('error');
        isValid = false;
    }

    if (!lastname.value.trim()) {
        lastnameError.style.display = 'block';
        lastname.classList.add('error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.style.display = 'block';
        email.classList.add('error');
        isValid = false;
    }

    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(number.value)) {
        numberError.style.display = 'block';
        number.classList.add('error');
        isValid = false;
    }

    if (password.value.length < 6) {
        passwordError.style.display = 'block';
        password.classList.add('error');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        confirmPasswordError.style.display = 'block';
        confirmPassword.classList.add('error');
        isValid = false;
    }

    if (!gender) {
        genderError.style.display = 'block';
        isValid = false;
    }

    if (!contrato.checked) {
        contratoError.style.display = 'block';
        isValid = false;
    }

    // Se válido, envia
    if (isValid) {
        const data = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            number: number.value,
            password: password.value,
            confirmpassword: confirmPassword.value,
            gender: gender ? gender.value : null,
            contrato: contrato.checked,
            cep: cep.value,
            rua: rua.value,
            bairro: bairro.value,
            cidade: cidade.value,
            complemento: complemento.value
        };

        const csrfTokenInput = document.getElementById('csrf_token');
        const csrfToken = csrfTokenInput ? csrfTokenInput.value : '';

        fetch('/addUsuarioFormulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if (status === 200) {
                alert(body.message);
                window.location.href = "/";
            } else {
                alert(body.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de rede ou servidor. Tente novamente.');
        });
    }
});
