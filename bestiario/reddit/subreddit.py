from bs4 import BeautifulSoup
import csv
import sys
import requests
import urllib3
import certifi
import urllib3.contrib.pyopenssl
from flask import Flask

# app = Flask(__name__)
# @app.route('/')

def hello_world():

	# sub = sys.argv[1]
	# yield "fish"
	sub = "dataisbeautiful"

	urllib3.contrib.pyopenssl.inject_into_urllib3()
	http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED',ca_certs=certifi.where())

	user_agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36'
	headers = {'User-Agent': user_agent}




	def recursePosts(url, allPosts):
		r  = requests.get(url, headers=headers)
		data = r.text
		soup = BeautifulSoup(data, "html.parser")
		posts = soup.findAll("div", id=lambda x: x and x.startswith("thing"))
		allPosts += posts
		try:
			neck = soup.find("span", {"class": "nextprev"}).find("a", {"rel": "nofollow next"})['href']
		except:
			return allPosts
		else:
			# always return in recursion you dummy!
			print "progress: " + str(len(allPosts))
			return recursePosts(neck, allPosts)


	allPosts = recursePosts("https://www.reddit.com/r/"+sub+"/top/?sort=top&t=all", [])

	print "final: " + str(len(allPosts))

	"""
	with open("export.csv", "w") as csvfile:
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
	"""

# if __name__ == '__main__':
# 	app.run()

hello_world()