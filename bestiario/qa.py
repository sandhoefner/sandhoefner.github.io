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

# sign in with google
# class SessionGoogle:
#     def __init__(self, url_login, url_auth, login, pwd):
#         self.ses = requests.session()
#         login_html = self.ses.get(url_login)
#         soup_login = BeautifulSoup(login_html.content).find('form').find_all('input')
#         dico = {}
#         for u in soup_login:
#             if u.has_attr('value'):
#                 dico[u['name']] = u['value']
#         # override the inputs with out login and pwd:
#         dico['Email'] = login
#         dico['Passwd'] = pwd
#         self.ses.post(url_auth, data=dico)

#     def get(self, URL):
#         return self.ses.get(URL).text

# url_login = 'https://accounts.google.com/ServiceLogin'
# url_auth = 'https://accounts.google.com/ServiceLoginAuth'
# session = SessionGoogle(url_login, url_auth, 'quadrigramteam', 'quadrigramdataviz?')
# output = session.get('http://www.quadrigram.com/rs/user/access')
# output = session.get('http://www.quadrigram.com/blog/community/ask/')
# save(output, 'output')

# play with mechanize
# br = mechanize.Browser()
# br.addheaders = [('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36')]
# cj = cookielib.LWPCookieJar()
# br.set_cookiejar(cj)
# br.set_handle_equiv(True)
# # br.set_handle_gzip(True)
# br.set_handle_redirect(True)
# br.set_handle_referer(True)
# br.set_handle_robots(False)
# br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)
# #br.set_debug_http(True)
# #br.set_debug_redirects(True)
# #br.set_debug_responses(True)
# br.open("http://www.quadrigram.com/rs/user/access")

# fish = br.read()
# save(fish, 'access')

# br.select_form(nr=0)
# br.form['Email'] = "quadrigramteam"
# req = br.submit()
# fish = req.read()
# print fish
# # copy(req.read())
# save(fish, 'login')

# br.select_form(nr=0)
# br.form['Passwd'] = "quadrigramdataviz?"
# req2 = br.submit()
# fish2 = req2.read()
# print fish2
# save(fish2, 'passwd')
# payload = {
#     'action': 'login',
#     'username': 'quadrigramteam',
#     'password': 'quadrigramdataviz?'
# }

# with session() as c:
#     c.post('https://accounts.google.com', data=payload)
#     response = c.get('http://www.quadrigram.com/blog/community/ask/')
#     print(response.headers)
#     print(response.text)

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