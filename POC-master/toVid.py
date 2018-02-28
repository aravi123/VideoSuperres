import cv2
import glob


def vid(string):
	img=cv2.imread('OutputFrames/run0.jpg')
	height , width =  img.shape[:2]
	fourcc = cv2.VideoWriter_fourcc(*'XVID')
	video = cv2.VideoWriter('../uploads/'+string+'_superres.avi',fourcc,20,(width,height))

	l=0
	for img in glob.glob("../POC-master/OutputFrames/*.jpg"):
	        l=l+1

	for i in range(0,l):
		img=cv2.imread('../POC-master/OutputFrames/run'+str(i)+'.jpg')
		video.write(img)

	video.release()
