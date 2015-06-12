# State of the DApps

Lists of all Ethereum DApps known to mankind.

Authorative source: https://docs.google.com/spreadsheets/d/1VdRMFENPzjL2V-vZhcc_aa5-ysf243t5vXlxC2b054g/edit?usp=sharing

This is a service provided by [EtherCasts](http://ethercasts.com)

## Development

### Meteor web application

Ensure you have [Meteor](https://www.meteor.com/install) installed.

To run the app:

    $ cd app
    $ meteor

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the app running.

## Sync tool

Install the Python requirements:

    $ pip install -r requirements.txt

Setup an OAuth2 key for the Google Sheets synchroniztion:

https://gspread.readthedocs.org/en/latest/oauth2.html

Sync:

    $ GOOGLE_APPLICATION_CREDENTIALS=/path/to/google-client-id.json MONGODB_URL=mongodb://127.0.0.1:3001/meteor ./sync.py

## License

Released under the MIT License.
