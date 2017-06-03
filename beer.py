from bs4 import BeautifulSoup
import lxml
import requests
import ratebeer
import re

def makeSoup(url):
	return BeautifulSoup(requests.get(url).text, "lxml")

rb = ratebeer.RateBeer()
keyword = raw_input("Beer keyword(s): ")
keyword_plus = keyword.replace(" ",	"+")
veg_url = "http://www.barnivore.com/search?keyword="+keyword
rb.search("summit extra pale ale")
results = rb.search(keyword)
vegSoup = makeSoup(veg_url)
vegNames = vegSoup.find_all("div",{"class":"name"})
# vegA = vegNames.find_all("a")
vegKosh = str(vegSoup.find_all("div",{"class":"status"}))

rate_url = "https://www.google.com/search?gbv=1&q=site:ratebeer.com/beer+" + keyword_plus
rate_soup = makeSoup(rate_url)
rate_brief = rate_soup.find("div",{"id":"center_col"})



vegNames = str(vegNames)
names = re.sub('<[^>]+>', '', vegNames).split(",")
vegs = re.sub('<[^>]+>', '', vegKosh).split(",")



print "\n\n"
counter = 0
for (i,elt) in enumerate(names):
	elt = elt.replace("[","").replace("]","")
	veg = vegs[i].replace("[","").replace("]","")
	print elt[counter+2:-2] + " ... " + veg[counter+2:-2]
	if counter == 0:
		counter = 1
print "\n\n"