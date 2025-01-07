/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// login.js

// Selecciona el botón de submit y el mensaje de error
const submit = document.getElementById('login');
const loginError = document.querySelector('.login-message-error');

// Función que se ejecuta cuando se hace clic en el botón de login
submit.addEventListener('click', (e) => {
    // Prevenir el comportamiento por defecto del formulario (no recarga la página)
    e.preventDefault();

    // Obtiene los valores de email y contraseña del formulario
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Validación simple para email y contraseña
    if (email.value === "test@alura.com") {
        if (password.value === "alura123") {
            // Si el login es correcto, redirige al admin.html
            window.location.href = './admin.html';
        } else {
            // Si la contraseña es incorrecta, muestra un mensaje de error
            loginError.classList.add('invalid-login');
        }
    } else {
        // Si el email es incorrecto, muestra un mensaje de error
        loginError.classList.add('invalid-login');
    }
});

