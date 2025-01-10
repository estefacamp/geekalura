/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// URL de la API donde se obtienen los productos
const apiUrl = 'http://localhost:3001/products';

// Importa el servicio del cliente
import { clientService } from "./client-service.js"; 

const productsBox = document.querySelector('.all-products__stock');

// Función para cargar y mostrar los productos
const renderProducts = async () => {
    try {
        const dataProducts = await clientService.readProducts();
        showProducts(dataProducts);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

// Mostrar los productos en el DOM
const showProducts = (arrProducts) => {
    console.log('Productos a mostrar:', arrProducts);
    if (arrProducts.length > 0) {
        productsBox.innerHTML = ''; // Limpiar el contenedor de productos
        arrProducts.forEach(product => {
            const card = createCard(product);
            console.log('Tarjeta creada:', card);
            productsBox.appendChild(card); // Añadir la tarjeta al DOM
        });
    } else {
        console.warn('No hay productos para mostrar');
        productsBox.innerHTML = '<p>No hay productos disponibles.</p>';
    }
};

// Crear una tarjeta de producto
const createCard = (product) => {
    const card = document.createElement('div');
    card.classList.add('category__product');
    card.innerHTML = createContentCard(product);
    
    // Agregar el evento de eliminación
    const buttonDelete = card.querySelector('.category__product-delete');
    buttonDelete.addEventListener('click', deleteProduct);
    
    return card;
};

// Crear el contenido HTML para la tarjeta de producto
const createContentCard = ({id, name, category, url, price}) => {
    return `
        <img class="category__img" src="${url}" alt="${category}" onerror="imgErrorHTML(this)">
        <div class="category__text">        
            <p class="category__category">${category}</p>
            <h4 class="category__name">${name}</h4>
            <p class="category__price">$ ${price}</p>
            <div class="category__actions-box">
                <a class="category__product-edit" href="edit-product.html?id=${id}">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>
                <button id="${id}" class="category__product-delete">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `;
};

// Función para eliminar un producto
const deleteProduct = async (e) => {
    const id = e.currentTarget.id;
    const card = e.currentTarget.closest('.category__product'); // Encuentra la tarjeta a eliminar

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            card.remove();
            alert('Producto eliminado correctamente.');
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            alert('No se pudo eliminar el producto.');
        }
    } catch (error) {
        alert('Error al intentar eliminar el producto.');
        console.error('Error en la solicitud DELETE:', error);
    }
};

// Cargar los productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', renderProducts);
