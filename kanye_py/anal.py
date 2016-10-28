# from http://www.pyimagesearch.com/2014/08/04/opencv-python-color-detection/
# usage: python anal.py --image 7


# import the necessary packages
import numpy as np
import argparse
import cv2

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "path to the image")
args = vars(ap.parse_args())

# load the image
image = cv2.imread("caps/" + args["image"] + ".png")



# define the list of boundaries

# boundaries = [
# # bgr order
# # shit, these are with flux on
# # don't put the shit outside the 255 dude
# 	([235,150,180],[255,170,200]), # purple
# 	([15,55,95],[115,175,235]), # brown
# 	([230,140,40],[240,150,60]), # blue
# 	# ([52,52,52],[67,67,67]), # gray
# ]

boundaries = [
	# bgr order
	# shit, these are with flux on
	# don't put the shit outside the 255 dude

	# ([235,150,180],[255,170,200]), # purple
	([65,105,150],[70,135,190]), # brown
	([200,110,10],[255,255,185]) # blue
	# ([52,52,52],[67,67,67]), # gray
]


# loop over the boundaries
for (lower, upper) in boundaries:
	# create NumPy arrays from the boundaries
	lower = np.array(lower, dtype = "uint8")
	upper = np.array(upper, dtype = "uint8")

	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(image, lower, upper)
	output = cv2.bitwise_and(image, image, mask = mask)

	# show the images
	cv2.imshow("images", np.hstack([image, output]))
	cv2.waitKey(0)

objects = ["zone", "kanye", "bumper"]
obj = 0
# loop over the boundaries
for (lower, upper) in boundaries:
	# create NumPy arrays from the boundaries
	lower = np.array(lower, dtype = "uint8")
	upper = np.array(upper, dtype = "uint8")

	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(image, lower, upper)
	# print mask
	# print np.transpose(np.where(mask>0))
	one = 0
	two = 0
	count = 0
	for item in np.transpose(np.where(mask>0)):
		one += item[0]
		two += item[1]
		count += 1
	print "average (x,y) pixel coords for " + objects[obj] + ":"
	print two / count
	print one / count

	obj += 1
	output = cv2.bitwise_and(image, image, mask = mask)

	# show the images
	cv2.imshow("images", np.hstack([image, output]))
	# cv2.waitKey(0)