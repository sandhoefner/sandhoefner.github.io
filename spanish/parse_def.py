from bs4 import BeautifulSoup
import csv
import os

soup = BeautifulSoup(open("../../../spanish_data/1_de.html"), "html.parser")
quickdef = soup.findAll("div", {"class": "quickdef"})[1]
source = quickdef.find("div", {"class": "source"})
source_text = source.find("h1", {"class": "source-text"})
lang = quickdef.find("div", {"class": "lang"})
el = lang.find("div", {"class": "el"})

lexeme = source_text.text
defn = el.text

print "lexeme: " + lexeme
print "definition: " + defn