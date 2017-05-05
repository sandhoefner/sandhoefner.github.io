from bs4 import BeautifulSoup
import requests
import sys
from PyQt4.QtGui import *
from PyQt4.QtCore import *
from PyQt4.QtWebKit import *
from lxml import html

from selenium import webdriver

driver = webdriver.Chrome()
# class Render(QWebPage):
#   def __init__(self, url):
# 	self.app = QApplication(sys.argv)
# 	QWebPage.__init__(self)
# 	self.loadFinished.connect(self._loadFinished)
# 	self.mainFrame().load(QUrl(url))
# 	self.app.exec_()

#   def _loadFinished(self, result):
# 	self.frame = self.mainFrame()
# 	self.app.quit()

ticker_list = ["SNY", "GM", "YUM"]

def makeSoup(url):
	return BeautifulSoup(requests.get(url).text, "lxml")

def get_data(ticker):
	summary_url = "https://finance.yahoo.com/quote/" + ticker
	profile_url = summary_url + "/profile"

	summary_soup = makeSoup(summary_url)
	profile_soup = makeSoup(profile_url)

	# result = Render(summary_url).frame.toHtml()
	#QString should be converted to string before processed by lxml
	# formatted_result = str(result.toAscii())

	#Next build lxml tree from formatted_result
	# tree = html.fromstring(formatted_result)

	#Now using correct Xpath we are fetching URL of archives
	# archive_links = tree.xpath('//div[@class="campaign"]/a/@href')
	# print archive_links
	driver.get(summary_url)
	print driver.page_source

	price = summary_soup.find("span", {"data-reactid": "36"}).text
	market_cap = summary_soup.find("span", {"data-reactid": "79"}).text
	industry = 0
	sector = 0
	# print summary_soup.prettify()
	# may need selenium for recommendation which is most important part???
	recommendation = summary_soup.find("div", {"id", "Col2-7-QuoteModule-Proxy"})

	# print recommendation
	# print recommendation.prettify()

	return [sector, industry, price, market_cap, recommendation]

def put_data(data):
	return 0

for ticker in ticker_list:
	data = get_data(ticker)
	put_data(data)