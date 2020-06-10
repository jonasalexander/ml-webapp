from flask import Flask, Response, request
import random
import string
from pathlib import Path
import os

ID_LEN = 30
DATA_PATH = Path("data/")
FRONTEND_URL = "http://localhost:3000"

app = Flask(__name__)


@app.route("/create", methods=["POST"])
def create_model():
    model_id = "".join(random.choices(string.ascii_uppercase + string.digits, k=ID_LEN))

    if not DATA_PATH.exists():
        os.mkdir(DATA_PATH)

    f = request.files["file"]
    model_data_path = model_id + ".csv"
    f.save(DATA_PATH / model_data_path)

    response = Response(model_id, mimetype="text/text")
    response.headers["Access-Control-Allow-Origin"] = FRONTEND_URL
    return response

@app.route("/<model_id>")
def predict(model_id):
    response = Response(model_id, mimetype="text/text")
    response.headers["Access-Control-Allow-Origin"] = FRONTEND_URL
    return response