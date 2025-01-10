/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-product-form');
    
    // Función para obtener los valores del formulario y enviarlos a la API
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
        // Obtener los valores de los campos del formulario
        const productName = document.getElementById('product-name').value;
        const category = document.getElementById('category').value;
        const imgUrl = document.getElementById('img').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        // Validar que todos los campos estén completos
        if (!productName || !category || !imgUrl || !price || !description) {
            alert('Por favor, complete todos los campos antes de enviar el formulario.');
            return;
        }

        // Crear un objeto con los datos del producto
        const productData = {
            name: productName,
            category: category,
            url: imgUrl,
            price: price,
            description: description
        };

        try {
            // Aquí hacemos la petición PUT a la API para actualizar el producto
            const productId = new URLSearchParams(window.location.search).get('id');
            if (!productId) {
                alert('No se encontró el ID del producto en la URL.');
                return;
            }

            const response = await fetch(`http://localhost:3001/products/${productId}`, {
                method: 'PUT', // Método PUT para actualizar el producto
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert('Producto actualizado correctamente en la base de datos.');
                window.location.href = './admin.html'; // Redirige a la página de administración
            } else {
                alert('Hubo un error al intentar actualizar el producto. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Error en la conexión con el servidor. Por favor, intente más tarde.');
        }
    });
});
