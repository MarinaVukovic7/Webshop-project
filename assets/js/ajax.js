'use strict';

const dataPath = '/assets/data/data.json';
const xhr = new XMLHttpRequest;

const handleLoad = (event) => {
  let xhr = event.target;
  if(xhr.status == 200) {
    const contents = JSON.parse(xhr.response);
    data.loadedContents = contents;
    functions.render(contents);
  } else {
    console.warn(xhr.statusText, xhr.responseURL);
  } 
}

const loadData = () => {
  xhr.open('get', dataPath);
  xhr.addEventListener('load', handleLoad);
  xhr.send();
}

