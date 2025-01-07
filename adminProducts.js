/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// URL de la API
const apiUrl = http:('http://localhost:3001/products');  // Ajusta la URL según tu API

// Función para obtener productos desde la API
function fetchProducts() {
    fetch('http://localhost:3001/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json(); // Convertimos la respuesta en formato JSON
        })
        .then(data => {
            console.log('Productos:', data);
            renderProducts(data); // Llamada a la función para renderizar productos
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            alert('Hubo un error al obtener los productos. Por favor, inténtelo nuevamente.');
        });
}

// Función para renderizar productos en el HTML
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar contenido previo de la lista de productos

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product'); // Añadir una clase para estilo si se necesita

        // Aquí puedes personalizar cómo mostrar los productos
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>Precio: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;

        productList.appendChild(productElement);
    });
}

// Función para manejar la edición de un producto
function editProduct(productId) {
    // Puedes abrir un formulario o realizar una solicitud PUT para editar el producto
    console.log('Editar producto con ID:', productId);
    // Lógica de edición aquí (ej. abrir un modal o página para editar)
}

// Función para manejar la eliminación de un producto
function deleteProduct(productId) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
        fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE', // Solicitud DELETE para eliminar el producto
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el producto');
                }
                console.log('Producto eliminado');
                alert('Producto eliminado con éxito.');
                fetchProducts(); // Refrescar la lista después de la eliminación
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                alert('Hubo un error al eliminar el producto.');
            });
    }
}

// Función para agregar un nuevo producto
function addProduct(productData) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // Datos del nuevo producto
    })
        .then(response => response.json())
        .then(data => {
            console.log('Nuevo producto agregado:', data);
            alert('Producto agregado con éxito.');
            fetchProducts(); // Refrescar la lista después de agregar un producto
        })
        .catch(error => {
            console.error('Error al agregar el producto:', error);
            alert('Hubo un error al agregar el producto.');
        });
}

// Función para manejar la creación de un nuevo producto a través de un formulario
function handleAddProductForm(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener datos del formulario
    const productData = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        description: document.getElementById('product-description').value,
    };

    // Llamar a la función para agregar el producto
    addProduct(productData);
}

// Event listener para el formulario de agregar producto
document.getElementById('add-product-form').addEventListener('submit', handleAddProductForm);

// Cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Llamar la función para obtener los productos
});
