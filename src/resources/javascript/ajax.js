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

// Search For Recipe