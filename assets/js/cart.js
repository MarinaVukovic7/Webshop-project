'use strict';

const init = () => {
  dom.domMapping();
  const itemsInCart = functions.outOfLocaleStorage(CART_ITEMS_LOCAL_STORAGE_KEY);
  CartProducts.fillCart(itemsInCart);
  Total.fillTotal(itemsInCart);
}

init();
