print("> Give me a number between 0 and 1")

pct = input()

# print("> I heard " + str(pct))

best_diff = 100
best_pair = [10,1]

for i in range(1,11):
	for j in range(1,11):
		print str(i) + ".0/" + str(j)
		diff = abs(float(i)/j - pct)
		# print(str(i) + "/" + str(j) + " has diff " + str(diff))
		if diff < best_diff:
			best_diff = diff
			best_pair = [i,j]

print("> The nearest smallint/smallint approximation of " + str(pct) + " is " + str(best_pair[0]) + "/" + str(best_pair[1]))