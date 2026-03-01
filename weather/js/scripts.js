const parentTag = document.querySelector('#weatherCard');
const townTag = document.querySelector('#town');
const modalBox = document.querySelector('aside');
const settingsBtn = document.querySelector('#settings');
const applyZipBtn = document.querySelector('#applyZip');
const zipInput = document.querySelector('#newZip');

let zip = localStorage.getItem('myZipCode');

if (!zip) {
    zip = "84058";
    localStorage.setItem('myZipCode', zip);
}

const myKey = "996dd7ab627bb9b7152db90c898c6f93";
const myPath = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${myKey}&units=imperial`;

fetch(myPath)
    .then(response => response.json())
    .then(data => {
        currentWeather(data);
    })
    .catch(error => {
        console.error("Error fetching weather:", error);
    });

function currentWeather(weatherResults) {

    parentTag.innerHTML = "";

    townTag.textContent = `Weather in ${weatherResults.name}`;

    const dateElement = document.createElement('p');
    dateElement.className = "date";
    dateElement.textContent = new Date().toDateString();
    parentTag.appendChild(dateElement);

    const iconElement = document.createElement('img');
    iconElement.src = `https://openweathermap.org/img/wn/${weatherResults.weather[0].icon}@2x.png`;
    iconElement.alt = weatherResults.weather[0].description;
    parentTag.appendChild(iconElement);

    const tempElement = document.createElement('p');
    tempElement.className = "temperature";
    tempElement.innerHTML = `${weatherResults.main.temp}&deg;F`;
    parentTag.appendChild(tempElement);
}

settingsBtn.addEventListener('click', () => {
    modalBox.classList.toggle('show');
});

applyZipBtn.addEventListener('click', () => {

    const newZip = zipInput.value.trim();

    if (newZip.length === 5) {
        localStorage.setItem('myZipCode', newZip);
        window.location.reload();
    }
});

zipInput.addEventListener('input', () => {
    zipInput.value = zipInput.value.slice(0, 5);
});