'use strict';

const Total = {
  calculateNumberOfItems(items) {
    let numberOfItems = 0;
      if(items.length) {
        numberOfItems = items.length;
      }
      return numberOfItems;
  },

  calculateTotal(items) {
    let orderTotal = 0;
    for(let item of items) {
      item.price = Number(item.price);
      orderTotal += item.price;
    }
    return orderTotal.toFixed(2);
  },

  calculateTotalBeforeTax(items) {
    let totalBeforeTax = 0;
    const orderTotal = Total.calculateTotal(items);
    totalBeforeTax = (orderTotal - (orderTotal * 0.1)).toFixed(2);
    return totalBeforeTax;
  },

  fillTotal(itemsInCart) {
    const orderTotal = Total.calculateTotal(itemsInCart);
    const numberOfItems = Total.calculateNumberOfItems(itemsInCart);
    const totalBeforeTax = Total.calculateTotalBeforeTax(itemsInCart);
    elements.numberOfItems.innerHTML = `Number of items: ${numberOfItems}`;
    elements.totalBeforeTax.innerHTML = `Total price before tax: ${totalBeforeTax} €`;
    elements.orderTotal.innerHTML = `Order total: ${orderTotal} €`;
  },
}