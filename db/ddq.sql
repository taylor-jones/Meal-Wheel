/* 
 * Meal Wheel DDQ
 * CS340
 * Andrew Soback
 * Taylor Jones
 */


-- USE cs340_jonest6;
-- USE cs340_sobacka;


/************************************************
 * CREATE TABLES
 ***********************************************/

/* The tables are dropped in the reverse order that they're created
   in order to avoid any issues with foreign key dependencies either
   while creating or deleting. */
DROP TABLE IF EXISTS user_significant_recipe; 
DROP TABLE IF EXISTS recipe_cuisine; 
DROP TABLE IF EXISTS recipe_ingredient; 
DROP TABLE IF EXISTS recipe; 
DROP TABLE IF EXISTS ingredient_dietary_restriction;
DROP TABLE IF EXISTS recipe_category;
DROP TABLE IF EXISTS recipe_significance_type;
DROP TABLE IF EXISTS unit_of_measure;
DROP TABLE IF EXISTS cuisine;
DROP TABLE IF EXISTS dietary_restriction;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS ingredient_category;
DROP TABLE IF EXISTS user;




--
-- Table structure for user
--

CREATE TABLE user (
  user_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name varchar(50) NOT NULL,
  user_email varchar(150) NOT NULL,
  user_password varchar(20) NOT NULL,
  UNIQUE KEY user_email (user_email)
) ENGINE=InnoDB;


--
-- Table structure for ingredient_category
--

CREATE TABLE ingredient_category (
  ingredient_category_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  ingredient_category_name varchar(100) NOT NULL,
  UNIQUE KEY ingredient_category_name (ingredient_category_name)
) ENGINE=InnoDB;


--
-- Table structure for ingredient
--

CREATE TABLE ingredient (
  ingredient_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  ingredient_name varchar(255) NOT NULL, -- was way too small
  ingredient_category_id int(11),
  FOREIGN KEY (ingredient_category_id) REFERENCES ingredient_category(ingredient_category_id) ON UPDATE CASCADE ON DELETE SET NULL, -- if we allow ingredient category to be null
  UNIQUE KEY ingredient_name (ingredient_name)
) ENGINE=InnoDB;


--
-- Table structure for dietary_restriction
--

CREATE TABLE dietary_restriction (
  dietary_restriction_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dietary_restriction_name varchar(35) NOT NULL,
  UNIQUE KEY dietary_restriction_name (dietary_restriction_name)
) ENGINE=InnoDB;


--
-- Table structure for cuisine
--

CREATE TABLE cuisine (
  cuisine_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cuisine_name varchar(35) NOT NULL,
  UNIQUE KEY cuisine_name (cuisine_name)
) ENGINE=InnoDB;


--
-- Table structure for unit_of_measure
--

CREATE TABLE unit_of_measure (
  unit_of_measure_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  unit_of_measure_name varchar(25) NOT NULL,
  unit_abbrev varchar(5) DEFAULT NULL,
  UNIQUE KEY unit_of_measure_name (unit_of_measure_name)
) ENGINE=InnoDB;


--
-- Table structure for recipe_significance_type
--

CREATE TABLE recipe_significance_type (
  recipe_significance_type_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  recipe_significance_type_name varchar(35) NOT NULL,
  UNIQUE KEY recipe_significance_type_name (recipe_significance_type_name)
) ENGINE=InnoDB;


--
-- Table structure for recipe category
--

CREATE TABLE recipe_category (
  recipe_category_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  recipe_category_name varchar(35) NOT NULL,
  UNIQUE KEY recipe_category_name (recipe_category_name)
) ENGINE=InnoDB;


--
-- Table structure for ingredient_dietary_restriction
--

CREATE TABLE ingredient_dietary_restriction (
  ingredient_id int(11) NOT NULL,
  dietary_restriction_id int(11) NOT NULL,
  PRIMARY KEY (ingredient_id, dietary_restriction_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (dietary_restriction_id) REFERENCES dietary_restriction(dietary_restriction_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for recipe
--

CREATE TABLE recipe (
  recipe_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  recipe_name varchar(100) NOT NULL,
  recipe_image blob,
  instructions text,
  user_id int(11),
  recipe_category_id int(11) NOT NULL,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (recipe_category_id) REFERENCES recipe_category(recipe_category_id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY recipe_name (recipe_name)
) ENGINE=InnoDB;


--
-- Table structure for recipe_ingredient
--

CREATE TABLE recipe_ingredient (
  recipe_id int(11) NOT NULL,
  ingredient_id int(11) NOT NULL,
  amount int NOT NULL DEFAULT 1, -- Default of 1?
  unit_of_measure_id int(11) NOT NULL, -- I think we should consider allowing this to be null
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (unit_of_measure_id) REFERENCES unit_of_measure(unit_of_measure_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for recipe_cuisine
--

CREATE TABLE recipe_cuisine (
  recipe_id int(11) NOT NULL,
  cuisine_id int(11) NOT NULL,
  PRIMARY KEY (recipe_id, cuisine_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (cuisine_id) REFERENCES cuisine(cuisine_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for user_significant_recipe
--

CREATE TABLE user_significant_recipe (
  user_id int(11) NOT NULL,
  recipe_id int(11) NOT NULL,
  recipe_significance_type_id int(11) NOT NULL,
  PRIMARY KEY (user_id, recipe_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (recipe_significance_type_id) REFERENCES recipe_significance_type(recipe_significance_type_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;




/************************************************
 * INSERTS 
 ***********************************************/

-- Cuisines
INSERT INTO
  cuisine (cuisine_name)
VALUES
  ('African'),
  ('Indian'),
  ('French'),
  ('American'),
  ('European'),
  ('Italian'),
  ('Jewish'),
  ('Mexican'),
  ('Latin American'),
  ('Tex-Mex'),
  ('Thai'),
  ('Vietnamese'),
  ('Spanish'),
  ('Greek'),
  ('Chinese'),
  ('Japanese'),
  ('Asian'),
  ('Morrocan'),
  ('Carribean');


-- Recipe Categories
INSERT INTO
  recipe_category (recipe_category_name)
VALUES
  ('Main Course'),
  ('Snack'),
  ('Beverage'),
  ('Dessert'),
  ('Side Dish');


-- Unit of measure
INSERT INTO
  unit_of_measure (unit_of_measure_name, unit_abbrev)
VALUES
  ('Cup', 'C'),
  ('TableSpoon', 'tbsp'),
  ('Teaspoon', 'tsp'),
  ('Ounce', 'oz'),
  ('Slice', 'Slice'),
  ('Pint', 'pt'),
  ('Quart', 'qt'),
  ('Milliliter', 'ml'),
  ('Pound', 'pound'),
  ('Gallon', 'gal'),
  ('Drop', 'drop'),
  ('Pinch', 'pinch'),
  ('Dash', 'dash');


-- Recipe Significance Type
INSERT INTO
  recipe_significance_type (recipe_significance_type_name)
VALUES
  ('Liked'),
  ('Disliked');
