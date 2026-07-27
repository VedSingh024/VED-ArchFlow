# ==========================================================
# VED ARCHFLOW V10
# MAIN BACKEND CONTROLLER
# ==========================================================

from flask import (
    Flask,
    request,
    jsonify,
    send_from_directory
)

from flask_cors import CORS

from pathlib import Path

import traceback
import subprocess
import sys


# ==========================================================
# AI
# ==========================================================

from AI_ENGINE.image_processor import ImageProcessor
from AI_ENGINE.floorplan_analyzer import FloorplanAnalyzer
from AI_ENGINE.wall_detector import WallDetector
from AI_ENGINE.room_detector import RoomDetector


# ==========================================================
# 3D ENGINE
# ==========================================================

from THREE_D_ENGINE.house_builder import HouseBuilder
from THREE_D_ENGINE.export_model import ModelExporter


# ==========================================================
# FLASK
# ==========================================================

app = Flask(__name__)

CORS(app)


# ==========================================================
# PATHS
# ==========================================================

BASE_DIR = Path(__file__).parent

UPLOAD_FOLDER = BASE_DIR / "uploads" / "floorplans"

OUTPUT_FOLDER = BASE_DIR / "output" / "models"

BLENDER_SCRIPT = (
    BASE_DIR
    / "THREE_D_ENGINE"
    / "blender_generator.py"
)

BLENDER_EXE = Path(
    r"E:\blender\blender.exe"
)

UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)

OUTPUT_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)


# ==========================================================
# AI INITIALIZATION
# ==========================================================

image_processor = ImageProcessor()

analyzer = FloorplanAnalyzer()

wall_detector = WallDetector()

room_detector = RoomDetector()

house_builder = HouseBuilder()

exporter = ModelExporter()


# ==========================================================
# HOME
# ==========================================================

@app.route("/")
def home():

    return jsonify({

        "status":"VED ARCHFLOW V10",

        "server":"running",

        "version":"10.0"

    })


# ==========================================================
# MODEL SERVER
# ==========================================================

@app.route("/models/<path:filename>")
def serve_model(filename):

    return send_from_directory(

        OUTPUT_FOLDER,

        filename,

        as_attachment=False

    )