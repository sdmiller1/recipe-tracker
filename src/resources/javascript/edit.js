// JS used for editing a recipe

const displayRecipe = () => {

    let outputLocation = document.querySelector("#recipeContatiner");

    // TODO: this is currently really fragile
    let recipeId = parseInt(window.location.toString().split("/")[4]);

    getRecipeById(recipeId, recipe => {
        let ingredients = "";

        for (ingredient of recipe["ingredients"]) {
            ingredients += `
                <div class="col-4 text-center mb-1">
                    <input type="text" class="form-control recipeIngredient" value="${ingredient.ingredient}">
                </div>
            `;
        }

        let recipeSection = `
            <section class="row mt-3">
                <div class="col-lg-6 col-md-6 col-6">
                    <img src="/resources/images/${recipe.image}" alt="${recipe.name}" class="rounded-lg w-100">
                </div>
                <div class="col-lg-6 col-md-6 col-6">
                    <div class="form-group">
                        <label for="recipeTitle">Title:</label>
                        <input type="text" class="form-control form-control-lg" id="recipeTitle" value="${recipe.name}">
                    </div>
                    <div class="form-group">
                        <label for="recipeDescription">Description:</label>
                        <textarea class="form-control" id="recipeDescription" rows="3">${recipe.description}</textarea>
                    </div>
                </div>
            </section>
            <section class="row mt-3">
                <h3 class="col-12">
                    Ingredients:
                </h3>
                <div class="col-12 row" id="ingredientsContainer">
                    ${ingredients}
                </div>

                <div class="col-12 mb-1">
                    <button class="btn btn-secondary" onclick="addIngredient()">Add Another Ingredient</button>
                </div>
                <h3 class="col-12">
                    Recipe:
                </h3>
                <div class="form-group col-12">
                    <textarea class="form-control" id="recipeInstructions" rows="3">${recipe.instructions}</textarea>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" onclick="updateRecipe(${recipe.id})">Save Recipe</button>
                    <button class="btn btn-danger" onclick="deleteRecipe(${recipe.id})">Delete Recipe</button>
                </div>
            </section>
        `;

        outputLocation.innerHTML = recipeSection;
    });


}

const updateRecipe = (id) => {
    let recipe = {};

    recipe["id"] = id;
    recipe["title"] = document.querySelector("#recipeTitle").value;
    recipe["description"] = document.querySelector("#recipeDescription").value;
    recipe["instructions"] = document.querySelector("#recipeInstructions").value;
    recipe["ingredients"] = [];

    let ingredients = document.querySelectorAll(".recipeIngredient");
    ingredients.forEach(node => {recipe["ingredients"].push(node.value)})

    console.log(recipe);
    editRecipe(recipe);
}

const addIngredient = () => {
    let ingredientsContainer = document.querySelector("#ingredientsContainer");

    ingredientsContainer.innerHTML += `
        <div class="col-4 text-center mb-1">
            <input type="text" class="form-control recipeIngredient">
        </div>
    `;
}

window.onload = displayRecipe;