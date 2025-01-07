/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */


import { clientService } from "./client-service.js";

/*const url = new URL(window.location);
const id = url.searchParams.get('id')
const form = document.querySelector('.add-product__form');

const getProduct = async (id) => {
    try {
        const arrProduct = await clientService.readProduct(id);
        createCard(arrProduct)
    } catch (error) {
        console.log(error)
    }
}

const createCard = ({name, category, url, price, description}) => {
    const inputName = document.querySelector('#product-name');
    const inputcategory = document.querySelector('#category');
    const inputUrl = document.querySelector('#img');
    const inputPrice = document.querySelector('#price');
    const inputDescription = document.querySelector('#description');
    inputUrl.value = url;
    inputcategory.value = category;
    inputName.value = name;
    inputPrice.value = price;
    inputDescription.value = description;

    if (inputName) inputName.value = name;
    if (inputCategory) inputCategory.value = category;
    if (inputUrl) inputUrl.value = url;
    if (inputPrice) inputPrice.value = price;
    if (inputDescription) inputDescription.value = description;
    
};
    
 

const editProduct = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#product-name').value;
    const category = document.querySelector('#category').value;
    const url = document.querySelector('#img').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;
    const jsonProduct = JSON.stringify({name, category, url, price, description});
    try {
        await clientService.updateProduct(id, jsonProduct);
        window.location.href = './completed.html'
    } catch (error) {
        console.log(error)
    }
}

getProduct(id);
form.addEventListener('submit', editProduct);*/

const getProduct = async (id) => {
    try {
        // Obtiene el producto mediante la API
        const arrProduct = await clientService.readProduct(id);
        createCard(arrProduct);
    } catch (error) {
        console.log(error);
    }
};

const createCard = ({ name, category, url, price, description }) => {
    const inputName = document.querySelector('#product-name');
    const inputCategory = document.querySelector('#category');
    const inputUrl = document.querySelector('#img');
    const inputPrice = document.querySelector('#price');
    const inputDescription = document.querySelector('#description');
    const productImage = document.querySelector('.product img');  // Aquí es donde asignamos la imagen

    // Asigna los valores a los campos
    inputUrl.value = url;
    inputCategory.value = category;
    inputName.value = name;
    inputPrice.value = price;
    inputDescription.value = description;

    if (inputName) inputName.value = name;
    if (inputCategory) inputCategory.value = category;
    if (inputUrl) inputUrl.value = url;
    if (inputPrice) inputPrice.value = price;
    if (inputDescription) inputDescription.value = description;

    // Asigna la imagen principal en el detalle
    if (productImage) {
        productImage.src = url;  // Aquí es donde se cambia la imagen
    }
};

getProduct(id);
