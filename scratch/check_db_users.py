import pymongo

MONGO_URI = "https://minor-project-90rw.onrender.com/upload"
client = pymongo.MongoClient(MONGO_URI)
db = client["datacleanse_ai"]
users_col = db["users"]

print("--- MongoDB Users ---")
users = list(users_col.find({}, {"_id": 0}))
for u in users:
    print(u)
print("---------------------")
