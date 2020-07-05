const express = require("express");
const fs = require("fs");
const DatabaseManager = require("./DatabaseManager.js");
const { response } = require("express");

const database = new DatabaseManager();

const app = express();

// Make resources directory publicly available
app.use('/resources', express.static(__dirname + '\\resources'));

app.use(express.json());

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

// View Recipe Page
app.get("/view/:id", (request, response) => {
    const fileName = "html/view.html";
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

    database.getRecipeById(id, data => {
        response.json(data);
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});