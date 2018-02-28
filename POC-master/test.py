import os
import toVid
import toFrame
from bidir import bidir as b
from deep_cnn import EEDS as d
from shallow_cnn import EES as s

token="Deep.mp4/1"
set=token.split('/')
print set
token=set[0]
print token
#toFrame.fra(name)

# if(token=="BRCNN"):
# 	b.EES_predict()
# elif(token=="Deep"):
# 	d.EEDS_predict()
# elif(token=="Shallow"):
# 	print(' IN shallow if')
# 	print(dir(s))
# 	s.EES_predict()
# print('Ending RPC')
# toVid.vid(name)