# automate q & a posting

import urllib
import csv
import requests
from bs4 import BeautifulSoup
import mechanize
import cookielib
from requests import session

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

# function for saving HTML locally
def save(text, file):
	view = open(file + '.html', 'w')
	view.write(text)
	view.close()

# google login helper from http://stackoverflow.com/questions/6754709/logging-in-to-google-using-python
class SessionGoogle:
    def __init__(self, url_login, url_auth, login, pwd):
        self.ses = requests.session()
        login_html = self.ses.get(url_login)
        soup_login = BeautifulSoup(login_html.content).find('form').find_all('input')
        dico = {}
        for u in soup_login:
            if u.has_attr('value'):
                dico[u['name']] = u['value']
        # override the inputs with out login and pwd:
        dico['Email'] = login
        dico['Passwd'] = pwd
        self.ses.post(url_auth, data=dico)
    def get(self, URL):
        return self.ses.get(URL).text

# here goes nothing
url_login = "https://accounts.google.com/ServiceLogin"
url_auth = "https://accounts.google.com/ServiceLoginAuth"
session = SessionGoogle(url_login, url_auth, "quadrigramteam", "quadrigramdataviz?")
gold = session.get("http://www.quadrigram.com/rs/user/access")
save(gold, 'gold')

# fill form
pass

# satisfy captcha and submit
pass

# update local file with next-up row number
posted = False
if posted:
	writeRow = open('row.txt', 'w')
	writeRow.write(str(row + 1))
	writeRow.close()