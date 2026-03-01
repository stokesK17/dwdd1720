// Select elements
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const headerTitle = document.querySelector("header h1");

// Fetch JSON data
async function getStoreData() {
    try {
        const response = await fetch("data/products.json");
        const data = await response.json();

        buildHeader(data.storeName);
        buildNavigation(data.products);
        displayProduct(data.products[0]); // Show first product by default

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

// Build Header Title
function buildHeader(storeName) {
    headerTitle.textContent = storeName;
}

// Build Navigation Buttons
function buildNavigation(products) {

    const ul = document.createElement("ul");

    products.forEach(product => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.textContent = product.name;
        button.addEventListener("click", () => {

            document.querySelectorAll("nav button")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            displayProduct(product);
        });
        li.appendChild(button);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
}

// Display One Product
function displayProduct(product) {

    main.innerHTML = "";

    const section = document.createElement("section");
    section.classList.add("product-display");

    section.innerHTML = `
        <h2>${product.name}</h2>
        <p class="brand">${product.brand}</p>
        <p class="category">${product.category}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="rating">Rating: ⭐ ${product.rating}</p>
        <p class="stock ${product.inStock ? "in" : "out"}">
            ${product.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <div class="tags">
            ${product.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>
    `;

    main.appendChild(section);
}

// Initialize
getStoreData();