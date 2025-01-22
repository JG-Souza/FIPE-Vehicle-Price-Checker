from flask import Flask

app = Flask(__name__)



from app.controllers import routes

from app.services import api_service