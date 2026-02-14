import { films } from "./films.js";

const main = document.querySelector("main");
const gridView = document.querySelector("#gridView");
const listView = document.querySelector("#listView");

const posterImages = {};
for (let i = 1; i <= 7; i++) {
    posterImages[i] = `https://resources.dgmuvu.com/films/${i}.webp`;
}


function updateIcons() {
    if (main.classList.contains("grid")) {
        gridView.style.display = "none";
        listView.style.display = "block";
    } else {
        gridView.style.display = "block";
        listView.style.display = "none";
    }
}

gridView.addEventListener("click", () => {
    main.classList.remove("list");
    main.classList.add("grid");
    updateIcons();
});

listView.addEventListener("click", () => {
    main.classList.remove("grid");
    main.classList.add("list");
    updateIcons();
});

updateIcons();


const sortedFilms = films.sort((a, b) => a.episode_id - b.episode_id);


function displayMovies() {
    const fragment = document.createDocumentFragment();

    sortedFilms.forEach(film => {
        const card = document.createElement("section");
        card.classList.add("card");
        card.setAttribute("role", "region");
        card.setAttribute("aria-labelledby", `film-title-${film.episode_id}`);

        const formattedDate = new Date(film.release_date)
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

        card.innerHTML = `
            <h2 id="film-title-${film.episode_id}">Episode ${film.episode_id}: ${film.title}</h2>
            <img src="${posterImages[film.episode_id]}" alt="${film.title} Poster" loading="lazy">
            <div class="card-info">
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Producer:</strong> ${film.producer}</p>
                <p><strong>Release Date:</strong> ${formattedDate}</p>
            </div>
        `;

        fragment.appendChild(card);
    });

    main.appendChild(fragment);
}

displayMovies();