
##########################################################################################
# This file does the following:
#   1) Parses FOOD_DES.txt into a list of ingredients (../ingredient_list.txt)
#   2) Further parses the ingredients into ingredient categories, and then
#       removes and duplicate categories from that list (../ingredient_categories.txt)
#   3) Uses the list of unique ingredient categories to generate a formatted SQL insert
#       statement which can be used to populate an the ingredient and ingredient_category 
#       tables in the db (../ingredient.sql, ../ingredient_category.sql)
##########################################################################################

import re


""" 
@name: dedup_file_list
@description: Removes duplicate line items from a file (in place)
    and sorts the lines alphabetically (ascending).
@param: file - the file containing the lines to be deduped and sorted.
@return: the sorted set of line items that was used to write to the file.
"""
def dedup_file_list(file):
    file.seek(0)
    lines = file.readlines()
    
    # Use the marker set to help track duplicate values (case-insensitive).
    # If the lowercased version of a value isn't in the marker_set, add it to the 
    # file_set. This removes any duplicates but still preserves the case of the original values.
    marker = set()
    file_set = set()

    for line in lines:
        line = line.strip() + '\n'
        ll = line.lower()
        if ll not in marker:
            marker.add(ll)
            file_set.add(line)

    # sort the set alphabetically.
    file_set = sorted(file_set)

    # remove the existing contents of the file.
    file.seek(0)
    file.truncate()

    # write the deduped list back to the file
    for line in file_set:
        file.write(line)
    
    return file_set



""" 
@name: lines_to_insert_statement
@description: Uses the items in a set to generate an INSERT sql statement.
@param lines: the lines used to create the INSERT statement.
@param outputFile: the file to write the generated SQL.
@param leadText: text to be placed in the INSERT statement before
@param optional delimiter if there are multiple columns in the statement.
    the list of items (should be the INSERT INTO... part)
"""
def lines_to_insert_statement(lines, output_file, lead_text, delimiter='\t'):
    # write the lead text
    output_file.write(lead_text)

    # keep track of the last line
    line = None
    last_line = None

    # Format each line in the set as SQL
    for line in lines:
        if not last_line == None:
            last_line = last_line.strip().replace('\'', '\'\'')
            temp = '('

            # Split the string on the delimiter and handle each column individually,
            # Then, join the columns back together for the single insert line.
            for col in last_line.split(delimiter):
                if col.isnumeric() == False:
                    temp = temp + '\'' + col + '\','
                else:
                    temp = temp + col + ','

            temp = temp.rstrip(',')
            temp = temp + '),\n'

            last_line = temp
            output_file.write(last_line)
        last_line = line

    # exchange the comma on the last line for a semicolon
    last_line = last_line.strip().replace('\'', '\'\'')
    last_line = '(\'' + last_line + '\');'
    output_file.write(last_line)
    return






# open the files
inputFile = open('FOOD_DES.txt', 'r')
ingredientFile = open('ingredient_list.txt', 'w+')
ingredientDML = open('../ingredients.sql', 'w+')
categoryFile = open('ingredient_categories.txt', 'w+')
categoryDML = open('../ingredient_categories.sql', 'w+')



# Parse the ingredients and ingredient categories.
for line in inputFile:
    ingredient_group = re.sub('~\\d+(~\\^~)|((~\\^~).*?){2}.*', '', line)

    ingredient = re.sub('~\\d+(~\\^~(\\d+)~\\^~)|((~\\^~Y?).*?){2}.*', '', line)
    ingredient = re.sub(' +', ' ', ingredient) # remove multiple spaces

    category = re.sub('\\(.*?\\)|,.*', '', ingredient)
    category = re.sub(' +', ' ', category)  # remove multiple spaces

    # bypass any brand name items
    brand_match = re.match('^(Mc)?([A-Z]+)\\b', ingredient)
    if not brand_match:
        ingredientFile.write(ingredient)
        # categoryFile.write(category)
        categoryFile.write(category.strip() + '\t' + ingredient_group) 
        # if we were going to add ingredient group. However, if we go this route, then we're running into the
        # issue of duplicate ingredient_categories (since they still have a unique category, ingredient group combo)



# Remove duplicate ingredients & ingredient_categories
ingredient_set = dedup_file_list(ingredientFile)
category_set = dedup_file_list(categoryFile)


# Generate the DDL for the ingredients and ingredient categories
ingredient_lead = 'INSERT INTO `ingredient` (ingredient_name) VALUES\n'
category_lead = 'INSERT INTO `ingredient_category` (ingredient_category_name) VALUES\n'

lines_to_insert_statement(ingredient_set,ingredientDML, ingredient_lead)
lines_to_insert_statement(category_set,categoryDML, category_lead)



# close the files
inputFile.close()
ingredientFile.close()
ingredientDML.close()
categoryFile.close()
categoryDML.close()
