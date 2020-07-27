// JS used for adding a recipe

const submitNewRecipe = () => {
    let recipe = {};
    let starterForm = document.createElement("form");
    starterForm.enctype = "multipart/form-data";
    let formData = new FormData(starterForm);

    recipe["title"] = document.querySelector("#recipeTitle").value;
    recipe["description"] = document.querySelector("#recipeDescription").value;
    recipe["instructions"] = document.querySelector("#recipeInstructions").value;
    recipe["image"] = document.querySelector("#recipeImage").files[0];
    recipe["ingredients"] = [];

    let ingredients = document.querySelectorAll(".recipeIngredient");
    ingredients.forEach(node => {recipe["ingredients"].push(node.value)})

    formData.append('title', recipe["title"]);
    formData.append('description', recipe["description"]);
    formData.append('instructions', recipe["instructions"]);
    formData.append('ingredients', recipe["ingredients"]);
    formData.append('image', recipe["image"]);

    console.log(recipe);
    addNewRecipe(formData);
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