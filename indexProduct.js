/*
 * Copyright (c) 2024-2025 Your Company Name
 * All rights reserved.
 */

import { clientService } from './client-service.js';

const categoryNames = ['Juegos', 'Consolas', 'Amiibo'];

const renderProducts = async () => {
    try {
        const dataProducts = await clientService.readProducts();
        if (!dataProducts || dataProducts.length === 0) {
            console.warn("No se encontraron productos en la API.");
            return;
        }
        processCategories(dataProducts);
        console.log("Productos cargados correctamente.");
    } catch (error) {
        console.error("Error al obtener los productos de la API:", error);
    }
};

const processCategories = (dataProducts) => {
    const main = document.querySelector('main');
    if (!main) {
        console.error("No se encontró el elemento <main> en el DOM.");
        return;
    }

    categoryNames.forEach((category, index) => {
        try {
            processCategory(dataProducts, category, index, main);
        } catch (error) {
            console.error(`Error procesando la categoría "${category}":`, error);
        }
    });
};

const processCategory = (dataProducts, category, index, main) => {
    let section = main.children[index];

    if (!section) {
        console.warn(`No se encontró la sección para la categoría "${category}". Creándola dinámicamente.`);
        section = createCategorySection(category, main);
    }

    const categoryProducts = dataProducts.filter(product => product.category === category);
    if (categoryProducts.length === 0) {
        console.log(`"${category}" no tiene productos disponibles.`);
        return;
    }

    writeTitle(section, category);
    showProducts(categoryProducts, section);
};

const writeTitle = (section, categoryName) => {
    const title = section.querySelector('.category__name');
    if (!title) {
        console.warn(`No se encontró el título de la categoría "${categoryName}".`);
        return;
    }
    title.textContent = `Productos de ${categoryName}`;
};

const showProducts = (arrProducts, section) => {
    const categoryCarousel = section.querySelector('.category__carousel');
    if (!categoryCarousel) {
        console.warn('No se encontró el elemento .category__carousel dentro de la sección proporcionada.');
        console.warn('Sección:', section);
        return;
    }

    categoryCarousel.innerHTML = ''; // Limpiar contenido existente

    arrProducts.forEach(product => {
        try {
            const card = createCard(product);
            categoryCarousel.appendChild(card);
        } catch (error) {
            console.error('Error al crear o agregar un producto:', error);
        }
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
    const imageUrl = url || './img/default-img.png';

    return `<img class="category__img" src="${imageUrl}" alt="${category}" onerror="imgErrorHTML(this)" draggable="false">
            <div class="category__text">
                <p class="category__category">${category}</p>        
                <h4 class="category__name">${name}</h4> 
                <p class="category__price">$ ${price}</p>
                <p class="category__detail">Ver producto <i class="fa-solid fa-arrow-right-to-bracket"></i></p>
            </div>`;
};

const createCategorySection = (category, main) => {
    const section = document.createElement('section');
    section.classList.add('category');
    section.innerHTML = `
        <h2 class="category__name">Cargando...</h2>
        <div class="category__carousel"></div>
    `;
    main.appendChild(section);
    console.log(`Se creó dinámicamente la sección para la categoría "${category}".`);
    return section;
};

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});

function imgErrorHTML(image) {
    image.onerror = "";
    image.src = './img/default-img.png'; 
    return true;
}
