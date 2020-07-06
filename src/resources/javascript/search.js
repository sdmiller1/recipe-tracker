// JS to populate the page with search results

const displayRecipes = () => {

    let outputLocation = document.querySelector("#recipeDisplayLocation");

    let searchQuery = new URLSearchParams(window.location.search).get("q");

    getRecipesBySearch(searchQuery, recipes => {
        
        if (recipes.length == 0) {
            outputLocation.innerHTML = "<h2>No recipes found</h2>";
        }
    
        for (recipe of recipes) {
            let recipeItem = `
                    <div class="col-6 col-lg-3 my-2">
                        <div class="card h-100">
                            <img class="card-img-top" src="/resources/images/${recipe.image}" alt="${recipe.name}">
                            <div class="card-body">
                                <a href="/view/${recipe.id}" class="noLinkStyle stretched-link"><h2 class="card-title h4">${recipe.name}</h2></a>
                                <p class="card-text">${recipe.description}</p>
                            </div>
                        </div>
                    </div>`;
    
            outputLocation.innerHTML += recipeItem;
        }
    });

}

window.onload = displayRecipes;