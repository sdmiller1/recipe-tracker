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
            console.log(result);
            // TODO: this should indicate to the user that it was deleted
        });
}