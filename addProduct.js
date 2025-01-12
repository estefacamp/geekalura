/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
document.querySelector('.add-product__form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Capturar los valores del formulario
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('category').value,
        img: document.getElementById('img').value, // URL de la imagen
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
    };

    console.log('URL ingresada:', productData.img); // Depuración

    // Validar la URL
    if (!isValidURL(productData.img)) {
        alert('La URL de la imagen no es válida. Por favor, verifica.');
        return;
    }

    try {
        const API_URL = 'http://localhost:3001/products'; // Cambia según tu servidor
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            alert('¡Producto creado exitosamente!');
            document.querySelector('.add-product__form').reset();
        } else {
            const errorDetails = await response.json();
            throw new Error(`Error ${response.status}: ${errorDetails.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error al crear el producto:', error.message, error);
        alert(`Error al crear el producto: ${error.message}`);
    }
});

/**
 * Valida si una URL es válida (rutas relativas y URLs completas).
 * @param {string} url - La URL a validar.
 * @returns {boolean} - `true` si es válida, `false` en caso contrario.
 */
function isValidURL(url) {
    const urlPattern = /^(https?:\/\/|\.\/|\/)[a-zA-Z0-9\-_./]+$/;
    return urlPattern.test(url);
}
