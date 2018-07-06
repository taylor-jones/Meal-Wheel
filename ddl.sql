/* Meal Wheel DDL 

  NOTE: This file definitely needs review.
*/



--
-- Table structure for table `unit_of_measure`
--

DROP TABLE IF EXISTS `unit_of_measure`;

CREATE TABLE `unit_of_measure` (
  `unit_of_measure_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_of_measure_name` varchar(25) NOT NULL,
  `unit_abbrev` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`unit_of_measure_id`),
  UNIQUE KEY `unit_of_measure_name` (`unit_of_measure_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `dietary_restriction`
--

DROP TABLE IF EXISTS `dietary_restriction`;

CREATE TABLE `dietary_restriction` (
  `dietary_restriction_id` int(11) NOT NULL AUTO_INCREMENT,
  `dietary_restriction_name` varchar(35) NOT NULL,
  PRIMARY KEY (`dietary_restriction_id`),
  UNIQUE KEY `dietary_restriction_name` (`dietary_restriction_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `ingredient_category`
--

DROP TABLE IF EXISTS `ingredient_category`;

CREATE TABLE `ingredient_category` (
  `ingredient_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient_category_name` varchar(35) NOT NULL,
  PRIMARY KEY (`ingredient_category_id`),
  UNIQUE KEY `ingredient_category_name` (`ingredient_category_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `recipe_significance_type`
--

DROP TABLE IF EXISTS `recipe_significance_type`;

CREATE TABLE `recipe_significance_type` (
  `recipe_significance_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_significance_type_name` varchar(35) NOT NULL,
  PRIMARY KEY (`recipe_significance_type_id`),
  UNIQUE KEY `recipe_significance_type_name` (`recipe_significance_type_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `cuisine`
--

DROP TABLE IF EXISTS `cuisine`;

CREATE TABLE `cuisine` (
  `cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
  `cuisine_name` varchar(35) NOT NULL,
  PRIMARY KEY (`cuisine_id`),
  UNIQUE KEY `cuisine_name` (`cuisine_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `dietary_restriction`
--

DROP TABLE IF EXISTS `recipe_category`;

CREATE TABLE `recipe_category` (
  `recipe_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_category_name` varchar(35) NOT NULL,
  PRIMARY KEY (`recipe_category_id`),
  UNIQUE KEY `recipe_category_name` (`recipe_category_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;

CREATE TABLE `ingredient` (
  `ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient_name` varchar(35) NOT NULL,
  `ingredient_category_id` int(11) NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `ingredient_name` (`ingredient_name`),
  FOREIGN KEY (`ingredient_category_id`) REFERENCES ingredient_category(ingredient_category_id) ON UPDATE CASCADE ON DELETE CASCADE,
) ENGINE=InnoDB;



--
-- Table structure for table `ingredient_dietary_restriction`
--

DROP TABLE IF EXISTS `ingredient_dietary_restriction`;

CREATE TABLE `ingredient_dietary_restriction` (
  `ingredient_id` int(11) NOT NULL,
  `dietary_restriction_id` int(11) NOT NULL,
  PRIMARY KEY (`ingredient_id`, `dietary_restriction_id`),
  FOREIGN KEY (`ingredient_id`) REFERENCES ingredient(ingredient_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`dietary_restriction_id`) REFERENCES dietary_restriction(dietary_restriction_id) ON UPDATE CASCADE ON DELETE CASCADE,
) ENGINE=InnoDB;



--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;

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
  FOREIGN KEY (`main_ingredient_id`) REFERENCES ??? ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY `recipe_category_id`) REFERENCES recipe_category(recipe_category_id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY `recipe_name` (`recipe_name`)
) ENGINE=InnoDB;



--
-- Table structure for table `recipe_ingredient`
--

DROP TABLE IF EXISTS `recipe_ingredient`;

CREATE TABLE `recipe_ingredient` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `amount` int NOT NULL,
  `unit_of_measure_id` int(11) NOT NULL,
  PRIMARY KEY (`recipe_id`, `ingredient_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`ingredient_id`) REFERENCES ingredient(ingredient_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`unit_of_measure_id`) REFERENCES unit_of_measure(unit_of_measure_id) ON UPDATE CASCADE ON DELETE CASCADE,
) ENGINE=InnoDB;



--
-- Table structure for table `recipe_cuisine`
--

DROP TABLE IF EXISTS `recipe_cuisine`;

CREATE TABLE `recipe_cuisine` (
  `recipe_id` int(11) NOT NULL,
  `cuisine_id` int(11) NOT NULL,
  PRIMARY KEY (`recipe_id`, `cuisine_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`cuisine_id`) REFERENCES cuisine(cuisine_id) ON UPDATE CASCADE ON DELETE CASCADE,
) ENGINE=InnoDB;



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(60),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB;



--
-- Table structure for table `user_significant_recipe`
--

DROP TABLE IF EXISTS `user_significant_recipe`;

CREATE TABLE `user_significant_recipe` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `recipe_significance_type_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`recipe_id`) REFERENCES recipe(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`recipe_significance_type_id`) REFERENCES recipe_significance_type(recipe_significance_type_id) ON UPDATE CASCADE ON DELETE CASCADE,
) ENGINE=InnoDB;

