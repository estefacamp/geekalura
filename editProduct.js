/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
/*
 * editProduct.js - Manejo de edición de productos.
 */

// Obtiene el parámetro `id` de la URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("No se encontró un ID en la URL. Asegúrate de usar ?id= en la URL.");
        alert("No se encontró un ID de producto en la URL. Verifica el enlace.");
    } else {
        console.log("ID obtenido de la URL:", id);
    }

    return id;
}

// Carga los detalles del producto en el formulario
async function loadProductDetails(productId) {
    if (!productId) {
        console.error("No se encontró un ID en la URL.");
        alert("No se proporcionó un ID de producto en la URL.");
        return;
    }

    const productUrl = `http://localhost:3001/products/${productId}`;
    console.log(`Intentando cargar datos del producto desde: ${productUrl}`);

    try {
        const response = await fetch(productUrl);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const product = await response.json();
        console.log("Producto obtenido del servidor:", product);

        // Rellena los campos del formulario con los datos del producto
        document.getElementById("product-name").value = product.name || "";
        document.getElementById("category").value = product.category || "";
        document.getElementById("price").value = product.price || "";
        document.getElementById("description").value = product.description || "";
        document.getElementById("img").value = product.url || "";

        console.log("Formulario cargado con los datos del producto.");
    } catch (error) {
        console.error("Error al cargar los detalles del producto:", error);
        alert("Hubo un error al comunicarse con el servidor. Verifica la conexión.");
    }
}

// Envía los datos editados al servidor
async function updateProduct(productId) {
    if (!productId) {
        console.error("No se encontró un ID en la URL para actualizar.");
        alert("No se proporcionó un ID de producto en la URL para actualizar.");
        return;
    }

    const productUrl = `http://localhost:3001/products/${productId}`;
    const productData = {
        name: document.getElementById("product-name").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        url: document.getElementById("img").value,
    };

    console.log("Datos enviados al servidor para actualización:", productData);

    try {
        const response = await fetch(productUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            alert("Producto actualizado correctamente.");
            console.log("Producto actualizado en el servidor.");
            window.location.href = "./admin.html";
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("No se pudo actualizar el producto. Verifica el servidor.");
    }
}

// Maneja el evento de envío del formulario
document.getElementById("edit-product-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = getProductIdFromUrl();
    if (productId) {
        console.log("Enviando datos para el producto con ID:", productId);
        await updateProduct(productId);
    } else {
        alert("No se encontró el ID del producto en la URL.");
    }
});

// Inicializa la página cargando el producto para edición
document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromUrl();
    if (productId) {
        loadProductDetails(productId);
    } else {
        alert("No se encontró un ID de producto en la URL.");
    }
});
