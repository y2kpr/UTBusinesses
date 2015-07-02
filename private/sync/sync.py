#!/usr/bin/env python

import gspread
from oauth2client.client import GoogleCredentials
import os
from pymongo import MongoClient

DAPPS_SHEET_KEY = '1VdRMFENPzjL2V-vZhcc_aa5-ysf243t5vXlxC2b054g'
MONGODB_URL = os.getenv('MONGODB_URL', 'mongodb://127.0.0.1:3001/meteor')

def sync_sheet(worksheet, db):
    list_of_lists = worksheet.get_all_values()
    print list_of_lists
    row_nr = 0

    for cell_list in list_of_lists:
        print(cell_list)

        if row_nr > 0:
            name, description, url, contact, tags, license, platform, status, last_update = cell_list
            db.dapps.update({'name': name}, {'$set': {
                'description': description,
                'url': url,
                'contact': contact,
                'tags': tags,
                'license': license,
                'platform': platform,
                'status': status,
                'last_update': last_update}}, upsert=True)

        row_nr += 1

def main():
    credentials = GoogleCredentials.get_application_default()
    credentials = credentials.create_scoped(['https://spreadsheets.google.com/feeds'])
    gc = gspread.authorize(credentials)

    sh = gc.open_by_key(DAPPS_SHEET_KEY)
    worksheet = sh.get_worksheet(0)

    client = MongoClient(MONGODB_URL)
    db = client.get_default_database()
    db.dapps.ensure_index('name')

    sync_sheet(worksheet, db)

if __name__ == '__main__':
    print("starting sync")
    main()
