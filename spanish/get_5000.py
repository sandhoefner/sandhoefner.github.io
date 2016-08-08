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

for page in range(50):
	str_page = str(page + 1)
	url = "http://www.memrise.com/course/203799/5000-most-frequent-spanish-words/" + str_page
	r = requests.get(url, headers=headers)
	with open("5000/" + str_page + ".html", "w+") as f:
		f.write(r.content)
		print "successfully wrote " + str_page

# cat *.html >> all.html