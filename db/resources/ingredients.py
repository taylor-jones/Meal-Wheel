
##########################################################################################
# This file does the following:
#   1) Uses regex to parse FOOD_DES.txt into a list of ingredients (ingredient_list.txt)
#   2) Uses regex to further parse the ingredients into ingredient categories, and then
#       removes and duplicate categories from that list (ingredient_categories.txt)
#   3) Uses the list of unique ingredient categories to generate a formatted SQL insert
#       statement which can be used to populate an ingredient_category table in the db
#       (ingredient_category.sql)
##########################################################################################

import re


# open the files
inputFile = open("FOOD_DES.txt", "r")
ingredientFile = open("ingredient_list.txt", "w")
categoryFile = open("ingredient_categories.txt", "w+")
categorySQL = open('../ingredient_categories.sql', 'w+')


# 
# Parse the ingredients and ingredient categories.
# 
for line in inputFile:
    # parse into ingredients
    ingredient = re.sub("~\\d+(~\\^~(\\d+)~\\^~)|((~\\^~Y?).*?){2}.*", "", line)
    ingredientFile.write(ingredient)

    # further parse to grab the text before the first comma as the "ingredient category"
    category = re.sub("\\(.*?\\)|,.*", "", ingredient)
    categoryFile.write(category)


# 
# Remove duplicate ingredient categories
# 
categoryFile.seek(0)
lines = categoryFile.readlines()


# Use the marker set to help track duplicate values (case-insensitive)
# if the lowercased version of a value isn't in the marker set, add it
# to the ingredient category set. This removes any duplicates but still
# preserves the case of the original values.
marker = set()
category_set = set()

for line in lines:
    line = line.strip() + '\n'
    ll = line.lower()
    if ll not in marker:
        marker.add(ll)
        category_set.add(line)


# sort the category set alphabetically.
category_set = sorted(category_set)

# remove the existing contents of the category file.
categoryFile.seek(0)
categoryFile.truncate()


#
# Generate ingredient_category SQL INSERT statement. 
#

# Write the categories in sorted order as an insert statement into the sql file.
categorySQL.write('INSERT INTO `ingredient_category` (ingredient_category_name) VALUES\n')

# Format each line for SQL
line = None
last_line = None

for line in category_set:
    categoryFile.write(line)

    if not last_line == None:
        last_line = last_line.strip().replace('\'','\'\'')
        last_line = '(\'' + last_line + '\'),\n'
        categorySQL.write(last_line)
    last_line = line

# exchange the comma on the last line for a semicolon
last_line = last_line.strip().replace('\'', '\'\'')
last_line = '(\'' + last_line + '\');'
categorySQL.write(last_line)




# close the files
inputFile.close()
ingredientFile.close()
categoryFile.close()
categorySQL.close()

