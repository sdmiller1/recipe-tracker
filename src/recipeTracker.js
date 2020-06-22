const express = require("express");
const fs = require("fs");
const mysql = require('mysql');

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

let con = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "password",
    database: "recipes"
});

let sql = "select * from recipes";

con.connect(function(err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(fields);
      });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});