const express = require("express");
const fs = require("fs");
const app = express();

// Make resources directory publicly available
app.use('/resources', express.static(__dirname + '\\resources'));

// Return an html file
app.get("/", (request, response) => {
    const fileName = "index.html";
    fs.readFile(fileName, (error, data) => {
        response.send(data.toString());
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});