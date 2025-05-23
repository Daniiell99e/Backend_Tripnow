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

    // Elementos de erro
    const firstnameError = document.getElementById('firstnameError');
    const lastnameError = document.getElementById('lastnameError');
    const emailError = document.getElementById('emailError');
    const numberError = document.getElementById('numberError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');
    const contratoError = document.getElementById('contratoError');

    // Limpar mensagens de erro
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

    // Enviar se estiver tudo válido
    if (isValid) {
        const data = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            number: number.value,
            password: password.value,
            confirmpassword: confirmPassword.value,
            gender: gender ? gender.value : null,
            contrato: contrato.checked
        };

        fetch('/addUsuarioFormulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = "/";
                // Aqui você pode limpar o formulário, redirecionar ou atualizar a interface
                document.getElementById('cadastroForm').reset();
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de rede ou servidor.');
        });
    }
});
