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

# write the categories in sorted order
for line in category_set:
    categoryFile.write(line)



# close the files
inputFile.close()
ingredientFile.close()
categoryFile.close()

