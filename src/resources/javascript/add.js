// JS used for adding a recipe

const submitNewRecipe = () => {
    let recipe = {};

    recipe["title"] = document.querySelector("#recipeTitle").value;
    recipe["description"] = document.querySelector("#recipeDescription").value;
    recipe["instructions"] = document.querySelector("#recipeInstructions").value;
    recipe["image"] = "pizza.jpg";
    recipe["ingredients"] = [];

    let ingredients = document.querySelectorAll(".recipeIngredient");
    ingredients.forEach(node => {recipe["ingredients"].push(node.value)})


    console.log(recipe);
    addNewRecipe(recipe);
}

const addIngredient = () => {
    let ingredientsContainer = document.querySelector("#ingredientsContainer");

    ingredientsContainer.innerHTML += `
        <div class="col-4 text-center mb-1">
            <input type="text" class="form-control recipeIngredient">
        </div>
    `;
}