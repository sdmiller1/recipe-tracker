const mysql = require('mysql');

class DatabaseManager {
    
    getConnection() {
        let connection = mysql.createConnection({
            host: "localhost",
            user: "developer",
            password: "password",
            database: "recipes"
        });

        return connection;
    }

    getAllRecipes() {
        let con = this.getConnection();

        let sql = "select * from recipes";

        con.connect(function(err) {
            if (err) throw err;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                // console.log(fields);
            });
        });
    }
}

module.exports = DatabaseManager;