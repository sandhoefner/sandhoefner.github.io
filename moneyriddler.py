from random import randint

myPos = 3
billPos = 3
results = []
turns = []

def movef(start, direc):
	ret = start + direc
	if ret == 6:
		ret = 1
	elif ret == 0:
		ret = 5
	return ret

for i in range(100):
	move = randint(-1,1)
	if move == 0:
		winPos = billPos
	else:
		turnCount = 1
		while move != 0:
			turnCount += 1
			billPos = movef(billPos, move)
			move = randint(-1,1)
		winPos = billPos
	results.append(winPos)
	turns.append(turnCount)

counts = [0,0,0,0,0]
for result in results:
	counts[result-1] += 1

for count in counts:
	print float(count)/len(results)

print turns