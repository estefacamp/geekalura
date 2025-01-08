/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// Selección de los elementos
const searchButton = document.querySelector('.menu__search-icon');
const inputSearch = document.querySelector('.menu__search-input');

// Función para buscar productos en la API
function buscarProductos(searchTerm) {
    // Hacemos la solicitud a la API para obtener todos los productos
    fetch(`http://localhost:3001/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de la API');
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos de la API:", data);
            
            // Filtramos los productos que coinciden con el término de búsqueda
            const productosFiltrados = data.filter(producto => 
                producto.name && producto.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Mostramos los productos filtrados
            mostrarProductos(productosFiltrados); 
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            mostrarProductos([]);  // Mostrar mensaje si no se encuentra la API o hay error
        });
}

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
    const contenedor = document.querySelector('.all-products__stock');
    contenedor.innerHTML = '';  // Limpiar los productos previos

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
        productos.forEach(producto => {
            // Verificamos que las propiedades no estén indefinidas antes de mostrarlas
            const nombre = producto.name || 'Nombre no disponible';
            const categoria = producto.category || 'Categoría no disponible';
            const precio = producto.price ? parseFloat(producto.price).toFixed(2) : 'Precio no disponible';
            const detalle = producto.detalle || 'Detalle no disponible';
            const img = producto.url || './img/default-img.png'; // Usamos una imagen por defecto si no hay imagen

            const productoHTML = `
                <a class="category__product" href="#">
                    <img class="category__img" src="${img}" alt="${nombre}" onerror="imgErrorHTML(this)">
                    <div class="category__text">
                        <p class="category__category">${categoria}</p>
                        <h4 class="category__name">${nombre}</h4>
                        <p class="category__price">$ ${precio}</p>
                        <p class="category__detail">${detalle} <i class="fa-solid fa-arrow-right-to-bracket"></i></p>
                    </div>
                </a>
            `;
            contenedor.innerHTML += productoHTML;
        });
    }
}

// Función para manejar errores de imagen (si la imagen no existe)
function imgErrorHTML(image) {
    image.src = './img/default-img.png';
}

// Obtener el término de búsqueda desde la URL
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

// Si hay un término de búsqueda en la URL, ejecutamos la función de buscar productos
if (searchTerm) {
    buscarProductos(searchTerm);
}

// Evento de búsqueda al presionar el botón de búsqueda
searchButton.addEventListener('click', () => {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm) {
        window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// Evento para manejar presionar Enter en el campo de búsqueda
inputSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = inputSearch.value.trim();
        if (searchTerm) {
            window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});
