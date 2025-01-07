/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// Función para mostrar los productos en el DOM
const showProducts = (products) => {
    // Seleccionamos el contenedor donde vamos a mostrar los productos
    const productContainer = document.querySelector('.product-container');
    
    // Verificamos si el contenedor existe
    if (!productContainer) {
        console.error('No se encontró el contenedor de productos');
        return;  // Detenemos la ejecución si no encontramos el contenedor
    }

    // Asegúrate de que la lista de productos no esté vacía
    if (!products || products.length === 0) {
        console.error('No se encontraron productos');
        return;
    }

    // Limpiamos el contenedor antes de agregar nuevos productos
    productContainer.innerHTML = '';

    // Recorrer los productos y agregar sus tarjetas al DOM
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Crear los elementos de la tarjeta del producto
        const categoryTag = document.createElement('div');
        categoryTag.classList.add('product__category');
        categoryTag.textContent = `Categoría: ${product.category || 'Sin categoría'}`;
        
        const nameTag = document.createElement('div');
        nameTag.classList.add('product__name');
        nameTag.textContent = product.name || 'Nombre no disponible';

        const priceTag = document.createElement('div');
        priceTag.classList.add('product__price');
        priceTag.textContent = `$ ${product.price || 'Precio no disponible'}`;

        const descriptionTag = document.createElement('div');
        descriptionTag.classList.add('product__description');
        descriptionTag.textContent = product.description || 'Descripción no disponible';

        // Insertar los elementos en la tarjeta del producto
        productCard.appendChild(categoryTag);
        productCard.appendChild(nameTag);
        productCard.appendChild(priceTag);
        productCard.appendChild(descriptionTag);

        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
};

// Función para obtener los productos desde la API
const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:3001/products'); // URL correcta de la API
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products = await response.json();  // Verifica la respuesta
        console.log(products);  // Verifica los productos en la consola
        showProducts(products);  // Muestra los productos en el DOM
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

// Llamada para obtener los productos cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
    getProducts(); // Llama a la función para obtener los productos
});

// Función para obtener los detalles del producto desde la URL
const getProductDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            // Aquí puedes obtener los detalles del producto de tu base de datos o API
            const productData = await clientService.readProduct(productId); // Si ya tienes este método
            console.log("Respuesta de la API:", productData);  // Asegúrate de que los datos sean correctos
            
            if (productData) {
                createCard(productData);  // Usamos los datos para actualizar la UI
            } else {
                console.error('No se encontraron datos para el producto');
            }
        } else {
            console.error('No se encontró el ID del producto en la URL');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
    }
};

// Función para mostrar los detalles del producto en una tarjeta
const createCard = ({ name, category, url, price, description }) => {
    console.log({ name, category, url, price, description });  // Verificar los datos recibidos

    // Selección de los elementos del DOM
    const imgTag = document.querySelector('.product img');
    const categoryTag = document.querySelector('.product__category');
    const nameTag = document.querySelector('.product__name');
    const priceTag = document.querySelector('.product__price');
    const descriptionTag = document.querySelector('.product__description');

    // Verifica si los elementos están correctamente obtenidos antes de asignarles valores
    if (imgTag) {
        if (url && url !== '') {
            imgTag.src = url;  // Usar la URL que viene de la API
        } else {
            imgTag.src = 'https://via.placeholder.com/150'; // Imagen de prueba si no hay URL
        }
        imgTag.onerror = function () {
            imgErrorHTML(imgTag);  // Llama a la función si la imagen falla al cargar
        };
    } else {
        console.error('No se encontró el elemento de la imagen');
    }

    // Asignar valores a los demás elementos
    if (categoryTag) categoryTag.textContent = `Categoría: ${category || 'Sin categoría'}`;
    if (nameTag) nameTag.textContent = name || 'Nombre no disponible';
    if (priceTag) priceTag.textContent = price ? `$ ${price}` : 'Precio no disponible';
    if (descriptionTag) descriptionTag.textContent = description || 'Descripción no disponible';
};

// Función para manejar errores de carga de imágenes
function imgErrorHTML(image) {
    image.onerror = null;  // Para evitar bucles infinitos
    image.src = './img/default-img.png';  // Imagen por defecto si no se carga
    console.error('Error al cargar la imagen, se usará una imagen predeterminada');
}

// Definición del servicio para obtener datos de productos desde una API (Ejemplo)
const clientService = {
    async readProduct(id) {
        try {
            const response = await fetch(`http://localhost:3001/products/${id}`); // URL correcta de la API
            console.log("Respuesta de la API:", response);  // Verifica la respuesta completa
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

// Llamada para obtener los detalles del producto cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
    getProductDetails(); // Llama a la función para obtener los detalles del producto
});
