from flask import Flask, Response, request
import random
import string
from pathlib import Path
import os
import json

ID_LEN = 30
DATA_PATH = Path("data/")
FRONTEND_URL = "http://localhost:3000"
NUM_PREVIEW_ROWS = 10

app = Flask(__name__)


@app.route("/create", methods=["POST"])
def create_model():

    if not DATA_PATH.exists():
        os.mkdir(DATA_PATH)

    f = request.files["file"]

    while True:
        model_id = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=ID_LEN)
        )
        model_data_path = model_id + ".csv"
        full_path = DATA_PATH / model_data_path
        if not full_path.exists():
            break

    f.save(full_path)

    model_name = request.form["modelName"]
    # TODO: Add model_name to separate metadata lookup store for name and id,
    # time created, etc.
    # (and eventually username, etc)

    response_data = {"model_id": model_id, "model_name": model_name, "csv_data": []}
    with open(full_path, "r") as f:
        for i, row in enumerate(f):
            if i > NUM_PREVIEW_ROWS:
                break
            response_data["csv_data"].append(row.split(","))

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
