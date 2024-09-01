import { CreateCollagio } from '@collagio/core';
import { GridCollageLayout } from '@collagio/layouts-grid';

let counter = 0;

const collage = new CreateCollagio()
  .setSelector('#collage-container')
  .addCollageLayout('grid', GridCollageLayout)
  .build();
collage.setElements(generateElements(10));

function renderBaseCollage() {
  collage.updateLayout('default');
}

function renderGridCollage() {
  collage.updateLayout('grid');
}
function addElement() {
  counter++;
  const img = document.createElement('img');
  img.src = `https://placehold.co/600x400?text=Image+${counter}`; //https://picsum.photos/200/300
  img.alt = `Image ${counter}`;
  img.className = 'myImage';
  collage.addElement(img);
}

function generateElements(count: number) {
  const elements = [];
  for (let i = 1; i <= count; i++) {
    counter = i;
    const img = document.createElement('img');
    img.src = `https://placehold.co/600x400?text=Image+${i}`; //https://picsum.photos/200/300
    img.alt = `Image ${i}`;
    img.className = 'myImage';
    elements.push(img);
  }
  return elements;
}

// Attach the functions to the window object for use in the HTML
(window as any).renderBaseCollage = renderBaseCollage;
(window as any).renderGridCollage = renderGridCollage;
(window as any).addElement = addElement;
