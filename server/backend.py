from flask import Flask, jsonify
from flask import Flask, request
from flask_cors import CORS
import csv

heartbeats = []
app = Flask(__name__)

CORS(app)

@app.route('/delineation', methods=['POST'])
def upload():
    file = request.files['file']
    filename = 'uploads/origin.csv'
    file.save(filename)

    build_heartbeats(filename)
    return 'Success', 200

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(heartbeats)

def build_heartbeats(filename):
    beats = []
    with open(filename) as csv_file:
        reader = csv.DictReader(csv_file, fieldnames=['type', 'start', 'end', 'tags'])
        for row in reader:
            if row['type'] == 'QRS':
                start = int(row['start'])
                end = int(row['end'])
                mid = (start + end) / 2.0
                beats.append(mid)
    
    result = [0 for i in range(24 * 60)]
    
    for beat in beats:
        minute = int(beat // (60 * 1000))
        if len(result) > minute:
            result[minute] += 1
    global heartbeats
    heartbeats = result