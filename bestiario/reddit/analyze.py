from bs4 import BeautifulSoup
import csv

soup = BeautifulSoup(open("top40year.html"), "html.parser")
posts = soup.findAll("div", id=lambda x: x and x.startswith("thing"))

with open("year_analysis.csv", "w") as csvfile:
	fieldnames = ["score_dis","score_unv","score_lik","author","domain","rank","time","Type","url","title","comments","flair","thumbnail"]
	writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
	writer.writeheader()

	for post in posts:

		score_dis = post.find("div", {"class": "score dislikes"}).text
		score_unv = post.find("div", {"class": "score unvoted"}).text
		score_lik = post.find("div", {"class": "score likes"}).text

		author = post["data-author"]
		domain = post["data-domain"]
		rank = post["data-rank"]
		time = post["data-timestamp"]
		Type = post["data-type"]
		url = post["data-url"]

		title = post.find("div", {"class": "lcTagged"}).find("a").text

		comments = post.find("a", {"class": "bylink comments may-blank"}).text

		try:
			flair = post.find("span", {"class": "flair"})["title"]
		except:
			flair = ""

		thumbnail = 1
		if post.find("a", {"class": "thumbnail"}).find("img") is None:
			thumbnail = 0

		writer.writerow({"score_dis":score_dis.encode("utf-8"),"score_unv":score_unv.encode("utf-8"),"score_lik":score_lik.encode("utf-8"),"author":author.encode("utf-8"),"domain":domain.encode("utf-8"),"rank":rank.encode("utf-8"),"time":time.encode("utf-8"),"Type":Type.encode("utf-8"),"url":url.encode("utf-8"),"title":title.encode("utf-8"),"comments":comments.encode("utf-8"),"flair":flair.encode("utf-8"),"thumbnail":thumbnail})