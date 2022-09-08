import re

from flask import Flask, render_template, request, jsonify
from flask_api import status
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from fill_database import fill_database_products

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client['bachelorarbeit']
db_name = "bachelorarbeit"
fill_database_products(client, db_name, "products")
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


@app.route('/api/')
def index():
    return render_template("index.html")



@app.route('/api/contact', methods=['POST'])
def contact():
    # Get userdata for login
    if request.method == 'POST':
        body = request.json
        print(body)
        username = body['username']
        email = body['email']
        message = body['message']
        first_number = body['first_number']
        second_number = body['second_number']
        sum = body['sum']
        if sum != (first_number + second_number):
            return "Provided sum is not correct", status.HTTP_400_BAD_REQUEST
        if not re.match("^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+\.[a-z]{1,3}$", email):
            return "Provided email is not correct", status.HTTP_400_BAD_REQUEST

        if not message.strip():
            return "Provided message is not correct", status.HTTP_400_BAD_REQUEST

        if not username.strip():
            return "Provided user is not correct", status.HTTP_400_BAD_REQUEST

        return "We will contact you as soon as possible, thank you for reaching out!", status.HTTP_200_OK


@app.route('/api/users', methods=['POST'])
def data():
    if request.method == 'POST':
        body = request.json
        userName = body['userName']
        password = body['password']
        email = body['email']
        firstName = body['firstName']
        lastName = body['lastName']

        if not re.match("^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+\.[a-z]{1,3}$", email):
            return "Provided email is not correct", status.HTTP_400_BAD_REQUEST

        if len(password) < 8:
            return "Provided passwort is too short ", status.HTTP_400_BAD_REQUEST

        if not userName.strip():
            return "Provided user name is not correct", status.HTTP_400_BAD_REQUEST

        if not firstName.strip():
            return "Provided first name is not correct", status.HTTP_400_BAD_REQUEST

        if not lastName.strip():
            return "Provided last name is not correct", status.HTTP_400_BAD_REQUEST

        db['users'].insert_one({
            'userName': userName,
            'password': generate_password_hash(password),
            'email': email,
            'firstName': firstName,
            'lastName': lastName,
        })
        return "User added successfully", status.HTTP_200_OK



@app.route('/api/login', methods=['POST'])
def loginData():
    if request.method == 'POST':
        body = request.json
        username = body['username']
        passwort = body['password']
        data = db['users'].find_one({'userName': username})
        if data:
            password = data['password']
            checked_password = check_password_hash(password, passwort)
            if checked_password:
                return 'User was logged in successful', status.HTTP_200_OK
        return 'Login failed', status.HTTP_400_BAD_REQUEST


@app.route('/api/products', methods=['GET'])
def productsData():
    if request.method == 'GET':
        allData = db['products'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            modelName = data['modelName']
            color = data['color']
            productType = data['productType']
            brand = data['brand']
            price = data['price']
            serialnumber = data['serialnumber']
            dataDict = {
                'id': str(id),
                'title': title,
                'modelName': modelName,
                'color': color,
                'productType': productType,
                'brand': brand,
                'price': price,
                'serialnumber': serialnumber
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


@app.route('/api/products/single/<string:id>', methods=['GET'])
def oneproductData(id):
    print(id)
    if request.method == 'GET':
        all_data = db['products'].find({'_id': id})
        for data in all_data:
            id = data['_id']
            title = data['title']
            modelName = data['modelName']
            color = data['color']
            productType = data['productType']
            brand = data['brand']
            price = data['price']
            serialnumber = data['serialnumber']
            dataDict = {
                'id': str(id),
                'title': title,
                'modelName': modelName,
                'color': color,
                'productType': productType,
                'brand': brand,
                'price': price,
                'serialnumber': serialnumber
            }

        print(dataDict)

        return dataDict


@app.route('/api/products/product-type/<string:productType>', methods=['GET'])
def productCategory(productType):
    if request.method == 'GET':
        allData = db['products'].find({'productType': productType})
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            modelName = data['modelName']
            color = data['color']
            productType = data['productType']
            brand = data['brand']
            price = data['price']
            serialnumber = data['serialnumber']
            dataDict = {
                'id': str(id),
                'title': title,
                'modelName': modelName,
                'color': color,
                'productType': productType,
                'brand': brand,
                'price': price,
                'serialnumber': serialnumber
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


@app.route('/api/products/title/<string:modelName>', methods=['GET'])
def productsByModelName(modelName):
    if request.method == 'GET':
        allData = db['products'].find({'modelName': modelName})
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            modelName = data['modelName']
            color = data['color']
            productType = data['productType']
            brand = data['brand']
            price = data['price']
            serialnumber = data['serialnumber']
            dataDict = {
                'id': str(id),
                'title': title,
                'modelName': modelName,
                'color': color,
                'productType': productType,
                'brand': brand,
                'price': price,
                'serialnumber': serialnumber
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


@app.route('/api/products/brand/<string:brand>', methods=['GET'])
def productBrand(brand):
    if request.method == 'GET':
        allData = db['products'].find({'brand': brand})
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            modelName = data['modelName']
            color = data['color']
            productType = data['productType']
            brand = data['brand']
            price = data['price']
            serialnumber = data['serialnumber']
            dataDict = {
                'id': str(id),
                'title': title,
                'modelName': modelName,
                'color': color,
                'productType': productType,
                'brand': brand,
                'price': price,
                'serialnumber': serialnumber
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)





@app.route('/api/changePassword', methods=['PUT'])
def changePassword():
    if request.method == 'PUT':
        body = request.json
        passwort = body['password']
        token = body['token']
        email = body['email']
        print(email)
        data = db['users'].find_one({'email': email})
        print(data)
        idToUpdate = data['_id']
        db['users'].delete_one({'_id': ObjectId(idToUpdate)})
        db['users'].insert_one({
            'userName': data['userName'],
            'password': generate_password_hash(passwort),
            'email': email,
            'firstName': data['firstName'],
            'lastName': data['lastName'],
        })
        print("Password was updated!")
        status = True
    return jsonify({'status': status})


@app.route('/api/order', methods=['POST'])
def createOrder():
    if request.method == 'POST':
        body = request.json
        firstName = body['name']
        lastName = body['lastName']
        land = body['land']
        adresse = body['adresse']
        stadt = body['stadt']
        plz = body['postleitzahl']
        telnummer = body['telefonnummer']
        email = body['email']
        orderNotes = body['orderNotes']
        total = body['total']
        orderdProducts = body['orderdProducts']
        print(firstName, lastName, land, adresse, stadt, telnummer, email, orderNotes, total, orderdProducts)
        db['order'].insert_one({
            'firstName': firstName,
            'lastName': lastName,
            'land': land,
            'adresse': adresse,
            'stadt': stadt,
            'plz': plz,
            'telefonnummer': telnummer,
            'email': email,
            'orderNotes': orderNotes,
            'total': total,
            'orderdProducts': orderdProducts,
        })
        print("Bestellung wurde aufgegeben!")
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'firstName': firstName,
            'lastName': lastName,
            'land': land,
            'adresse': adresse,
            'stadt': stadt,
            'plz': plz,
            'telnummer': telnummer,
            'email': email,
            'orderNotes': orderNotes,
            'total': total,
            'orderdProducts': orderdProducts,
        })


if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
