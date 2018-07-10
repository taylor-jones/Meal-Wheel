/* 
 * Meal Wheel DDQ
 * CS340
 * Andrew Soback
 * Taylor Jones
 */


-- USE cs340_jonest6;
-- USE cs340_sobacka;


/************************************************
 * TABLE CREATION
 ***********************************************/

/* The tables are dropped in the reverse order that they're created
   in order to avoid any issues with foreign key dependencies either
   while creating or deleting. */
DROP TABLE IF EXISTS `user_significant_recipe`; 
DROP TABLE IF EXISTS `recipe_cuisine`; 
DROP TABLE IF EXISTS `recipe_ingredient`; 
DROP TABLE IF EXISTS `recipe`; 
DROP TABLE IF EXISTS `ingredient_dietary_restriction`;
DROP TABLE IF EXISTS `recipe_category`;
DROP TABLE IF EXISTS `recipe_significance_type`;
DROP TABLE IF EXISTS `unit_of_measure`;
DROP TABLE IF EXISTS `cuisine`;
DROP TABLE IF EXISTS `dietary_restriction`;
DROP TABLE IF EXISTS `ingredient`;
DROP TABLE IF EXISTS `user`;




--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB;


--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient_name` varchar(35) NOT NULL,
  `ingredient_category_id` int(11) NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `ingredient_name` (`ingredient_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `dietary_restriction`
--

CREATE TABLE `dietary_restriction` (
  `dietary_restriction_id` int(11) NOT NULL AUTO_INCREMENT,
  `dietary_restriction_name` varchar(35) NOT NULL,
  PRIMARY KEY (`dietary_restriction_id`),
  UNIQUE KEY `dietary_restriction_name` (`dietary_restriction_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `cuisine`
--

CREATE TABLE `cuisine` (
  `cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
  `cuisine_name` varchar(35) NOT NULL,
  PRIMARY KEY (`cuisine_id`),
  UNIQUE KEY `cuisine_name` (`cuisine_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `unit_of_measure`
--

CREATE TABLE `unit_of_measure` (
  `unit_of_measure_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_of_measure_name` varchar(25) NOT NULL,
  `unit_abbrev` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`unit_of_measure_id`),
  UNIQUE KEY `unit_of_measure_name` (`unit_of_measure_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `recipe_significance_type`
--

CREATE TABLE `recipe_significance_type` (
  `recipe_significance_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_significance_type_name` varchar(35) NOT NULL,
  PRIMARY KEY (`recipe_significance_type_id`),
  UNIQUE KEY `recipe_significance_type_name` (`recipe_significance_type_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `recipe category`
--

CREATE TABLE `recipe_category` (
  `recipe_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_category_name` varchar(35) NOT NULL,
  PRIMARY KEY (`recipe_category_id`),
  UNIQUE KEY `recipe_category_name` (`recipe_category_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `ingredient_dietary_restriction`
--

CREATE TABLE `ingredient_dietary_restriction` (
  `ingredient_id` int(11) NOT NULL,
  `dietary_restriction_id` int(11) NOT NULL,
  PRIMARY KEY (`ingredient_id`, `dietary_restriction_id`),
  FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`ingredient_id`) ON DELETE CASCADE,
  FOREIGN KEY (`dietary_restriction_id`) REFERENCES `dietary_restriction`(`dietary_restriction_id`) ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `recipe_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_name` varchar(100) NOT NULL,
  `recipe_image` blob DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `main_ingredient_id` int(11) NOT NULL,
  `recipe_category_id` int(11) NOT NULL,
  `created_date` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipe_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`recipe_category_id`) REFERENCES recipe_category(recipe_category_id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY `recipe_name` (`recipe_name`)
) ENGINE=InnoDB;


--
-- Table structure for table `recipe_ingredient`
--

CREATE TABLE `recipe_ingredient` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `amount` int NOT NULL,
  `unit_of_measure_id` int(11) NOT NULL,
  PRIMARY KEY (`recipe_id`, `ingredient_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`ingredient_id`) ON DELETE CASCADE,
  FOREIGN KEY (`unit_of_measure_id`) REFERENCES unit_of_measure(unit_of_measure_id) ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for table `recipe_cuisine`
--

CREATE TABLE `recipe_cuisine` (
  `recipe_id` int(11) NOT NULL,
  `cuisine_id` int(11) NOT NULL,
  PRIMARY KEY (`recipe_id`, `cuisine_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`cuisine_id`) REFERENCES cuisine(cuisine_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;


--
-- Table structure for table `user_significant_recipe`
--

CREATE TABLE `user_significant_recipe` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_significance_type_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`recipe_significance_type_id`) REFERENCES recipe_significance_type(recipe_significance_type_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;




/************************************************
 * INSERTS 
 ***********************************************/

-- Cuisine Types
INSERT INTO `cuisine` (cuisine_name) VALUES ('African');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Indian');
INSERT INTO `cuisine` (cuisine_name) VALUES ('French');
INSERT INTO `cuisine` (cuisine_name) VALUES ('American');
INSERT INTO `cuisine` (cuisine_name) VALUES ('European');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Italian');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Jewish');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Mexican');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Latin American');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Tex-Mex');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Thai');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Vietnamese');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Spanish');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Greek');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Chinese');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Japanese');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Asian');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Morrocan');
INSERT INTO `cuisine` (cuisine_name) VALUES ('Carribean');


-- Recipe Categories
INSERT INTO `recipe_category` (recipe_category_name) VALUES ('Main Course');
INSERT INTO `recipe_category` (recipe_category_name) VALUES ('Snack');
INSERT INTO `recipe_category` (recipe_category_name) VALUES ('Beverage');
INSERT INTO `recipe_category` (recipe_category_name) VALUES ('Dessert');
INSERT INTO `recipe_category` (recipe_category_name) VALUES ('Side Dish');


-- Unit of measure
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Cup', 'C');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('TableSpoon', 'tbsp');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Teaspoon', 'tsp');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Ounce', 'oz');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Slice', 'Slice');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Pint', 'pt');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Quart', 'qt');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Milliliter', 'ml');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Pound', 'pound');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Gallon', 'gal');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Drop', 'drop');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Pinch', 'pinch');
INSERT INTO `unit_of_measure` (unit_of_measure_name, unit_abbrev) VALUES ('Dash', 'dash');


-- Recipe Significance Type
INSERT INTO `recipe_significance_type` (recipe_significance_type_name) VALUES ('Liked');
INSERT INTO `recipe_significance_type` (recipe_significance_type_name) VALUES ('Disliked');
