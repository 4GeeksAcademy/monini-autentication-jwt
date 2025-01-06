"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():

   request_body = request.get_json()
   print(request_body)
   user = User.query.filter_by(email=request_body["email"]).first()
   if user:
      return jsonify ({"msg":"User already registered"}), 400
   new_user = User(email=request_body["email"], password=request_body["password"])
   db.session.add(new_user)
   db.session.commit()

   return jsonify({"msg":"User created"}), 200


@api.route('/login', methods=['POST'])
def login():
   request_body = request.get_json()
   email = request_body.get("email")
   password= request_body.get("password")

   if not email or not password:
      return jsonify({"msg": "all fields are qrequired"})
   user = User.query.filter_by(email=email, password=password).first()

   if not user:
      return jsonify ({"msg":"Email and password are incorrect"})
   
   token = create_access_token(identity=user.email)

   return jsonify({"msg":"logged", "token": token})

@api.route("/private", methods=["GET"])
@jwt_required()
def validate_token():
   token_email = get_jwt_identity()
   print(token_email)
   user = User.query.filter_by(email = token_email).first()

   if user is None: 
      return jsonify({"msg": "User not found"}), 404
   
   return jsonify({"msg":"User authenticated"}), 200
