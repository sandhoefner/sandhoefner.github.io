from random import randint

myPos = 3
billPos = 3
results = []

def movef(start, direc):
	ret = start + direc
	if ret == 6:
		ret = 1
	elif ret == 0:
		ret = 5
	return ret

for i in range(100000):
	move = randint(-1,1)
	if move == 0:
		winPos = billPos
	else:
		while move != 0:
			billPos = movef(billPos, move)
			move = randint(-1,1)
		winPos = billPos
	results.append(winPos)

counts = [0,0,0,0,0]
for result in results:
	counts[result-1] += 1

for count in counts:
	print float(count)/len(results)