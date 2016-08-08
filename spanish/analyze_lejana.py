# -*- coding: utf-8 -*-

# at the end of the day this isn't useful until you've folded words into lexemes

# some of these may not be used
# __future__ import must remain at top
# from __future__ import print_function
import csv
import io
from bs4 import BeautifulSoup
import urllib
import requests
import mechanize
import codecs
import cookielib
from requests import session
import collections
import operator
import locale
import os
import time
import sys
import unicodedata
from kitchen.text.converters import getwriter, to_bytes, to_unicode
import re

story = []

with open('lejana.txt','r') as f:
	for line in f:
		for word in line.split():
		   story.append(word)

legal_chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',u'á',u'é',u'í',u'ó',u'ú',u'ü',u'ñ']
buffer = []
print "\nStory contains " + str(len(story)) + " words"

# remove duplicates
story = list(set(story))

print "Story contains " + str(len(story)) + " unique words before normalizing characters"

# convert to lowercase and remove non-letter characters

for word in story:
	word = re.sub('Á', 'á', word)
	word = re.sub('É', 'é', word)
	word = re.sub('Í', 'í', word)
	word = re.sub('Ó', 'ó', word)
	word = re.sub('Ú', 'ú', word)
	word = re.sub('Ñ', 'ñ', word)
	word = re.sub('Ü', 'ü', word)
	word = re.sub('¿', '', word)
	word = re.sub('¡', '', word)
	# what I really need is obviously a way to get re.sub to sub unrecognized chars with blank instead of <?> (called REPLACEMENT CHARACTER)
	# or maybe that's not the right approach at all. there are characters such as â in my dictionary

	word = word.lower()

	# this is where the replacement character is inserted
	# my current preferred approach is when I see a replacement character in the output,
	# add it below so it just gets preserved (if it's a letter). obviously not extensible,
	# but there are a LOT of diacritics and idk what I'll want down the road.
	# I guess what happens in the 0 frequency territory doesn't matter a ton
	word = re.sub('[^abcdefghijklmnopqrstuvwxyzáéíóúüñâ]', '', word)
	# word = word.lower()
	# for char in word:
	# 	print to_unicode(char)
	# 	goodChar = False
	# 	for bitch in legal_chars:
	# 		if type(bitch) is str and bitch is char:
	# 			new_word += char
	# 			break
	# 		elif type(char) is unicode and bitch is char.decode('utf-8'):
	# 			# print 'FUCK YEAS IT IS'
	# 			new_word += char
	# 			break
	if word is not '':
		buffer.append(word)

# remove duplicates again
story = list(set(buffer))

print "Story contains " + str(len(story)) + " unique words\n"

obj = {}

# data = codecs.open('CREA_truncated.csv', "rb", "utf-8")
# print data

with open('CREA_truncated_utf8.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	# cols: rank, word, abs_freq, norm_freq
	rankCol = 0
	wordCol = 1
	afreqCol = 2
	nfreqCol = 3
	counter = 0
	progress = 0
	milestones = [i*int(len(story)/50) for i in range(51)]
	start = time.time()
	for word in story:
		if counter in milestones:
			if progress > 0:
				# print('fish' + str(counter), end='\r')
				# print('{0}\r'.format(progress)),
				# print("Progress {:2.1%}".format(progress / 10), end="\r")
				# print('\x1b[2K\r'),
				# print(progress)
				spacing = ""
				if progress < 10:
					spacing = " "
				timeLeft = int(((50-progress)/progress)*(time.time()-start))
				if timeLeft > 60:
					seg = timeLeft % 60
					timeLeft = str((timeLeft-seg)/60) + "m" + str(seg) + "s "
				else:
					timeLeft = str(timeLeft) + "s "
				# print calls will not overwrite each other if the terminal window is too narrow
				sys.stdout.write('\r[' + '.'*progress + ' '*(50-progress) + '] ' + str(progress*2) + "%, " + spacing + timeLeft + "left       "),
				sys.stdout.flush()
				# print str(progress) + "% complete: " + str(((100-progress)/progress)*(time.time()-start)) + " seconds remaining"
			progress += 1
		for row in rows:
			dict_word = row[wordCol]
			# print type(word)
			# don't use IS here
			if word == dict_word.strip():
				# print "equality"
				obj[word] = float(row[nfreqCol])
				break
		else:
			obj[word] = 0
		counter += 1

print '\n\nTask took about ' + str(time.time()-start) + ' seconds\n'

# obj = collections.OrderedDict(sorted(obj.items()))
# obj = sorted(obj.items(), key=lambda x: x[1])
obj = sorted(obj.items(), key=operator.itemgetter(1), reverse=True)
for word, freq in obj:
	#.replace(u"\uFFFD", "")
	print freq, word.strip()
	# pass