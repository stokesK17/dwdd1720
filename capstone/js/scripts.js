window.onload = async () => {
    const container = document.querySelector('#recipeHere');
    const buttonContainer = document.querySelector('#buttonContainer');
    const searchInput = document.getElementById('recipeSearch');
    const headerTitle = document.querySelector('header h1');

    if (!container || !buttonContainer || !searchInput || !headerTitle) {
        console.error('Required elements not found!');
        return;
    }

    let recipes = [];

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    container.appendChild(cardContainer);

    try {
        const response = await fetch('recipes.json');
        if (!response.ok) throw new Error('Failed to load recipes.json');
        recipes = await response.json();
    } catch (err) {
        console.error('Error loading recipes:', err);
        container.textContent = 'Failed to load recipes.';
        return;
    }

    headerTitle.addEventListener('click', () => {
        const sorted = [...recipes].sort((a, b) => {
            const nameA = a.recipe_name ? a.recipe_name.toLowerCase() : '';
            const nameB = b.recipe_name ? b.recipe_name.toLowerCase() : '';
            return nameA.localeCompare(nameB);
        });
        cardContainer.innerHTML = '';
        sorted.forEach(recipe => cardContainer.appendChild(createRecipeCard(recipe)));
    });

    const categories = ["Breakfast", "Lunch", "Dinner", "Sides", "Meal Prep", "Dessert"];
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.addEventListener('click', () => filterRecipes(cat, searchInput.value.trim()));
        buttonContainer.appendChild(btn);
    });

    searchInput.addEventListener('input', () => filterRecipes('all', searchInput.value.trim()));

    function filterRecipes(category, query = '') {
        cardContainer.innerHTML = '';

        const filtered = recipes.filter(recipe => {
            if (!recipe.recipe_type) return false;

            if (category.toLowerCase() !== 'all' && recipe.recipe_type.toLowerCase() !== category.toLowerCase()) return false;

            if (!query) return true;
            query = query.toLowerCase();

            if (recipe.recipe_name?.toLowerCase().includes(query)) return true;

            if (recipe.ingredients) {
                if (Array.isArray(recipe.ingredients) && recipe.ingredients.some(i => i.toLowerCase().includes(query))) return true;
                if (typeof recipe.ingredients === 'string' && recipe.ingredients.toLowerCase().includes(query)) return true;
            }

            if (recipe.attributes) {
                if (Array.isArray(recipe.attributes) && recipe.attributes.some(a => a.toLowerCase().includes(query))) return true;
                if (typeof recipe.attributes === 'string' && recipe.attributes.toLowerCase().includes(query)) return true;
            }

            return false;
        });

        if (filtered.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No recipes found.';
            cardContainer.appendChild(msg);
            return;
        }

        filtered.forEach(recipe => cardContainer.appendChild(createRecipeCard(recipe)));
    }

    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        function createField(label, value) {
            if (!value) return null;
            const p = document.createElement('p');
            p.innerHTML = `<strong>${label}:</strong> ${value}`;
            return p;
        }

        const title = document.createElement('h2');
        title.textContent = recipe.recipe_name || "Unnamed Recipe";
        card.appendChild(title);

        [['Type', recipe.recipe_type], ['Makes', recipe.makes], ['Total Time', recipe.total_time]].forEach(([l, v]) => {
            const f = createField(l, v);
            if (f) card.appendChild(f);
        });

        let attrValue = null;
        if (Array.isArray(recipe.attributes) && recipe.attributes.length) attrValue = recipe.attributes.join(', ');
        else if (typeof recipe.attributes === 'string' && recipe.attributes.trim()) attrValue = recipe.attributes;
        const attrField = createField('Attributes', attrValue);
        if (attrField) card.appendChild(attrField);

        if (recipe.ingredients) {
            const ingTitle = document.createElement('h3');
            ingTitle.textContent = 'Ingredients';
            card.appendChild(ingTitle);

            const ingList = document.createElement('ul');
            if (Array.isArray(recipe.ingredients)) {
                recipe.ingredients.forEach(i => {
                    const li = document.createElement('li');
                    li.textContent = i;
                    ingList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = recipe.ingredients.toString();
                ingList.appendChild(li);
            }
            card.appendChild(ingList);
        }

        if (recipe.directions) {
            const dirTitle = document.createElement('h3');
            dirTitle.textContent = 'Directions';
            card.appendChild(dirTitle);

            const dirText = document.createElement('p');
            if (Array.isArray(recipe.directions)) dirText.innerHTML = recipe.directions.join('<br><br>');
            else dirText.textContent = recipe.directions.toString();
            card.appendChild(dirText);
        }

        return card;
    }

    filterRecipes('all');
};