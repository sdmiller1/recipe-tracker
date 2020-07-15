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

    deleteRecipeById(id, callback) {
        let connection = this.getConnection();

        let sql = "delete from recipes where id = ?";

        connection.query(sql, [id], (err, result, fields) => {
            if (err) throw err;
            callback(result);
        });
    }

    addNewRecipe(recipe, callback) {
        let connection = this.getConnection();

        // Data shape for incoming recipes
        // recipe = {
        //     title: "Cookies"
        //     , description: "Delicious home baked chocolate chip cookies."
        //     , ingredients: [
        //         "Flour"
        //         , "Eggs"
        //         , "Vanilla"
        //         , "Chocolate Chips"
        //     ]
        //     , instructions: "Combine ingredients in bowl. place tablespoon sized dough balls on cookie sheet and bake for 10 min."
        //     , image: "pizza.jpg"
        // }

        let sql = "insert into recipes values (default, ?, ?, ?, 0, ?)";

        connection.query(sql, [recipe.title, recipe.description, recipe.instructions, recipe.image], (err, result, fields) => {
            if (err) throw err;

            this.addNewRecipeIngredients(result.insertId, recipe.ingredients, callback);
        });
    }

    addNewRecipeIngredients(id, ingredients, callback) {
        let connection = this.getConnection();
        
        let sql = "insert into ingredients values (default, ?, ?)";

        for (let ingredient of ingredients) {
            connection.query(sql, [ingredient, id], (err, result, fields) => {
                if (err) throw err;
                callback(result);
            });
        }

    }
}

module.exports = DatabaseManager;