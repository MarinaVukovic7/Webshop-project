'use strict';

const dom = {
  domMapping() {
    elements.productsContainer = document.querySelector('#productsContainer');
    elements.cartContainer = document.querySelector('#cartContainer');
    elements.itemsContainer = document.querySelector('#itemsContainer');
    elements.totalContainer = document.querySelector('#totalContainer');
    elements.numberOfItems = document.querySelector('#numberOfItems');
    elements.totalBeforeTax = document.querySelector('#totalBeforeTax');
    elements.orderTotal = document.querySelector('#orderTotal');
    elements.searchElement = document.querySelector('#searchProduct');
  }
}