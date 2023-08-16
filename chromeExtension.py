from flask import Flask, jsonify, request
from googleStart import Tabs2Calendar
import time

app = Flask(__name__)
tabStartTime = None
tabEndTime = None
prev_url = ""

test = Tabs2Calendar("googleCalendar.json")

@app.route('/tabUrl', methods=['POST'])
def tabUrl():
    # resp_json = request.get_data()
    # params = resp_json.decode()
    # print("Printing Params")
    # print(params)
    # url = params.replace("url=", "")
    # print(url)

    return jsonify({'message' : 'test finished!'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)