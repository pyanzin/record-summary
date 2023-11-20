#!/bin/bash

# Navigate to the Flask server directory and set up the environment
cd server
py -3 -m venv venv
source venv/Scripts/activate

# Install Flask
pip install -r requirements.txt

export FLASK_APP=backend.py

# Start Flask app in the background
flask run &

# Deactivate the Python virtual environment
deactivate

# Wait for the Flask app to start
sleep 5

cd ..

# Run the curl command to upload the file
curl -X POST -F "file=@./record.csv" http://localhost:5000/delineation

# Navigate to the Angular app directory
cd ./client/record-summary

# Install dependencies and run Angular app
npm install -g @angular/cli
npm install
ng serve &

# Wait for the Angular app to compile and start serving
sleep 60

# Open the Angular app in browser
 python -m webbrowser http://localhost:4200 &
