echo "Ensure meteor is already running before trying to resync."
echo "Make sure your own private keyfile is listed in this script."
export MONGODB_URL=mongodb://127.0.0.1:3001/meteor
export GOOGLE_APPLICATION_CREDENTIALS=./private/sync/state-of-dapps-fb5082e1ce4e.json
./private/sync/sync.py
