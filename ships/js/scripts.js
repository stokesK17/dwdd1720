const myNavigaton = document.querySelector('nav');
const myViewer = document.querySelector('main');

// Fetch the data
fetch("../data/starships.json")
    .then((response) => response.json())
    .then((shipArray) => {
        console.log(shipArray);
        populateNav(shipArray); // <-- Call populateNav here
    })
    .catch(err => console.error("Failed to load ships:", err));

// Populate nav bar
function populateNav(allShips) {
    allShips.forEach(ship => {
        let myButton = document.createElement('button');
        myButton.textContent = ship.name;
        myButton.addEventListener('click', () => showShip(ship));
        myNavigaton.appendChild(myButton);
    });
}

// Ship viewer
function showShip(shipData) {
    let myFigure = document.createElement('figure');
    let myImage = document.createElement('img');
    let myCaption = document.createElement('figcaption');

    // Assign image source
    let urlArray = shipData.url.split('/');
    myImage.src = `https://resources.dgmuvu.com/ships/${urlArray[5]}.jpg`;
    myCaption.textContent = shipData.name;

    // Error handling for missing images
    myImage.addEventListener('error', () => {
        myImage.src = "https://resources.dgmuvu.com/ships/placeholder.jpg";
        myCaption.textContent = `The ${shipData.name} is not found`;
    });

    // Assemble figure
    myFigure.appendChild(myImage);
    myFigure.appendChild(myCaption);

    // Display in main viewer
    myViewer.textContent = '';
    myViewer.appendChild(myFigure);
}