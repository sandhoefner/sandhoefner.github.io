import httplib2
from BeautifulSoup import BeautifulSoup, SoupStrainer

http = httplib2.Http()
status, response = http.request('http://www.nytimes.com')

for link in BeautifulSoup("Effective Altruism microsoft.html", parseOnlyThese=SoupStrainer('a')):
    if link.has_attr('href'):
        print link['href']