
# works on input "dogfish"
# not robust across whether there is/isn't a smartass google preview answer, or a google-found data for each hit
# basically this fucking blows



from bs4 import BeautifulSoup
import lxml
import requests
import ratebeer
import unicodedata
import re

def makeSoup(url):
	return BeautifulSoup(requests.get(url).text, "lxml")

rb = ratebeer.RateBeer()
keyword = raw_input("\nBeer keyword(s): ")
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





titles = str(rate_soup.find_all("h3",{"class":"r"}))
ratings = str(rate_soup.find_all("div",{"class":"s"}))

titles= re.sub('<[^>]+>', '', titles)
listt = ratings.split('Rating:')
data = []
for i in listt:
	temp = i.split('votes')[0]
	# print type(temp)
	data.append(temp.split("%")[0] + " ... " + temp.split("a0")[2])
	# print ""
# print re.sub('<[^>]+>', '', ratings)


# print re.search("999(.*)999", "999fish999888999stick999").group(2)



titles = titles.split(",")
clean_titles = []
for title in titles:
	clean = title[1:-11].strip()
	clean_titles.append(clean)

titles = clean_titles[1:]

data = data[1:]

if len(titles) != len(data):
	print "title-rating mismatch"

print ""
counter = 0
for (i,elt) in enumerate(names):
	elt = elt.replace("[","").replace("]","")
	veg = vegs[i].replace("[","").replace("]","")
	print elt[counter+2:-2] + " ... " + veg[counter+2:-2]
	if counter == 0:
		counter = 1
print ""

for (i,elt) in enumerate(titles):
	print elt + " ... " + data[i]

print ""