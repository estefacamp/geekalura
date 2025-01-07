/*
 * Copyright (c) 2024-2025 Your Company Name
 * All rights reserved.
 */

import { clientService } from './client-service.js';

const categoryNames = ['Juegos', 'Consolas', 'Amiibo'];

const renderProducts = async () => {
    try {
        const dataProducts = await clientService.readProducts();
        filterProducts(dataProducts);
    } catch (error) {
        console.log(error);
    }
};

const filterProducts = (dataProducts) => {
    categoryNames.forEach((category, index) => {
        const categoryProducts = dataProducts.filter(product => product.category === category);
        if (categoryProducts.length > 0) {
            const main = document.querySelector('main');
            const section = main.children[index];
            writeTitle(section, category);  // Esto actualizará el título de la categoría
            showProducts(categoryProducts, section);
        } else {
            console.log(`"${category}" has no products`);
        }
    });
};

const writeTitle = (section, categoryName) => {
    const title = section.querySelector('.category__title');
    if (title) {
        title.textContent = categoryName;  // Actualiza el texto del título
    } else {
        console.error('No se encontró el título de la categoría');
    }
};

const showProducts = (arrProducts, section) => {
    const categoryCarousel = section.querySelector('.category__carousel');
    categoryCarousel.innerHTML = '';
    arrProducts.forEach(product => {
        const card = createCard(product);
        categoryCarousel.appendChild(card);
    });
};

const createCard = (product) => {
    const card = document.createElement('a');
    card.classList.add('category__product');
    card.href = `detail-product.html?id=${product.id}`;
    card.innerHTML = createContentCard(product);
    card.setAttribute("draggable", "false");
    return card;
};

const createContentCard = (product) => {
    const { name, category, url, price } = product;
    console.log('Producto:', name, 'URL de la imagen:', url); 

    const imageUrl = url || './img/default-img.png';  
    return `<img class="category__img" src="${imageUrl}" alt="${category}" onerror="imgErrorHTML(this)" draggable="false">
            <div class="category__text">
                <p class="category__category">${category}</p>        
                <h4 class="category__name">${name}</h4> 
                <p class="category__price">$ ${price}</p>
                <p class="category__detail">Ver producto <i class="fa-solid fa-arrow-right-to-bracket"></i></p>
            </div>`;
};

const writeProductDetails = (data) => {
    const titleElement = document.querySelector(".product__name");
    const categoryElement = document.querySelector(".product__category");

    if (titleElement && categoryElement) {
        titleElement.textContent = data.name;
        categoryElement.textContent = `Categoría: ${data.category}`;
    } else {
        console.error("Error: No se encontraron los elementos .product__name o .product__category");
    }
};

renderProducts();

const getProductDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            const productData = await clientService.readProduct(productId);
            if (productData) {
                writeProductDetails(productData);  
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

document.addEventListener("DOMContentLoaded", () => {
    getProductDetails(); 
});

function imgErrorHTML(image) {
    image.onerror = "";
    image.src = './img/default-img.png';  
    return true;
}
