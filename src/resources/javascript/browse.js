// JS to populate the page with recipes to browse through

const displayRecipes = () => {

    let outputLocation = document.querySelector("#recipeDisplayLocation");

    getAllRecipes(recipes => {
    
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