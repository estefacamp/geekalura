/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
/*
 * Copyright (c) 2024 Your Company Name
 * All rights reserved.
 */
const searchButton = document.querySelector('.menu__search-icon');
const inputSearch = document.querySelector('.menu__search-input');

const searchProduct = () => {
    if(inputSearch.value){
        window.location.href = search.html?search=${inputSearch.value};
    }
}

searchButton.addEventListener('click', searchProduct);
inputSearch.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        searchProduct();
    }
});