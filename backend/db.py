import pymongo
from bson import ObjectId
import time
import os

import gridfs

# Connect to MongoDB
MONGO_URI = "mongodb://localhost:27017/"
client = pymongo.MongoClient(MONGO_URI)
db = client["datacleanse_ai"]
fs = gridfs.GridFS(db)

# Collections
users_col = db["users"]
logs_col = db["logs"]
files_col = db["files"]
keys_col = db["keys"]

def save_api_key(email, key):
    keys_col.update_one({"email": email}, {"$set": {"key": key}}, upsert=True)

def get_api_key(email):
    doc = keys_col.find_one({"email": email})
    return doc["key"] if doc else None

def get_db_users():
    return list(users_col.find({}, {"_id": 0}))

def save_user_to_db(user_data):
    # Check if user already exists
    if users_col.find_one({"email": user_data["email"]}):
        return False
    users_col.insert_one(user_data)
    return True

def find_user_by_email(email):
    return users_col.find_one({"email": email}, {"_id": 0})

def log_event(user, action, details):
    log = {
        "timestamp": time.time(),
        "user": user,
        "action": action,
        "details": details
    }
    logs_col.insert_one(log)

def get_all_logs():
    return list(logs_col.find({}, {"_id": 0}).sort("timestamp", -1))

def store_file(filename, content):
    return str(fs.put(content, filename=filename))

def get_file(file_id):
    try:
        return fs.get(ObjectId(file_id))
    except:
        return None

def save_file_metadata(file_id, filename, user_email, metrics):
    file_doc = {
        "file_id": file_id,
        "filename": filename,
        "user": user_email,
        "metrics": metrics,
        "uploaded_at": time.time()
    }
    files_col.insert_one(file_doc)

def get_user_files(email):
    return list(files_col.find({"user": email}, {"_id": 0}))
