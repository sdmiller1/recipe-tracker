// JS to populate the page with the requested recipe

const displayRecipe = () => {

    let outputLocation = document.querySelector("#recipeContatiner");

    // TODO: this is currently really fragile
    let recipeId = parseInt(window.location.toString().split("/")[4]);

    getRecipeById(recipeId, recipe => {
        let ingredients = "";

        for (ingredient of recipe["ingredients"]) {
            ingredients += `
                <div class="col-4 text-center mb-1">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input"> ${ingredient.ingredient}
                    </label>
                </div>
            `;
        }

        let recipeSection = `
            <section class="row mt-3">
                <div class="col-lg-6 col-md-6 col-6">
                    <img src="/resources/images/${recipe.image}" alt="${recipe.name}" class="rounded-lg w-100">
                </div>
                <div class="col-lg-6 col-md-6 col-6">
                    <h2>${recipe.name}</h2>
                    <!-- TODO: finish implementing the rating js -->
                    <div class="rating mt-2" data-recipe="${recipe.id}">
                        <i class="fa fa-star-o" onclick="rateRecipe(this)" data-rating="1"></i>
                        <i class="fa fa-star-o" onclick="rateRecipe(this)" data-rating="2"></i>
                        <i class="fa fa-star-o" onclick="rateRecipe(this)" data-rating="3"></i>
                        <i class="fa fa-star-o" onclick="rateRecipe(this)" data-rating="4"></i>
                        <i class="fa fa-star-o" onclick="rateRecipe(this)" data-rating="5"></i>
                    </div>
                    <p class="">
                        ${recipe.description}
                    </p>
                    <a href="/edit/${recipe.id}" class="btn btn-info" role="button">Edit Recipe</a>
                </div>
            </section>
            <section class="row mt-3">
                <h3 class="col-12">
                    Ingredients:
                </h3>
                ${ingredients}
                <h3 class="col-12">
                    Recipe:
                </h3>
                <p class="col-12">
                    ${recipe.instructions}
                </p>
            </section>
        `;

        outputLocation.innerHTML = recipeSection;
    });


}

const rateRecipe = (ratingButton) => {
    let rating = ratingButton.dataset.rating;
    let recipeId = ratingButton.parentNode.dataset.recipe;

    setRecipeRating(rating);

    submitRecipeRating(recipeId, rating);
}

const setRecipeRating = (rating) => {
    if (rating > 0) {
        let stars = Array.from(document.querySelectorAll(".rating i"));
        let fullStars = stars.filter(x => x.dataset.rating <= rating);
        let emptyStars = stars.filter(x => x.dataset.rating > rating)

        fullStars.map(x => x.classList = "fa fa-star text-warning");
        emptyStars.map(x => x.classList = "fa fa-star-o text-secondary");
    } else {
        let stars = Array.from(document.querySelectorAll(".rating i"));
        stars.map(x => x.classList = "fa fa-star-o");
    }
}

window.onload = displayRecipe;