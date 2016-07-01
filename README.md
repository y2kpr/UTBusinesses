# UT Businesses

A webapp to have a list of all businesses started by UT (University of Texas) students

Authorative source: https://docs.google.com/spreadsheets/d/1AqnWAfr4IxmZi-JPAhaCZ5L43ChAQWFh2QQSYXwVCkM/edit#gid=0

This is an application that has been initially cloned from https://github.com/EtherCasts/state-of-the-dapps. Thanks EtherCasts!

## Development

### Meteor web application

Ensure you have [Meteor](https://www.meteor.com/install) installed.

To run the app:

    $ meteor

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the app running.

## Sync tool

Go the the tool directory:

    $ cd private/sync

Install the Python requirements:

    $ pip install -r requirements.txt

Setup an OAuth2 key for the Google Sheets synchroniztion:

https://gspread.readthedocs.org/en/latest/oauth2.html

Sync:

    $ GOOGLE_APPLICATION_CREDENTIALS=/path/to/google-client-id.json MONGODB_URL=mongodb://127.0.0.1:3001/meteor ./sync.py

## License

Released under the MIT License.
