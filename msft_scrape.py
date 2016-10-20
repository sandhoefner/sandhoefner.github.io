import urllib
import requests
import os
from bs4 import BeautifulSoup

os.chdir('/home/evan/Documents/git/sandhoefner.github.io/msft')
user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36'
headers = {'User-Agent': user_agent}
testfile = urllib.URLopener()
base = "https://www.glassdoor.com/Interview/Microsoft-Program-Manager-Interview-Questions-EI_IE1651.0,9_KO10,25_IP"


# from selenium import webdriver

# browser = webdriver.PhantomJS()




# for i in range(40):
# 	url = base + str(i + 1) + ".htm"
# 	print url

# 	r = requests.get(url, headers=headers)
# 	# print url
# 	# print BeautifulSoup(r.content).text
# 	browser.get(url)
# 	html = browser.page_source
# 	with open((str(i + 1) + ".html"), "w") as f:
# 		f.write(html)

# quit()

# j = 2
j = 40
text_file = open("Output.txt", "w")


for i in range(j):
	path = str(i + 1) + ".html"
	soup = BeautifulSoup(open(path), "html.parser")
	questions = soup.find_all('div', {'class':"interviewQuestions"})
	for question in questions:
		text_file.write(question.text.encode('utf-8') + ";;;")


text_file.close()