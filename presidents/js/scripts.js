import { presidents } from '../data/presidents.js';

const pathStart = "//www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/";
const myTarget = document.querySelector('#cards');

for (let x = 0; x < presidents.length; x++) {
  let barDiv = document.createElement('div');
  barDiv.classList.add('card');

  let name = document.createElement('p');
  name.textContent = presidents[x].name;

  let myFigure = document.createElement('figure');

  let myImage = document.createElement('img');
  myImage.src = pathStart + presidents[x].photo;
  myImage.alt = presidents[x].name;

  let myCaption = document.createElement('figcaption');
  myCaption.innerHTML = `
    Served: ${presidents[x].took_office} - ${presidents[x].left_office}<br>
    Lived: ${presidents[x].born} - ${presidents[x].died}<br>
    Party: ${presidents[x].party}
  `;

  myFigure.appendChild(myImage);
  myFigure.appendChild(myCaption);

  barDiv.appendChild(name);
  barDiv.appendChild(myFigure);

  myTarget.appendChild(barDiv);
}
