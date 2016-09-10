# run with python3

from random import randint
import statistics

size = int(input())
myPos = 3
billPos = 3
results = []
turns = []

def movef(start, direc):
	ret = start + direc
	if ret > size:
		ret = 1
	elif ret == 0:
		ret = size
	return ret

for i in range(100):
	move = randint(-1,1)
	turnCount = 1
	if move == 0:
		winPos = billPos
	else:
		while move != 0:
			turnCount += 1
			billPos = movef(billPos, move)
			move = randint(-1,1)
		winPos = billPos
	results.append(winPos)
	turns.append(turnCount)

counts = [0] * size
for result in results:
	counts[result-1] += 1

for count in counts:
	print(float(count)/len(results))

print(turns)

print("standard deviation of turns: " + str(statistics.stdev(turns)))
print("average turns: " + str(statistics.mean(turns)))