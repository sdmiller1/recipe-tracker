const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const DatabaseManager = require("./DatabaseManager.js");
// TODO: i dont think this line is needed/ i didnt add it
// const { response, request } = require("express");

const database = new DatabaseManager();

const app = express();

// Make resources directory publicly available
app.use('/resources', express.static(__dirname + '\\resources'));

app.use(express.json());
app.use(bodyParser.json());

// -------------------
//   HTML Requests
// -------------------

// Home Page
app.get("/", (request, response) => {
    const fileName = "html/index.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

// Search Page
app.get("/search", (request, response) => {
    const fileName = "html/search.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

// View Recipe Page
app.get("/view/:id", (request, response) => {
    const fileName = "html/view.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

// Edit Recipe Page
app.get("/edit/:id", (request, response) => {
    const fileName = "html/edit.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

// Add Recipe Page
app.get("/add", (request, response) => {
    const fileName = "html/add.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

// -------------------
//    API Requests
// -------------------

// Get All Recipes
app.get("/api/recipes", (request, response) => {
    database.getAllRecipes(data => {
        response.json(data);
    });
});

// Get recipe by ID
app.get("/api/recipes/:id", (request, response) => {
    let id = parseInt(request.params.id);

    database.getRecipeById(id, recipe => {
        database.getIngredientsByRecipeId(id, ingredients => {
            if (typeof(recipe) !== 'undefined' && typeof(ingredients) !== 'undefined') {
                recipe['ingredients'] = ingredients;
                response.json(recipe);
            }
        });
    });
});

// Get recipe by Search
app.get("/api/recipes/search/:search", (request, response) => {
    let search = request.params.search;

    database.getRecipesBySearch(search, data => {
        response.json(data);
    });
});

// Delete Recipe By ID
app.delete("/api/recipes", (request, response) => {
    let id = request.body.id;

    database.deleteRecipeById(id, data => {
        if (data["affectedRows"] == 1) {
            response.json({recipeID: id, status: "Success"});
        } else {
            response.json({recipeID: id, status: "Error"});
        }
    });
});

// Add New Recipe
app.post("/api/recipes/", (request, response) => {
    let recipe = {
        title: request.body.title
        , description: request.body.description
        , ingredients: request.body.ingredients
        , instructions: request.body.instructions
        , image: request.body.image
    };

    database.addNewRecipe(recipe, data => {
        let id = data["insertId"];

        if (data["affectedRows"] == 1) {
            response.json({recipeID: id, status: "Success"});
        } else {
            response.json({recipeID: id, status: "Error"});
        }
    });
});

// Rate Recipes
app.post("/api/recipes/rate/", (request, response) => {
    let id = request.body.id;
    let rating = request.body.rating;

    database.updateRecipeRating(id, rating, data => {
        if (data["affectedRows"] == 1) {
            response.json({recipeID: id, status: "Success"});
        } else {
            response.json({recipeID: id, status: "Error"});
        }
    });
});

// Edit Recipes
app.post("/api/recipes/edit/", (request, response) => {
    let id = request.body.id;
    let recipe = {
            title: request.body.title
            , description: request.body.description
            , ingredients: request.body.ingredients
            , instructions: request.body.instructions
        }

    database.updateRecipe(id, recipe, data => {
        if (data["affectedRows"] == 1) {
            response.json({recipeID: id, status: "Success"});
        } else {
            response.json({recipeID: id, status: "Error"});
        }
    });
});


app.listen(3000, () => {
    console.log("listening on port 3000");
});