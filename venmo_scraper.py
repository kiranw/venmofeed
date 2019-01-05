# -*- coding: utf-8 -*-
import urllib, json 
import csv
import time



f =  open('venmo_scraper_1.csv', 'a')
writer = csv.writer(f)

iterations = 100
while iterations>0:
	url = urllib.urlopen("https://venmo.com/api/v5/public")
	json_object = json.loads(url.read().decode())
	output_array = []
	try:
	    json_array = json_object['data']
	    for item in json_array:
	    	output_array = []
	    	# print item["message"]
	    	# print item["message"].encode('unicode-escape').decode('unicode-escape')
	    	# print("\n")
	    	# if "\\" in item["message"]:
	    	# 	print item["message"]
	    	# 	new_message = [i.decode('utf-8') for i in item['message'].split('\\')]
	    	# 	print new_message
	        output_array = [ item['story_id'],
	        	item['updated_time'],
	        	item['actor']['name'],
	            item['actor']['picture'],
	            item['actor']['id'],
	            item['transactions'][0]['target']['name'],
	            item['transactions'][0]['target']['picture'],
	            item['transactions'][0]['target']['id'],
	            item["message"].encode('unicode-escape').decode('unicode-escape'),
	            item['type']]
	     	# print(output_array)

	     	filters = [
				"Rent",
				"deposit",
				"Utilities",
				"Comcast",
				"Xfinity",
				"Wifi",
				"Water",
				"Gas",
				"Airbnb",
				"Hotel",
				"splitwise.com",
				"YoutubeRed",
				"Spotify",
				"Family plan",
				"Electric",
				"Heat",
				"AC ",
				"Air conditioning",
				"Electricity",
				"Lights",
				"💻💸",
				"Fee",
				"Renters",
				"Broker",
				"Apt",
				"Apartment",
				"Bill",
				"Utility",
				"1F50C",
				"1F4B8",
				"🔌",
				"⚡🔌💡💸"]
	     	filtered = False
	     	for i in filters:
	     		if i.lower().decode('unicode-escape') in unicode(item["message"]).lower():
	     			# print i,item["message"]
	     			filtered = True
	     	if filtered:
	     		# writer.writerows([unicode(s, "utf-8") for s in output_array])
	     		# output_array = [s.encode("utf-8") for s in output_array]
	     		print ",".join([s.replace(',',' ') for s in output_array])
	     		# writer.writerows(output_array)
	     		# print output_array
	     		# writer.writerows(output_array)	
	except (TypeError, KeyError) as e:
	    pass
	time.sleep(5)
	iterations -= 1
