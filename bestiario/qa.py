# automate q & a posting

import urllib
import csv

# get data (url obtained manually by downloading in Drive then checking chrome://downloads)
url = 'https://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691'
# save data locally
urllib.urlretrieve(url, 'data.csv')

# check local file for next-up row number
readRow = open('row.txt', 'r')
row = int(readRow.read())
readRow.close()

# extract post parameters from csv
with open('data.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	tit = 1
	cat = 4
	# des = 
	# tags =
	ans = 2
	title = rows[row][tit]
	category = rows[row][cat]
	answer = rows[row][ans]

# sign in with google
pass

# fill form
pass

# update local file with next-up row number
posted = false
if posted == true:
	writeRow = open('row.txt', 'w')
	writeRow.write(str(row + 1))
	writeRow.close()