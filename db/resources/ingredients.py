import re

# open the files
inputFile = open("FOOD_DES.txt", "r")
ingredientFile = open("ingredient_list.txt", "w")
categoryFile = open("ingredient_categories.txt", "w+")

# 
# Parse the ingredients and ingredient categories.
# 
for line in inputFile:
    # parse the ingredient list
    ingredient = re.sub("~\\d+(~\\^~(\\d+)~\\^~)|((~\\^~Y?).*?){2}.*", "", line)
    ingredientFile.write(ingredient)

    # further parse to grab the text before the first comma as the category
    category = re.sub(",.*", "", ingredient)
    categoryFile.write(category)


# 
# Remove duplicate ingredient categories
# 
categoryFile.seek(0)
category_set = sorted(set(categoryFile.readlines()))
categoryFile.seek(0)
categoryFile.truncate()

# write the categories in sorted order
for line in category_set:
    categoryFile.write(line)



# close the files
inputFile.close()
ingredientFile.close()
categoryFile.close()

