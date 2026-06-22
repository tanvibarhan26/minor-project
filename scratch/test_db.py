import sys
import os

# Add backend to path
sys.path.append(r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\backend')

from db import store_file, get_file

def test_mongodb():
    print("Testing MongoDB GridFS connection and file storage...")
    content = b"Hello from DataCleanse.AI diagnostic check"
    
    try:
        print("Invoking store_file...")
        file_id = store_file("test_diagnostic.txt", content)
        print(f"Successfully stored file! File ID: {file_id}")
        
        print("Invoking get_file...")
        retrieved = get_file(file_id)
        if retrieved:
            retrieved_content = retrieved.read()
            print(f"Successfully read file! Content: {retrieved_content.decode()}")
        else:
            print("Failed to retrieve file: returned None")
            
    except Exception as e:
        print("Database operation failed!")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    test_mongodb()
