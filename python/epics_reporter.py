#!/usr/bin/python

import os
import time
from beebotte import *
from epics import caget, caput
import conf

csvfile = open("ECL-envdata.csv", "a", 0)  # unbuffered
resource = {}
bbt = BBT(conf._accesskey, conf._secretkey)

header = '#timestamp;'
for s in conf._sector:
  header = header + 'S'+s.upper()+':TEMP01;'
  header = header + 'S'+s.upper()+':TEMP02;'
  header = header + 'S'+s.upper()+':TEMP03;'
  header = header + 'S'+s.upper()+':HUM;'
  
header = header + '\n'
csvfile.write(header)
#print header
  
def run():
  print "Starting System data reading and submission to Beebotte"

  while True:

    line = ''
    line = str(int(time.time()))
    line = line + ';'

    for s in conf._sector:

       val = caget('S'+s.upper()+':TEMP01')
       val = round(val,2)
       try:
          bbt.write('sector'+s.upper(), 'temp01', val)
       except:
          print "Error Writing on BeeBotte"
       line = line + str(val) + ';'

       val = caget('S'+s.upper()+':TEMP02')
       val = round(val,2)
       try:
          bbt.write('sector'+s.upper(), 'temp02', val)
       except:
          print "Error Writing on BeeBotte"
       line = line + str(val) + ';'

       val = caget('S'+s.upper()+':TEMP03')
       val = round(val,2)
       try:
          bbt.write('sector'+s.upper(), 'temp03', val)
       except:
          print "Error Writing on BeeBotte"
       line = line + str(val) + ';'

       val = caget('S'+s.upper()+':RH')
       val = round(val,1)
       try:
          bbt.write('sector'+s.upper(), 'hum', val)
       except:
          print "Error Writing on BeeBotte"
       line = line + str(val) + ';'

    line = line + '\n'
    csvfile.write(line)
    #print line

    #Sleep some time
    time.sleep(conf._period)

run()
