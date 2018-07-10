import re

inputFile = open("FOOD_DES.txt", "r")
outputFile = open("output.txt", "w")

for line in inputFile:
    result = re.sub("~\\d+(~\\^~(\\d+)~\\^~)|((~\\^~Y?).*?){2}.*", "", line)
    outputFile.write(result)

inputFile.close()
outputFile.close()
