from time import sleep

seconds = 0
while True:
	sleep(1)
	seconds += 1
	m, s = divmod(seconds, 60)
	h, m = divmod(m, 60)
	print "%d:%02d:%02d" % (h, m, s)