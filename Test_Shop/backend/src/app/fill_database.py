import json
from pymongo import MongoClient
from pymongo.write_concern import WriteConcern


def fill_database_products(db_client: MongoClient, database_name: str, collection_name: str):
    client = db_client
    # if db and collections do not exist, they will be created.
    db = client[database_name]
    collection = db[collection_name]

    with open('products.json', encoding="utf-8") as f:
        file_data = json.load(f)

    # WriteConcern(w=0): to avoid duplicates
    collection.with_options(write_concern=WriteConcern(w=0)).insert_many(file_data, ordered=False)
