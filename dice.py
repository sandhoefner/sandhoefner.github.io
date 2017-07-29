import random

successes = 0
trials = 0

for i in range(10000):
	guesses = [random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1)]
	trials += 1
	wins = 0
	corrects = [random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1),random.randrange(1,13,1)]
	for i in range(9):
		if corrects[i] == guesses[i]:
			wins += 1
	print wins
	if wins >= 4:
		successes += 1

print successes
print trials
print 100*float(successes)/trials