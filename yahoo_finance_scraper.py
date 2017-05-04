from bs4 import BeautifulSoup
import requests

ticker_list = ["SNY", "GM", "YUM"]

def makeSoup(url):
	return BeautifulSoup(requests.get(url).text, "lxml")

def get_data(ticker):
	summary_url = "https://finance.yahoo.com/quote/" + ticker
	profile_url = summary_url + "/profile"

	summary_soup = makeSoup(summary_url)
	profile_soup = makeSoup(profile_url)

	price = summary_soup.find("span", {"data-reactid": "36"}).text
	market_cap = summary_soup.find("span", {"data-reactid": "79"}).text
	industry = 0
	sector = 0
	print summary_soup.prettify()
	# may need selenium for recommendation which is most important part???
	recommendation = summary_soup.find("div", {"id", "Col2-7-QuoteModule-Proxy"})

	print recommendation
	print recommendation.prettify()

	return [sector, industry, price, market_cap, recommendation]

def put_data(data):
	return 0

for ticker in ticker_list:
	data = get_data(ticker)
	put_data(data)