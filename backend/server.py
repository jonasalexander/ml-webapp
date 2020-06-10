from flask import Flask, Response, request
import random
import string
from pathlib import Path
import os

ID_LEN = 30
DATA_PATH = Path("data/")

app = Flask(__name__)


@app.route("/", methods=["POST"])
def hello_world():
    model_id = "".join(random.choices(string.ascii_uppercase + string.digits, k=ID_LEN))

    if not DATA_PATH.exists():
        os.mkdir(DATA_PATH)

    f = request.files["file"]
    model_data_path = model_id + ".csv"
    f.save(DATA_PATH / model_data_path)

    response = Response(model_id, mimetype="text/text")
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    return response
