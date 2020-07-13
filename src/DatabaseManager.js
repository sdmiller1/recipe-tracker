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
            callback(result[0]);
        });
    }

    getRecipesBySearch(search, callback) {
        let connection = this.getConnection();

        search = `%${search}%`;

        let sql = "select * from recipes where name like ?";

        connection.query(sql, [search], (err, result, fields) => {
            if (err) throw err;
            callback(result);
        });
    }

    getIngredientsByRecipeId(id, callback) {
        let connection = this.getConnection();

        let sql = "select ingredients.ingredient from recipes inner join ingredients on recipes.id = ingredients.recipes_id where recipes.id = ?";

        connection.query(sql, [id], (err, result, fields) => {
            if (err) throw err;
            callback(result);
        });
    }
}

module.exports = DatabaseManager;