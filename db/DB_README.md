# Database Outline, In Words

## Entities
Ingredient - ingredients are integral to the database, and they are used to make up the recipes. Ingredients have the following attributes:
- ingredient_id: This number is automatically assigned to each ingredient when it is created in our database. It is an auto-incrementing number which is the primary key.
ingredient_name: This value represents the name of the ingredient. This is represented by a string which is a maximum of 255 characters. It cannot be blank and there is no default value.
- food_group_id: Foreign key describing which food group the ingredient belongs to.

Recipe - recipes are essentially the purpose of the entire database, and a recipe participates in relations with several other entities. Recipes have the following attributes:

- recipe_id: This number is automatically assigned to each recipe when it is created in our database. It is an auto-incrementing number which is the primary key.
- recipe_name: This value represents the name of the recipe. This is represented by a string which is a maximum of 255 characters. It cannot be blank and there is no default value.
- user_id: An integer value that represents the user_id who submitted the recipe. This value is not required, and it’s NULL by default. If NULL, the value indicates that the current recipe is not owned by any user.
- recipe_image_url: a text value representing the main image for the recipe. This can be blank, and the default value is NULL. The max length is 255.
- recipe_instructions: A text block that provides preparation and cooking instructions. This can be blank, and the default value is NULL.
- created_date: A timestamp that maintains the date of the recipe’s creation. The default value is the current date and time.
- recipe_description: A text block that allows the user to briefly describe the recipe in a sentence or two.

Recipe Category - A recipe category is used to describe which category a recipe fits into. Tentative categories include “Main Course”, “Side dish”, “Dessert”, or “Beverage”.
- recipe_category_id: Auto-incrementing primary key number automatically assigned to each recipe category record when it is created in our database. 
- recipe_category_name: Text value for the name of the recipe category item with a max length of 35 characters. This cannot be blank and there is no default value.

Recipe Significance Type - A recipe significance type describes a type of significance that a recipe may have (which will be used in relation to a user_recipe_significance record. The user_recipe_significance table is not represented as an entity in our outline, but it will be represented as a table in our database, as it represents the ternary relationship between a user, a recipe, and a recipe significance type). This will include “liked” or “disliked”.
- recipe_significance_type_id: Auto-incrementing primary key number automatically assigned to each recipe significance type record when it is created in our database. 
- recipe_significance_type_name: Text value for the name of the recipe significance type item with a max length of 15 characters. This cannot be blank and there is no default value.

Dietary Restriction - A dietary restriction describes the name of a specified diet that may have unique ingredient restrictions. A dietary restriction record may then be related to ingredients via a record in the ingredient_dietary_restriction table (which is not on our list of entities, but will become a table to represent the many-to-many relationship between ingredients and dietary restrictions), which will indicate which ingredients belong to a given dietary restriction.
- dietary_restriction_id: Auto-incrementing primary key number automatically assigned to each dietary requirement record when it is created in our database. 
- dietary_restriction_name: Text value for the name of the dietary requirement, with a max length of 35 characters. This cannot be blank and there is no default value.

Cuisine - A cuisine describes a style, method, country, or region of a recipe.
- cuisine_id: Auto-incrementing primary key number automatically assigned to each cuisine record when it is created in our database. 
- cuisine_name: Text value for the name of the cuisine, with a max length of 35 characters. This cannot be blank and there is no default value.

Unit of Measure - A unit of measure describes a standard measurement from which to quantify an ingredient that is used within a recipe. 
- unit_of_measure_id: Auto-incrementing primary key number automatically assigned to each unit when it is created in our database. 
- unit_of_measure_name: Text value for the unit of measure type, with a max length of 25 characters. This cannot be blank and there is no default value.
- unit_of_measure_abbrev: Text value abbreviating the name. Max length of 5 characters. This can be blank and the default value is NULL.

App User - A user is a person that creates an account presumably for the purposes of creating, reading, updating, or deleting recipes.
- user_id: Auto-incrementing primary key number automatically assigned to each user when their profile is created in our database.
- user_name: Text value that represents a pseudo-name for a user which has a max length of 50 characters. This cannot be blank and there is no default value. 
- user_email: Text value for the user’s email address with a max length of 150 characters. This cannot be blank and there is no default value.
- user_password: Text value for the user’s password with a max length of 20. This cannot be blank and there is no default value.

Food Group - categories for organizing what each ingredient is. This adds another layer of abstraction that helps us generate better recipes for users. Examples include “Poultry” and “Fruit.”
- food_group_id: Primary key number, has already been designated by the USDA document listing ingredients that we are using. Auto-increments for any other food groups created by users.
- food_group_name: Text value up to 50 characters that names the food group. Cannot be null.


<br>

## Relationships
- Users may create (and therefore have ownership of) recipes - A user may create many recipes, but a recipe may only be created/owned by up to one user. So, the Recipe and User entities are in a one-to-many relationship.

- Users may have significant recipes - A user may mark a recipe to indicate for a specific significance as follows (Note: the two relationships described below will be implemented in the database as a table representing the ternary relationship between the User, Recipe, and Recipe Significance Type entities).

- Users may have “liked” recipes - A user may mark a recipe as a “liked” recipe. This is a many-to-many relationship, in that many users may mark many recipes as “liked” recipes.

- Users may have disliked recipes - A user may mark a recipe as a “disliked” recipe, effectively eliminating it from being the result of a recipe spin. This is a many-to-many relationship, because many users may mark many recipes as “disliked” recipes.

- Recipes are made up of ingredients - A recipe must have at least one ingredient, but may have many ingredients. An ingredient may belong to many recipes. So, the Recipe and Ingredient entities are in a many-to-many relationship.

- A Recipe-Ingredient has a unit of measure - the relationship between a Recipe and an Ingredient has a one-to-many relationship with Unit of Measure being that one Recipe-Ingredient combination can only have one Unit of Measure, but a Unit of Measure can describe many different Recipe-Ingredient combination.

  - Additionally, the Recipe-Ingredient relationship has an attribute of amount to further describe how much of an ingredient belongs in a recipe. The default is ‘1.’
Unit of measure is allowed to be NULL, however, the amount is not allowed to be. For example, a recipe might ask for 1 banana. However it will never ask for NULL tablespoons of milk.

- Recipes have a recipe category - A recipe can only be described by one recipe category, but a recipe category may describe many different recipes. So, the Recipe and Recipe Category entities are in a one-to-many relationship.

- Recipes have cuisines - Each recipe must be described by at least one cuisine, but may be described by many cuisines. A cuisine may describe many recipes. Therefore, the Recipe and Cuisine entities are in a many-to-many relationship.

- Dietary Restrictions have food groups - A dietary restriction may include many food groups that are not allowed within the specified diet. A dietary restriction may include many different food groups, and food groups may be part of many different dietary restrictions. Therefore, the Dietary Restriction entity has a many-to-many relationship with the Food Group entity.

- Ingredients have a food-group - This is a one to many relationship, as there are many ingredients that belong to each food group, but each ingredient only has one group that it belongs to.

