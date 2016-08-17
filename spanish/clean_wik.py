# -*- coding: utf-8 -*-

import csv

writeRows = [['','','']]

with open('wiktionary.csv', 'rb') as readfile:
	with open('cleaned_wik.csv', 'w') as writefile:
		myReader = csv.reader(readfile, delimiter = ',', quotechar = '"')
		rows = list(myReader)
		rankCol = 0
		wordCol = 1
		freqCol = 2
		lemCol = 3
		counter = 0
		fieldnames = ['lemma','frequency','derivatives']
		writer = csv.DictWriter(writefile, fieldnames=fieldnames)
		writer.writeheader()
		for row in rows[1:len(rows)]:
			counter += 1
			# print writeRows
			word = row[wordCol].decode('utf-8')
			freq = row[freqCol]
			lem = row[lemCol].decode('utf-8')
			for writeRow in writeRows:
				if writeRow[0] == lem:
					writeRow[1] = int(freq) + int(writeRow[1])
					writeRow[2] += (" " + word)
					break
			else:
				writeRows.append([lem, freq, word])
		for row in writeRows:
			# print row
			if row[0]:
				writer.writerow({'lemma': row[0].encode('utf-8'),
								 'frequency': row[1],
								 'derivatives': row[2].encode('utf-8')})