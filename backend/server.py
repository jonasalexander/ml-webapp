from flask import Flask, Response, request
import random
import string
from pathlib import Path
import os
import json

ID_LEN = 30
DATA_PATH = Path("data/")
FRONTEND_URL = "http://localhost:3000"
NUM_PREVIEW_ROWS = 5

app = Flask(__name__)


@app.route("/create", methods=["POST"])
def create_model():
    model_id = "".join(random.choices(string.ascii_uppercase + string.digits, k=ID_LEN))

    if not DATA_PATH.exists():
        os.mkdir(DATA_PATH)

    f = request.files["file"]
    model_data_path = model_id + ".csv"
    full_path = DATA_PATH / model_data_path
    f.save(full_path)

    response_data = {"model_id": model_id}
    with open(full_path, "r") as f:
        response_data["csv_data"] = [f.readline().split(",") for _ in range(NUM_PREVIEW_ROWS)]

    response = Response(json.dumps(response_data), mimetype="application/json")
    response.headers["Access-Control-Allow-Origin"] = FRONTEND_URL
    return response

@app.route("/<model_id>")
def predict(model_id):
    response = Response(model_id, mimetype="text/text")
    response.headers["Access-Control-Allow-Origin"] = FRONTEND_URL
    return response

if __name__ == "__main__":
    app.run(debug=True)