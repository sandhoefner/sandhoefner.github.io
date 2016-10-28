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
		([200,110,10],[255,180,90]) # blue
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
		# don't divide by 0
		count = 0.0000001
		for item in np.transpose(np.where(mask>0)):
			one += item[0]
			two += item[1]
			count += 1
		ret.extend([two / count, one / count])

		obj += 1
		output = cv2.bitwise_and(image, image, mask = mask)

	return ret

def screenGrab(count):
	# pixels for chromium, 100% zoom, top of page scroll
	# left top right bottom I think
	box = (660, 325, 1250, 920)
	im = ImageGrab.grab(box)
	im.save(os.getcwd() + '/caps/' + str(count) + '.png', 'PNG')

def play():
	pyautogui.hotkey('winleft', '9')
	time.sleep(0.5)
	pyautogui.hotkey('ctrl', 't')
	pyautogui.typewrite('http://www.kanyezone.com/', interval = 0.05)
	pyautogui.press('enter')
	time.sleep(2)
	pyautogui.press('enter')
	tick()

def bestMove(oldPath, newPath):
	if oldPath is not None and newPath is not None:
		newLocations = getLocations(newPath)
		oldLocations = getLocations(oldPath)
		# kanyeX kanyeY bumperX bumperY
		# frequently fails to find bumper
		print oldLocations
		print newLocations
		print oldPath
		print newPath
		kanyeChange = [newLocations[0] - oldLocations[0], newLocations[1] - oldLocations[1]]
		lookAhead = 0
		kanyeNext = [newLocations[0] + lookAhead*kanyeChange[0], newLocations[1] + lookAhead*kanyeChange[1]]
		bumperX = newLocations[2]
		bumperY = newLocations[3]

		# this could all be wrong
		kanyeLeft, kanyeUp = True, True
		if kanyeNext[0] - bumperX > 0:
			kanyeLeft = False
		if kanyeNext[1] - bumperY > 0:
			kanyeUp = False


		if bumperX < 295 and bumperY > 295:
			bumperQuadrant = 1
			if kanyeLeft and not kanyeUp:
				return 'space'
			if kanyeLeft or kanyeUp:
				return 'left'

		elif bumperX > 295 and bumperY > 295:
			bumperQuadrant = 2
			if not kanyeLeft and not kanyeUp:
				return 'space'
			if kanyeLeft or not kanyeUp:
				return 'left'

		elif bumperX > 295 and bumperY < 295:
			bumperQuadrant = 3
			if kanyeUp and not kanyeLeft:
				return 'space'
			if kanyeLeft or kanyeUp:
				return 'left'

		elif bumperX > 295 and bumperY > 295:
			bumperQuadrant = 4
			if kanyeLeft and kanyeUp:
				return 'space'
			if kanyeLeft or not kanyeUp:
				return 'left'


	return 'right'


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

def tick(direction='right', count=0):
	screenGrab(count)
	if direction != "space":
		pyautogui.keyUp(direction)
	oldPath, newPath = None, None
	if count > 1:
		# shouldn't be getcwding every time
		oldPath = os.getcwd() + '/caps/' + str(count - 1) + '.png'
		newPath = os.getcwd() + '/caps/' + str(count) + '.png'
	direction = bestMove(oldPath, newPath)
	if direction != 'space':
		pyautogui.keyDown(direction)
		# time.sleep(0.001)
	else:
		pyautogui.press('space')
	count += 1
	tick(direction, count)

play()

