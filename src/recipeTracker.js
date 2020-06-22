const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    const fileName = "index.html";
    fs.readFile(fileName, (error, data) => {
        response.write(data.toString());
        response.end();
    })
}).listen(3333);

console.log("Listening on port 3333");