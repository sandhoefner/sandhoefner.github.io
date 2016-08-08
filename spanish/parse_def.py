from bs4 import BeautifulSoup
import csv

with open('CREA_truncated.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	rankCol = 0
	wordCol = 1
	afreqCol = 2
	nfreqCol = 3
	counter = 1
	for row in rows[1:500]:
		word = row[wordCol].decode('latin1').strip()
		file = str(counter) + "_" + word
		soup = BeautifulSoup(open("../../../spanish_data/" + file + ".html"), "html.parser")
		try:
			quickdef = soup.findAll("div", {"class": "quickdef"})[1]
			source = quickdef.find("div", {"class": "source"})
			source_text = source.find("h1", {"class": "source-text"})
			lang = quickdef.find("div", {"class": "lang"})
			el = lang.find("div", {"class": "el"})
			lexeme = source_text.text
			defn = el.text
		except (IndexError, AttributeError) as error:
			try:
				quickdef = soup.findAll("div", {"class": "quickdef"})[0]
				source = quickdef.find("div", {"class": "source"})
				source_text = source.find("h1", {"class": "source-text"})
				lang = quickdef.find("div", {"class": "lang"})
				el = lang.find("div", {"class": "el"})
				lexeme = source_text.text
				defn = el.text
			except (IndexError, AttributeError) as error2:
				lexeme = defn = "11896"
				print file
		# print "input: " + word
		# print "lexeme: " + lexeme
		# print "definition: " + defn + "\n"
		counter += 1