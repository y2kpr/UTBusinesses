#!/usr/bin/env python

import gspread
from oauth2client.client import GoogleCredentials
import os
from pymongo import MongoClient

BUSINESSES_SHEET_KEY = 'qnWAfr4IxmZi-JPAhaCZ5L43ChAQWFh2QQSYXwVCkM'
MONGODB_URL = os.getenv('MONGODB_URL', 'mongodb://127.0.0.1:3001/meteor')

def sync_sheet(worksheet, db):
    db.businesses.drop()

    list_of_lists = worksheet.get_all_values()
    print list_of_lists
    row_nr = 0

    for cell_list in list_of_lists:
        print(cell_list)

        if row_nr > 0:
            name, description, founding_date, status, hiring_status, url, logo, founder, contact, tags, last_update, last_update_by = cell_list
            tags = [tag.strip() for tag in tags.split(',')]
            db.businesses.update({'name': name}, {'$set': {
                'description': description,
                'founding_date': founding_date,
                'status': status,
                'hiring_status': hiring_status,
                'url': url,
                'logo': logo,
                'founder': founder,
                'contact': contact,
                'tags': tags,
                'last_update': last_update,
                'last_update_by': last_update_by}}, upsert=True)

        row_nr += 1

def main():
    credentials = GoogleCredentials.get_application_default()
    credentials = credentials.create_scoped(['https://spreadsheets.google.com/feeds'])
    gc = gspread.authorize(credentials)

    sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1AqnWAfr4IxmZi-JPAhaCZ5L43ChAQWFh2QQSYXwVCkM/edit#gid=0')
    worksheet = sh.get_worksheet(0)

    client = MongoClient(MONGODB_URL)
    db = client.get_default_database()
    db.businesses.ensure_index('name')

    sync_sheet(worksheet, db)

if __name__ == '__main__':
    print("starting sync")
    main()
