'use strict';

const functions = {
  create(content = false, type = 'div', parent = false, className = false, id = false) {
    const element = document.createElement(type);
    if(content) element.innerHTML = content;
    if(className) element.className = className;
    if(parent) parent.append(element);
    if(id) element.id = id;
    return element;
  },

  fillFlowerContainer(element) {
    const flowerContainer = functions.create(false, 'div', elements.productsContainer, 'container');

    const imgContainer = functions.create(false, 'div', flowerContainer, 'imgContainer');

    const img = functions.create(false, 'img', imgContainer, 'img');
    img.src = `assets/data/${element.src}`;

    functions.create(element.title, 'p', flowerContainer, 'title', element.id);

    functions.create(element.description, 'p', flowerContainer, 'description');

    functions.create(`${element.price} €`, 'p', flowerContainer, 'price');

    const addButton = functions.create('Add to cart', 'button', flowerContainer, 'addButton');
    addButton.addEventListener('click', () => {
     functions.handleClick(element, flowerContainer);
    });
  },

  render(data) {
    for (const flower of data.flowers) {
      functions.fillFlowerContainer(flower);
    }
  },

  handleClick(flower, flowerContainer) {
    const itemsInCart = functions.outOfLocaleStorage(CART_ITEMS_LOCAL_STORAGE_KEY);
    const newItemsToStore = [];
    newItemsToStore.push(...itemsInCart);

    const foundItems = Array.isArray(itemsInCart) && itemsInCart.length > 0;
    if(foundItems) {
      const flowerSiblings = itemsInCart.filter((i) => i.id == flower.id).length;

      if(flowerSiblings < 10) {
      newItemsToStore.push(flower);
      functions.toLocalStorage(CART_ITEMS_LOCAL_STORAGE_KEY,
       newItemsToStore);

       functions.showItemAdded(flowerContainer);
      } else {
        functions.showMaxReached(flowerContainer);
      }
    } else {
      const storageArray = [];
      storageArray.push(flower);
      functions.toLocalStorage(CART_ITEMS_LOCAL_STORAGE_KEY,
      storageArray);

      functions.showItemAdded(flowerContainer);
    }
  },

  toLocalStorage(key, value) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },

  outOfLocaleStorage(key) {
    let loaded = localStorage.getItem(key);
    let value = loaded ? JSON.parse(loaded) : {};
    return value;
  },

  showItemAdded(flowerContainer) {
    const addedDiv = functions.create('Added ✔', 'div', flowerContainer, 'addedDiv');

    setTimeout(function() {
     addedDiv.remove();
    }, 500);
  },

  showMaxReached(flowerContainer) {
    const maxReachedDiv = functions.create('&#9888; Max items reached', 'div', flowerContainer, 'maxReachedDiv');

    setTimeout(function() {
      maxReachedDiv.remove();
     }, 1000);
  },

  appendSearch () {
    elements.searchElement.addEventListener('keyup', (event) => functions.searchProduct(event));
  },

  searchProduct(event) {
    let target = event.target.value;
    elements.searchElement.value.toLowerCase();
    elements.productsContainer.innerHTML = '';

    const productsToShow = data.loadedContents.flowers.filter(flower => flower.title.toLowerCase().includes(target));

    if(productsToShow.length > 0) {
      for(let product of productsToShow) {
        functions.fillFlowerContainer(product);
      }
    }
  },
};
