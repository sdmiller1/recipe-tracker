// JS used for adding a recipe

const addIngredient = () => {
    let ingredientsContainer = document.querySelector("#ingredientsContainer");

    ingredientsContainer.innerHTML += `
        <div class="col-4 text-center mb-1">
            <input type="text" class="form-control recipeIngredient">
        </div>
    `;
}