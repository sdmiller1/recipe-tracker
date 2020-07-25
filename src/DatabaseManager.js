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

        let sql = "insert into recipes values (default, ?, ?, ?, 0, ?)";

        connection.query(sql, [recipe.title, recipe.description, recipe.instructions, recipe.image], (err, result, fields) => {
            if (err) throw err;
            callback(result);

            this.addNewRecipeIngredients(result.insertId, recipe.ingredients, data => {});
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

    updateRecipe(id, recipe, callback) {
        let title = recipe.title;
        let description = recipe.description;
        let instructions = recipe.instructions;

        let ingredients = recipe.ingredients;

        this.getIngredientsByRecipeId(id, data => {
            let existingIngredients = []
            data.map(x => {existingIngredients.push(x["ingredient"])});

            ingredients = ingredients.filter(x => !existingIngredients.includes(x));

            this.addNewRecipeIngredients(id, ingredients, data => {});
        });

        let connection = this.getConnection();

        let sql = "update recipes set name = ?, description = ?, instructions = ? where id = ?";

        connection.query(sql, [title, description, instructions, id], (err, result, fields) => {
            if (err) throw err;
            callback(result);
        });
    }

    updateRecipeRating(id, rating, callback) {
        let connection = this.getConnection();

        let sql = "update recipes set rating = ? where id = ?";

        connection.query(sql, [rating, id], (err, result, fields) => {
            if (err) throw err;
            callback(result);
        });
    }
}

module.exports = DatabaseManager;