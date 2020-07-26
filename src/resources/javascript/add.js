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

    let ingredientElement = document.createElement("div");
    let ingredientInput = document.createElement("input");

    ingredientElement.classList = "col-4 text-center mb-1";
    ingredientInput.classList = "form-control recipeIngredient";
    ingredientInput.type = "text";

    ingredientElement.appendChild(ingredientInput);
    ingredientsContainer.appendChild(ingredientElement);
}