import { presidents } from '../data/presidents.js';

const baseURL = 'https://resources.dgmuvu.com/presidents/';

const myTarget = document.querySelector('#cards');
const fragment = document.createDocumentFragment();

for (const president of presidents) {
  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('h3');
  name.textContent = president.name;

  const figure = document.createElement('figure');

  const image = document.createElement('img');
  image.src = baseURL + president.photo;
  image.alt = president.name;

  const caption = document.createElement('figcaption');
  caption.innerHTML = `
    Served: ${president.took_office} - ${president.left_office}<br>
    Lived: ${president.born} - ${president.died || 'Present'}<br>
    Party: ${president.party}
  `;

  figure.appendChild(image);
  figure.appendChild(caption);

  card.appendChild(name);
  card.appendChild(figure);

  fragment.appendChild(card);
}

myTarget.appendChild(fragment);