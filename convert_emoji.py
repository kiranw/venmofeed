import csv
with open('venmo_scraper_test.csv', 'rb') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=',')
	for row in spamreader:
		row[8] = row[8].decode('unicode-escape')
		print(','.join(row))