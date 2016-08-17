from bs4 import BeautifulSoup
import csv

with open('CREA_truncated.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	rankCol = 0
	wordCol = 1
	afreqCol = 2
	nfreqCol = 3
	counter = 500
	for row in rows[counter:counter+500]:
		cautious = False
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
			except (IndexError, AttributeError) as error:
				try:
					lexeme = soup.findAll("a", {"class": "xrhw"})[0].text
				except (IndexError, AttributeError) as error:
					try:
						cautious = True
						lexeme = soup.findAll("a", {"class": "translate-quicktip"})[0]['href'][len('http://www.spanishdict.com/translate/'):]
						# print 'risky split result: ' + lexeme
					except (IndexError, AttributeError) as error:
						print file
		# print "input: " + word
		# print "lexeme: " + lexeme
		# print "definition: " + defn + "\n"
		# if cautious:
			# print "*******************************"
		counter += 1