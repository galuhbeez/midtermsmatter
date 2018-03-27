#! /usr/bin/python

import json


with open('legislators-current.json') as data_file:    
    data = json.load(data_file)

for i in data:
    print i['name']['official_full']

	

