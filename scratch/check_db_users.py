import pymongo

MONGO_URI = "mongodb://localhost:27017/"
client = pymongo.MongoClient(MONGO_URI)
db = client["datacleanse_ai"]
users_col = db["users"]

print("--- MongoDB Users ---")
users = list(users_col.find({}, {"_id": 0}))
for u in users:
    print(u)
print("---------------------")
