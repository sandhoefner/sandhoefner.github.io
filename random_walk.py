# https://twitter.com/Scientific_Bird/status/1189249012144267265
# In evolutionary drift, the expected change is zero.
# That does not mean it is very likely that no change will happen.
# There is substantial variance, so 0 itself is unlikely.
# For illustration, below I simulate 5 random walks with expected value 0.
# Big differences in trajectories.


import random
import numpy

changes = []

def rand():
	return 1 if random.random() < 0.5 else -1

def rand_smooth():
	return rand() * random.random()

for i in range(5000):
	x = 0
	for j in range(1000):
		x += rand_smooth()
	changes.append(x)

print(changes)

absolute_changes = [abs(elt) for elt in changes]

expected_change = sum(changes)/len(changes)

expected_absolute_change = sum(absolute_changes)/len(absolute_changes)

print("expected change: " + str(expected_change))

print("expected absolute change: " + str(expected_absolute_change))

numpy.histogram(absolute_changes)