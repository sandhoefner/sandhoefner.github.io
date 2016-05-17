# fuck it we starting over
# let's not lose this one

from bs4 import BeautifulSoup

import requests
import urllib2

alltime_men = BeautifulSoup(requests.get("https://www.8a.nu/Scorecard/Ranking.aspx?CountryCode=GLOBAL&RankingAgeLimit=0&CombinedRanking=0&RankingListType=0&Gender=0").text)
# print alltime_men
# alltime_women = BeautifulSoup(requests.get("https://www.8a.nu/Scorecard/Ranking.aspx?CountryCode=GLOBAL&RankingAgeLimit=0&CombinedRanking=0&RankingListType=0&Gender=1").text)

men_links = alltime_men.find_all('a')

men_bloc_logs = []
men_bloc_bios = []
men_sport_logs = []
men_sport_bios = []

for (i, link) in enumerate(men_links):
	if i in (18+4*y for y in range(100)):
		men_sport_logs.append(link)
	elif i in (19+4*y for y in range(100)):
		men_sport_bios.append(link)
	elif i in (419+4*y for y in range(100)):
		men_bloc_logs.append(link)
	elif i in (420+4*y for y in range(100)):
		men_bloc_bios.append(link)



url = "https://www.8a.nu/Scorecard/" + men_bloc_logs[0]['href']
# http://stackoverflow.com/questions/25491872/python-request-geturl-returns-empty-content
user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
headers = {'User-Agent': user_agent}
r = BeautifulSoup(requests.get(url, headers=headers).text)
newurl = r.find('a', text='All Time (All Ascents)')['href']
newurl = newurl[2:len(newurl)]
newurl = "https://www.8a.nu" + newurl
# print newurl
r = BeautifulSoup(requests.get(newurl, headers=headers).text)
# print r.prettify()


div = r.find('div', id='AscentStats')
rows = div.find_all('tr')
hardest_grade = rows[3].find_all('td')[0].text
print hardest_grade
#, href=True, text='All Time (All Ascents)'