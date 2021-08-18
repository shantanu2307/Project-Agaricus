import pandas as pd
import numpy as np
import keras
import sys
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json 
import tensorflow as tf
import json

     

	


market_list=['Asandh',
     'Attabira',
     'Badnawar',
     'Balugaon',
     'Barwala',
     ' Bhadrak',
     'Bhuna',
     'Bhuntar',
     'Chamba',
     'Chamkaur Sahib',
     'Cherthalai',
     'Dhanotu (Mandi)',
     'Dharamkot',
      'Dhenkanal',
     'Dhuri',
     'Digapahandi',
      'Dudhansadhan',
      'Fatehabad',
     'Firozepur City',
     'Garobadha',
     'Godabhaga',
     'Gosala',
     'Gunpur',
     'Gunupur(Maniguda)',
     'Gurdaspur',
     'Hamirpur',
     'Jalandhar City',
     'Kangra',
     ' Kangra(Baijnath)',
     'Kangra(Jassour)',
     'Kangra(Nagrota Bagwan)',
     'Kantabaji',
     'Kathua',
     'Katpadi(Uzhavar Santhai)',
     'Kesinga',
     'Kot ise Khan',
     'Kottarakka',
     'Machhiwara',
     'Malout',
     'Mohindergarh',
     'Nahan',
     'Nakodar',
     'Naraingarh',
     'Narwal Jammu (F&V)',
     'Nawan Shahar(Subzi Mandi)',
     'Nawanshahar',
     'Nobarangpur',
     'Palampur',
     'Paonta Sahib',
     'Pataudi',
     'Pathankot',
     'Phillaur(Apra Mandi)',
     'Quadian',
     'Rajouri (F&V)',
     'Rajpura',
     'Rishikesh',
     'Roorkee',
     'Samalkha',
     'Samana',
     'Samba',
     'Sambalpur',
     'Shahdara',
     'Sirhind',
     'Una',
     'kalanwali']    
# print(sys.argv)
date=input()
date=json.loads(date)

month=date["date"][5:7]
year= date["date"][:4] 



predict_input=np.zeros(67)
predict_input[0]=month
predict_input[1]=year
predict_input[market_list.index(date["market"])+2]=1
predict_input=np.array([predict_input])
# print(predict_input)
   
json_file=open('../server/python-script/model.json','r')
loaded_model_json=json_file.read()
json_file.close()
loaded_model=model_from_json(loaded_model_json)
loaded_model.load_weights('../server/python-script/model.h5')
#model = tf.keras.models.load_model('/mushroom_model.h5')

y = loaded_model.predict(predict_input)
# print(y)

 
	

	#print(out)

"""if _name_ == '_main_':
	try :
		main()
	except Exception as e :
		print('error', str(e))"""