# Script used to build the list of 8-letter words

import re

word_list_file = open("english.txt", "r")
output = open("wordlist.js", "w")
output.write("export const wordList = [")

count = 0
for word in word_list_file.read().splitlines():
    if re.match("^[a-z]{8}$", word):
        output.write("'" + word + "', ")
        count += 1

output.write(']')

word_list_file.close()
output.close()

print("{} proper 8-letter words extracted from ENGLISH word list".format(count))
