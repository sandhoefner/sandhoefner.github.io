# run with python 2 after HOURS of painful pip manip

import pyautogui
import time
import pyscreenshot as ImageGrab
import os
from random import randint
import numpy as np
import argparse
import cv2
import sys
import threading

sys.path.append('/usr/local/lib/python2.7/site-packages')
sys.path.append('/usr/local/lib/python2.7/dist-packages')
sys.path.append('/usr/local/lib/python3.5/dist-packages')
sys.path.append('/usr/local/lib/python3.4/dist-packages')


def getLocations(path=None):
	# load the image
	image = cv2.imread(path)

	# define the list of boundaries
	boundaries = [
		# bgr order
		# shit, these are with flux on
		# don't put the shit outside the 255 dude

		# ([235,150,180],[255,170,200]), # purple
		([15,55,95],[115,175,235]), # brown
		([230,140,40],[240,150,60]) # blue
		# ([52,52,52],[67,67,67]), # gray
	]

	# loop over the boundaries
	for (lower, upper) in boundaries:
		# create NumPy arrays from the boundaries
		lower = np.array(lower, dtype = "uint8")
		upper = np.array(upper, dtype = "uint8")

		# find the colors within the specified boundaries and apply the mask
		mask = cv2.inRange(image, lower, upper)
		output = cv2.bitwise_and(image, image, mask = mask)

		# show the images
		# cv2.imshow("images", np.hstack([image, output]))
		# cv2.waitKey(0)

	objects = ["zone", "kanye", "bumper"]
	obj = 0
	# this will be kanyeX kanyeY bumperX bumperY
	ret = []

	# loop over the boundaries
	for (lower, upper) in boundaries:
		# create NumPy arrays from the boundaries
		lower = np.array(lower, dtype = "uint8")
		upper = np.array(upper, dtype = "uint8")

		# find the colors within the specified boundaries and apply the mask
		mask = cv2.inRange(image, lower, upper)
		one = 0
		two = 0
		count = 0
		for item in np.transpose(np.where(mask>0)):
			one += item[0]
			two += item[1]
			count += 1
		ret.extend([two / count, one / count])

		obj += 1
		output = cv2.bitwise_and(image, image, mask = mask)

	return ret

def screenGrab():
	# pixels for chromium, 100% zoom, top of page scroll
	box = (660, 325, 1250, 920)
	im = ImageGrab.grab(box)
	im.save(os.getcwd() + '/full_snap__' + str(int(time.time())) + '.png', 'PNG')

def play():
	print getLocations('test.png')
	pyautogui.hotkey('winleft', '9')
	time.sleep(0.5)
	pyautogui.hotkey('ctrl', 't')
	pyautogui.typewrite('http://www.kanyezone.com/', interval = 0.05)
	pyautogui.press('enter')
	time.sleep(2)
	pyautogui.press('enter')
	tick()

def bestMove():
	if randint(0,1) is 0:
		return 'left'
	return 'right'

count = 0

# flutter
# def tick(count=0, direction='right'):
# 	pyautogui.press('space')
# 	if count % 10 is 0:
# 		screenGrab()
# 		pyautogui.keyUp(direction)
# 		direction = bestMove()
# 		pyautogui.keyDown(direction)
# 	count += 1
# 	time.sleep(0.01)
# 	tick(count, direction)

def tick(direction='right'):
	screenGrab()
	pyautogui.keyUp(direction)
	direction = bestMove()
	pyautogui.keyDown(direction)
	time.sleep(0.1)
	tick(direction)

play()

