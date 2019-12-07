sowpods = open("sowpods.txt", "r")
output = open("wordlist.js", "w")
output.write("const wordList = [")

count = 0
for word in sowpods.read().splitlines():
    if len(word) == 8:
        output.write("'" + word + "', ")
        count += 1

output.write(']')

sowpods.close()
output.close()

print("{} 8-letter words extracted from SOWPOWDS word list".format(count))
