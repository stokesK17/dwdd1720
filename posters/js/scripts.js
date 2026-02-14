// ==========================
// scripts.js
// ==========================
import { films } from "./films.js";

const main = document.querySelector("main");
const gridView = document.querySelector("#gridView");
const listView = document.querySelector("#listView");

// ==========================
// Poster Image Map (LOCAL)
// ==========================
const posterImages = {
    1: "images/episode1.webp",
    2: "images/episode2.webp",
    3: "images/episode3.webp",
    4: "images/episode4.webp",
    5: "images/episode5.webp",
    6: "images/episode6.webp",
    7: "images/episode7.webp"
};

// ==========================
// Grid / List Toggle
// ==========================
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

// Initialize icons on load
updateIcons();

// ==========================
// Sort Films by Episode
// ==========================
const sortedFilms = films.sort((a, b) => a.episode_id - b.episode_id);

// ==========================
// Build Cards
// ==========================
function displayMovies() {
    sortedFilms.forEach(film => {
        const card = document.createElement("section");
        card.classList.add("card");

        const formattedDate = new Date(film.release_date)
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

        card.innerHTML = `
            <h2>Episode ${film.episode_id}: ${film.title}</h2>
            <img src="${posterImages[film.episode_id]}" alt="${film.title} Poster">
            <div class="card-info">
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Producer:</strong> ${film.producer}</p>
                <p><strong>Release Date:</strong> ${formattedDate}</p>
            </div>
        `;


        main.appendChild(card);
    });
}

displayMovies();