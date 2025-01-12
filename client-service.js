/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

/*
 * Copyright (c) 2024 Your Company Name
 * All rights reserved.
 * Conexion con la API
 */

const createProduct = async (jsonProduct) => {
    try {
        const response = await fetch('http://localhost:3001/products', {  // Aquí debes poner el segundo argumento dentro de fetch
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonProduct
        });
        return response.json();  // Correcto: llamamos a response.json()
    } catch (error) {
        console.log('Error al crear producto:', error);
    }
}


const readProducts = () => fetch('http://localhost:3001/products').then(response => response.json());

const readProduct = (id) => fetch(`http://localhost:3001/products/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        return response.json();  // Correcto: llamamos a response.json()
    })
    .catch(error => {
        console.error('Error al obtener el producto:', error);
        // Puedes lanzar el error o manejarlo en la UI
        alert('No se pudo obtener los detalles del producto.');
    });

const deleteProduct = (id) => {
    return fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE'
    });
};

const updateProduct = (id, jsonProduct) => {
    return fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonProduct
    })
    .then(response => response.json())  // Correcto: llamamos a response.json()
    .catch(error => console.log('Error al actualizar el producto:', error));
}


export const clientService = {
    createProduct,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct,
};
const getProductDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            const productData = await clientService.readProduct(productId);
            if (productData) {
                createCard(productData);  // Actualiza la UI con los datos del producto
            } else {
                console.error('Producto no encontrado');
                // Aquí puedes mostrar un mensaje en la UI si el producto no se encuentra
                alert('No se pudo encontrar el producto.');
            }
        } else {
            console.error('No se proporcionó el ID del producto');
            // Aquí también puedes manejar el caso de no recibir un ID en la URL
            alert('ID de producto no proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        // Maneja el error visualmente si es necesario
        alert('Hubo un error al cargar los detalles del producto.');
    }
};



