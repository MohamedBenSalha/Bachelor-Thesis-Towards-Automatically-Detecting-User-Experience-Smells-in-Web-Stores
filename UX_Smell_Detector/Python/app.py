import json
from flask import Flask, render_template, request
from flask_cors import CORS


from cnn import CNN

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

@app.route('/api/')
def index():
    return render_template("index.html")


@app.route('/api/check_default_image', methods=['POST'])
def check_default_image():
    decoded_request = request.get_data().decode('utf8').replace("'", '"')
    # Load the JSON to a Python list & dump it back out as formatted JSON
    json_request = json.loads(decoded_request)
    image_link = json_request["image_link"]
    print(image_link)
    cnn = CNN()
    prediction = cnn.predict_single_image(image_link)
    print(prediction)
    return prediction


if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
