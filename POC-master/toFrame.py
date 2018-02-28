import cv2
import sys
import os

def fra(string):
	print("Inside toFrame===================================")
	print os.listdir('../uploads/')
	print(type(string))
	print string
	cap = cv2.VideoCapture('../uploads/' + str(string))
	i=0
	ret,img = cap.read()
	h,w=img.shape[:2]
	print 'start', ret
	while ret:
		img=cv2.resize(img,(w*2,h*2))
		cv2.imwrite('../POC-master/InputFrames/run'+str(i)+'.jpg',img)
		i = i+1
		ret,img = cap.read()
	print('end')
	cap.release()
