from random import randint

html_str = ""
options = ['a','s','d','f','j','k','l',';']
for i in range(100000000):
	html_str += options[randint(0,7)]

Html_file = open("asdf.html","w")
Html_file.write(html_str)
Html_file.close()