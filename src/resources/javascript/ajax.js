const apiPath = "/api/recipes";

const getAllRecipes = (callback) => {
    let url = apiPath;
    let parameters = {
        "method": "get"
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            callback(result);
        });
}

const getRecipeById = (id, callback) => {
    let url = apiPath + "/" + id;
    let parameters = {
        "method": "get"
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            callback(result);
        });
}

const getRecipesBySearch = (query, callback) => {
    let url = apiPath + "/search/" + query;
    let parameters = {
        "method": "get"
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            callback(result);
        });
}

const deleteRecipe = (id) => {  
    let url = apiPath;
    let parameters = {
        "method": "delete"
        , headers: { "Content-Type": "application/json" }
        , "body": JSON.stringify({'id': id})
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            if (result["status"] == "Success") {
                window.location = "/";
            }
        });
}

const addNewRecipe = (recipeFormData) => {
    let url = apiPath;
    let parameters = {
        "method": "post"
        , "body": recipeFormData
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            if (result["status"] == "Success") {
                window.location = "/view/" + result["recipeID"];
            }
        });
}

const editRecipe = (recipe) => {
    let url = apiPath + "/edit/";
    let parameters = {
        "method": "post"
        , headers: { "Content-Type": "application/json" }
        , "body": JSON.stringify(recipe)
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            if (result["status"] == "Success") {
                window.location = "/view/" + result["recipeID"];
            }
        });
}

const submitRecipeRating = (recipeId, rating) => {
    let url = apiPath + "/rate/";
    let parameters = {
        "method": "post"
        , headers: { "Content-Type": "application/json" }
        , "body": JSON.stringify({"id": recipeId, "rating": rating})
    };

    fetch(url, parameters)
        .then(result => {
            return result.json();
        }).then(result => {
            
        });
}