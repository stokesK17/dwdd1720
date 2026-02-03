console.log("I am connected");

// helper function to add list items
const addLI = (listSelector, message) => {
    const theList = document.querySelector(listSelector);
    const listItem = document.createElement('li');
    listItem.textContent = message;
    theList.appendChild(listItem);
};

// calculate button click
document.querySelector('#calculate').addEventListener('click', () => {

    // clear previous results
    document.querySelector('#paint').innerHTML = '';
    document.querySelector('#carpet').innerHTML = '';

    // get input values
    const width = Number(document.querySelector('#width').value);
    const depth = Number(document.querySelector('#depth').value);
    const height = Number(document.querySelector('#height').value);

    const paintType = document.querySelector('#quality').selectedOptions[0].text;
    const quality = Number(document.querySelector('#quality').selectedOptions[0].value);

    console.log(width, depth, height, paintType, quality);

    // carpet calculations
    const carpet = Math.ceil((width * depth) / 9);
    const tackstrip = 2 * (width + depth);

    // paint calculations
    let walls = ((width * height) + (depth * height)) * 2;
    walls = Math.ceil(walls / quality);

    const ceiling = Math.ceil((width * depth) / quality);
    const primer = walls + ceiling;

    // console output
    console.log(`${carpet} yards of carpet`);
    console.log(`${tackstrip} feet of tackstrip`);
    console.log(`${walls} gallons of semigloss paint for the walls`);
    console.log(`${ceiling} gallons of flat paint for the ceiling`);
    console.log(`${primer} gallons of primer`);

    // paint list output
    addLI('#paint', `${walls} gallons of semi-gloss paint for the walls (${paintType})`);
    addLI('#paint', `${ceiling} gallons of flat paint for the ceiling`);
    addLI('#paint', `${primer} gallons of primer paint for walls and ceiling`);

    // carpet list output
    addLI('#carpet', `${carpet} yards of carpet`);
    addLI('#carpet', `${carpet} yards of padding`);
    addLI('#carpet', `${tackstrip} feet of tackstrip`);
});
