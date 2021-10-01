#!/usr/bin/env python3

import requests
import re
import json

FLAG_DB_URI='https://github.com/AlfieGoldson/flags/tree/master/flags/flags-iso/flat/64'
OUTFILE="../src/util/flags.json"

res = requests.get(FLAG_DB_URI)
txt = res.text

x = list(dict.fromkeys(re.findall('[A-Z]+(?=\.png)', txt)))
print(len(x))

with open(OUTFILE, 'w') as f:
	f.write(json.dumps(x))