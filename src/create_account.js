document.addEventListener("DOMContentLoaded", () => {
    const registerUser = document.querySelector('.submit-button');
    const passwordInput = document.getElementById('password');
    const pass_border = document.querySelector('password');
    const eyeIcon = document.getElementById('eye-icon');
    const errorMessageDiv = document.querySelector('.error-message');

    function togglePassword() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.src = 'images/hidden.png';
        } else {
            passwordInput.type = 'password';
            eyeIcon.src = 'images/eye.png';
        }
    }

    if (eyeIcon) {
        eyeIcon.addEventListener('click', togglePassword);
    }

    registerUser.addEventListener('click', async () => {
        const userName = document.getElementById('username').value;
        const emailAddress = document.getElementById('email-address').value;
        const passWord = passwordInput.value;

        if (passWord.length < 8) {
            errorMessageDiv.innerHTML = 'Password should be at least 8 characters long';
        } else {
            errorMessageDiv.innerHTML = '';

            try {
                const response = await fetch('http://127.0.0.1:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': userName,
                        'email': emailAddress,
                        'password': passWord,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    alert('Registration successful');
                } else {
                    errorMessageDiv.innerHTML = result.message;
                }
            } catch (error) {
                errorMessageDiv.innerHTML = 'An error occurred. Please try again.';
                console.error('Error:', error);
            }
        }
    });

    passwordInput.addEventListener('input', () => {
        const passWord = passwordInput.value;
        const textElement = document.querySelector('.text');
        if (passWord.length < 8) {
            textElement.classList.add('text-red');
            textElement.classList.remove('text-green');
            pass_border.classList.remove('border-green');
            pass_border.classList.add('border-red');
        } else {
            textElement.classList.remove('text-red');
            textElement.classList.add('text-green');
            pass_border.classList.remove('border-red');
            pass_border.classList.add('border-green');
        }
    });
});
