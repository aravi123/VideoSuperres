import zerorpc
import os
import toVid
import toFrame
from bidir import bidir as b
from deep_cnn import EEDS as d
from shallow_cnn import EES as s



class MyRPC(object):
    def Mainfn(self, name):
		
		set=name.split('/')
		name=set[0]
		token=set[1]

		toFrame.fra(name)

		if(token=="BRCNN"):
			b.EES_predict()
		elif(token=="Deep"):
			d.EEDS_predict()
		elif(token=="Shallow"):
			print(' IN shallow if')
			print(dir(s))
			s.EES_predict()
		print('Ending RPC')
		toVid.vid(name)
		c = zerorpc.Client()
		c.connect("tcp://127.0.0.1:4342")
		c.videoFormat(name)


if __name__ == '__main__':
    s = zerorpc.Server(MyRPC())
    s.bind("tcp://0.0.0.0:4242")
    s.run()