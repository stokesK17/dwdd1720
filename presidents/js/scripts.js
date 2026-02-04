for (let x = 0; x < presidents.length; x++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('p');
    name.textContent = presidents[x].name;

    const img = document.createElement('img');
    img.src = pathStart + presidents[x].photo;
    img.alt = presidents[x].name;

    const caption = document.createElement('figcaption');
    caption.innerHTML = `
    Served ${presidents[x].took_office} to ${presidents[x].left_office}<br>
    Lived from ${presidents[x].born} to ${presidents[x].died}<br>
    Party: ${presidents[x].party}
  `;

    const figure = document.createElement('figure');
    figure.appendChild(img);
    figure.appendChild(caption);

    card.appendChild(name);
    card.appendChild(figure);

    myTarget.appendChild(card);
}
