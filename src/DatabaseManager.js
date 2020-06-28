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

    getAllRecipes(callback) {
        let connection = this.getConnection();

        let sql = "select * from recipes";

        connection.query(sql, (err, result, fields) => {
            if (err) throw err;
            callback(result);
            // console.log(result);
            // console.log(fields);
        });
    }

    getRecipeById(id, callback) {
        let connection = this.getConnection();

        let sql = "select * from recipes where id = ?";

        connection.query(sql, [id], (err, result, fields) => {
            if (err) throw err;
            callback(result);
            // console.log(result);
            // console.log(fields);
        });
    }
}

module.exports = DatabaseManager;