from flask import Flask, jsonify, request
# import time

app = Flask(__name__)
# tabStartTime = {}
# tabEndTime = {}
prev_url = ""

@app.route('/tabUrl', methods=['POST'])
def tabUrl():
    resp_json = request.get_data()
    params = resp_json.decode()
    url = params.replace("url=", "")
    print(url)

    return jsonify({'message' : 'test finished!'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)