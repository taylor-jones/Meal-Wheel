# Meal Wheel

Meal Wheel is a web application that allows users to find recipes using a series of optional specifications.


## Overview

Users will have the option to specify certain parameters with which they can limit the scope of the recipes that may be returned. These parameters include: a recipe category, dietary restriction, and/or cuisine specification. Users will also have the ability to add, update, and delete recipes of their own or recipes which have no owner. They will not be able to change or delete recipes submitted by other users. They will be able to mark recipes they like as well as mark recipes that they don’t ever want to see again (meaning those recipes will never show up when the user spins the wheel, even if all the parameters match). After they have spun for a recipe, they will have the option to re-spin for a new recipe as much as they’d like. The user also has the ability to browse all the recipes in the database, limiting the scope of the displayed recipes based on any of the following parameters: recipe name, ingredients, cuisine, category, and/or dietary restriction. These parameters can be mixed and matches (or omitted) however the user chooses.

Additionally, a user can visit any one of the “Admin” pages by clicking the link found at the far left of the footer. In this area of the application, any of the components that are used to make up the application can be created, read, updated, or deleted however the user chooses. We chose to include all necessary tables in this area in order to meet the project specifications, but there are a couple of places where it is not advisable that the user actually make changes to the data. For instance, in the Recipe Significance Type table, having ‘liked’ and ‘disliked’ is integral to the user experience, and these records should not be removed.

Finally, a user has the ability to login, logout, register, and visit their profile page (once logged in) where they have the ability to change their username, email address, password, and/or view any and all recipes that they’ve liked, disliked, or submitted.

<br>

## Database
For details about the database structure and relationships see [here](db/DB_README.md).

## Application
For details about the application server and front-end, see [here](app/APP_README.md).
