const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const DatabaseManager = require("./DatabaseManager.js");
// TODO: i dont think this line is needed/ i didnt add it
const { response } = require("express");

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
        response.json(data);
    });
});

// Add New Recipe
app.post("/api/recipes/", (request, response) => {
    // TODO: Verify that datashape is correct before insert
    let recipe = request.body;

    database.addNewRecipe(recipe, data => {
        // response.json(data);
        // console.log(data);
    });

    // TODO: this response should not be sent unless insert was successful
    response.json("???");
});


app.listen(3000, () => {
    console.log("listening on port 3000");
});