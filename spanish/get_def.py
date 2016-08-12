# some of these may not be used
import csv
import io
from bs4 import BeautifulSoup
import urllib
import requests
import mechanize
import cookielib
from requests import session

user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36'
headers = {'User-Agent': user_agent}

# in test run on apartment wifi this averaged 1.24 seconds per page
with open('CREA_truncated_utf8.csv', 'rb') as csvfile:
	myReader = csv.reader(csvfile, delimiter = ',', quotechar = '"')
	rows = list(myReader)
	# cols: rank, word, abs_freq, norm_freq
	rankCol = 0
	wordCol = 1
	afreqCol = 2
	nfreqCol = 3
	for row in rows[76131:len(rows)]:
		word = row[wordCol].decode('utf-8').strip()
		# print word
		rank = row[rankCol]
		url = "http://eubd1.ugr.es/xtf/search?lng=sp&sort=title&keyword=" + word
		r = requests.get(url, headers=headers)
		with open("/home/evan/Documents/granada_data/"+rank+"_"+word+".html", "w+") as f:
			f.write(r.content)
			print "successfully wrote " + rank + " " + word
	print "done"