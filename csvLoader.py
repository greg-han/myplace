from elasticsearch import helpers, Elasticsearch
import csv

es = Elasticsearch()

with open('./transcripts.csv') as f:
     reader = csv.DictReader(f)
     helpers.bulk(es, reader, index='myplace', doc_type='text')


