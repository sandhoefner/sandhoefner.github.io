# run with python3

import pyautogui
import time
import pyscreenshot as ImageGrab
import os
from random import randint

def screenGrab():
	# pixels for chromium, 100% zoom, top of page scroll
	box = (660, 325, 1250, 920)
	im = ImageGrab.grab(box)
	im.save(os.getcwd() + '/full_snap__' + str(int(time.time())) + '.png', 'PNG')

def play():
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

def tick():
	thisMove = bestMove()
	pyautogui.keyDown(thisMove)
	screenGrab()
	time.sleep(1)
	pyautogui.keyUp(thisMove)
	tick()

play()