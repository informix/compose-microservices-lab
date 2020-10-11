import os
os.system('pip install paho-mqtt')
from datetime import datetime
import paho.mqtt.client as mqtt
import json
from time import sleep
import random
from random import randrange


if os.environ.get('BROKER'):
   broker=os.environ['BROKER']
else: 
   broker="msgbroker"

if os.environ.get('BROKER_PORT'):
   port=int(os.environ['BROKER_PORT'])
else: 
   port=1883

if os.environ.get('BROKER_TOPIC'):
   topic=os.environ['BROKER_TOPIC']
else: 
   topic='datagen/datagen1'

print ("BROKER: ", broker)
print ("BROKER_PORT: ", port)
print ("BROKER_TOPIC: ", topic)

scale1=0.5;
scale2=2.5;
scale3=30;
POKE_SKIP_RANGE=20
POKE_SKIP=randrange(POKE_SKIP_RANGE)



def generateValue(scale):
       return random.random() * scale * 2 -scale;

def on_publish(client, userdata, mid):
    print("MID Published: ", mid)
    if mid == 0:
        client.disconnect()


client = mqtt.Client(protocol=mqtt.MQTTv31)
client.on_publish = on_publish
client.connect(broker, port)
client.loop_start()

while True:
    # Generate data
    ct = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-1]
    x=abs(generateValue(scale1));               
    y=abs(generateValue(scale1));               
    z=abs(generateValue(scale1));  

    if ( y > z) :
       y=z;
    if ( x > y) :
       x=y;

    # Publish Data
    msgstr = '{  "id":"1", "tstamp" : "%s",  "json_data" : { "x": %f, "y": %f, "z" : %f }  }'  % (ct,x,y,z) 
    (result, mid) = client.publish(topic, msgstr, qos=1)
    if result != mqtt.MQTT_ERR_SUCCESS:
        print("Error Publish: ", )


    print ( "X: %f,  scale: %f" % (x,scale1))
    # Randomize Data Scale1
    if (scale1 > 0.5) :                         
      drop = min(0.1, scale1/5.0);             
      scale1 = max(0.5, scale1-drop);           
      print ("scale1-drop = %f" % (drop));           
    else:                                      
      if POKE_SKIP < 1:                       
         poke = randrange(5)             
         print ("scale1-poke= %d" % (poke));    
         scale1 += poke;                  
         POKE_SKIP=randrange(POKE_SKIP_RANGE)
      else:                                  
         POKE_SKIP -=1;                      

    # Randomize Data Scale2
    if (scale2 > 5) :                         
      drop = min(5, scale2/10.0);             
      scale2 = max(5, scale2-drop);           
      #print ("drop = %f" % (drop));           
    else:                                      
      if POKE_SKIP < 1:                       
         poke = randrange(5)             
         #print ("poke= %d" % (poke));    
         scale2 += poke;                  
         POKE_SKIP=randrange(POKE_SKIP_RANGE)
      else:                                  
         POKE_SKIP -=1;                      

    # Randomize Data Scale3
    if (scale3 > 10) :                         
      drop = min(10, scale3/50.0);             
      scale3 = max(10, scale3-drop);           
      #print ("drop = %f" % (drop));           
    else:                                      
      if POKE_SKIP < 1:                       
         poke = randrange(5)             
         #print ("poke= %d" % (poke));    
         scale2 += poke;                  
         POKE_SKIP=randrange(POKE_SKIP_RANGE)
      else:                                  
         POKE_SKIP -=1;                      



    #print ("POKE_SKIP = %d" % (POKE_SKIP));   
    #print ("Scale = %f" % (scale));        

    sleep (0.5)
                                    
client.loop_forever()     
