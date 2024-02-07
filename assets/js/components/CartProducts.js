'use strict';

const CartProducts = {
  createItemsInCart(itemsInCart) {
    const allreadyAdded = [];
    for(let item of itemsInCart) {
      
      if(allreadyAdded.includes(item.id)) {
        continue;
      }

     const itemCounter = itemsInCart.filter((i) => i.id === item.id).length;

     const itemContainer = functions.create(false, 'div', elements.itemsContainer, 'itemContainer');
     if(item.src) {
      const itemImg = functions.create(false, 'img', itemContainer, 'itemImg');
      itemImg.src = `assets/data/${item.src}`;
    }
     if (item.title) {
      functions.create(item.title, 'p', itemContainer, 'item');
     }

     const quantityId = `quantity_${item.id}`;
     functions.create(`Quantity: ${itemCounter}`, 'div', itemContainer, false, quantityId);

     const selectElement = functions.create(false, 'select', itemContainer);
     CartProducts.fillSelectFields(selectElement, itemCounter);
     selectElement.addEventListener('change', (event) => {
      CartProducts.changeQuantity(event, item);
      }); 

     if(item.price) {
      const itemPrice = Number(item.price) * itemCounter;
      const priceId = `price_${item.id}`;
      functions.create(`${itemPrice} €`, 'p', itemContainer, 'item', priceId);
     }

     const removeButton = functions.create('Remove from cart', 'button', itemContainer, 'removeButton');
      removeButton.addEventListener('click', () => {
        if (confirm(`Do you really want to delete "${item.title}" from cart?`)) {
          CartProducts.removeItem(item);
          CartProducts.deleteItemFromDOM(itemContainer);
       }
      });

      allreadyAdded.push(item.id);
    }
  },

   createEmptyCart() {
    functions.create('Your cart is empty', 'p', elements.itemsContainer, 'emptyCart');
      const linkToShop = functions.create('View products', 'a', elements.itemsContainer, 'linkToShop');
      linkToShop.href = '../../index.html';
  },

   fillCart(itemsInCart) {
    if(itemsInCart.length > 0) {
      CartProducts.createItemsInCart(itemsInCart);
    } else {
      CartProducts.createEmptyCart();
    }
  },

   removeItem(item) {
    const storageItems = functions.outOfLocaleStorage(CART_ITEMS_LOCAL_STORAGE_KEY);
    const newItems = storageItems.filter((i) => i.id !== item.id);
    functions.toLocalStorage(CART_ITEMS_LOCAL_STORAGE_KEY, newItems);
    if(newItems.length === 0)
    CartProducts.createEmptyCart();

    Total.fillTotal(newItems);
  },

  deleteItemFromDOM(itemContainer) {
    itemContainer.remove();
  },

   fillSelectFields(selectElement, itemCounter) {
      for(let i = 1; i <= 10; i++) {
        const selectOption = functions.create(i, 'option', selectElement);
        selectOption.value = i;
      }
      selectElement.selectedIndex = itemCounter - 1;
  },

   calculateQuantity (itemsInCart, item) {
    let quantity = 0;
    
    if(itemsInCart.includes(item)) {
      quantity++;
    }
    return quantity;
  },

   changeQuantity(event, item) {
    let target = event.target.value;
    target = Number(target);
    const quantityElement = document.getElementById(`quantity_${item.id}`);
    quantityElement.innerHTML = `Quantity: ${target}`;
    const priceElement = document.getElementById(`price_${item.id}`);
    const price = Number(item.price) * target;
    priceElement.innerHTML = `${price} €`;
   
    const storageItems = functions.outOfLocaleStorage(CART_ITEMS_LOCAL_STORAGE_KEY);
    const newItems = storageItems.filter((i) => i.id !== item.id);
    for(let i = 0; i < target; i++) {
      newItems.push(item);
    }
    functions.toLocalStorage(CART_ITEMS_LOCAL_STORAGE_KEY, newItems);

    Total.fillTotal(newItems);
  },
};