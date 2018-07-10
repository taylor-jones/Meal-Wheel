import re

inputFile = open("FOOD_DES.txt", "r")
ingredientFile = open("ingredient_list.txt", "w")
categoryFile = open("ingredient_categories.txt", "w")

for line in inputFile:
    # parse the ingredient list
    result = re.sub("~\\d+(~\\^~(\\d+)~\\^~)|((~\\^~Y?).*?){2}.*", "", line)
    ingredientFile.write(result)

    # further parse to grab the text before the first comma as the category
    category = re.sub(",.*", "", result)
    categoryFile.write(category)

inputFile.close()
ingredientFile.close()
categoryFile.close()


