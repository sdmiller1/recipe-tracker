-- Drop all tables before creating them
drop table if exists Ingredients;
drop table if exists Recipes;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-06-22 21:21:03.886

-- tables
-- Table: Ingredients
CREATE TABLE Ingredients (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    quantity varchar(255) NOT NULL,
    recipes_id int NOT NULL,
    CONSTRAINT Ingredients_pk PRIMARY KEY (id)
);

-- Table: Recipes
CREATE TABLE Recipes (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    instructions text NOT NULL,
    rating int NOT NULL,
    image varchar(255) NOT NULL,
    CONSTRAINT Recipes_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Ingredients_Recipes (table: Ingredients)
ALTER TABLE Ingredients ADD CONSTRAINT Ingredients_Recipes FOREIGN KEY Ingredients_Recipes (recipes_id)
    REFERENCES Recipes (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- End of file.


-- Insert sample data
insert into Recipes values (default, 'Pizza', 'This is a good pizza', 'put pizza in the oven, when it is done eat it', 5, 'pizza.jpg');
insert into Recipes values (default, 'Noodles', 'These are noodles', 'Boil water then put noodles in water', 4, 'pizza.jpg');
insert into Recipes values (default, 'Cake', 'This is the best desert', 'Mix ingredients then put in oven', 5, 'pizza.jpg');

insert into Ingredients values (default, 'Flour', '2 Cups', 1);
insert into Ingredients values (default, 'Water', '2 Cups', 1);
insert into Ingredients values (default, 'Tomato Sauce', '2 Cups', 1);
insert into Ingredients values (default, 'Cheese', '2 Cups', 1);

insert into Ingredients values (default, 'Noodles', '2 Cups', 2);
insert into Ingredients values (default, 'Water', '2 Cups', 2);

insert into Ingredients values (default, 'Flour', '2 Cups', 3);