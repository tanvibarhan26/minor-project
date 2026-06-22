import requests
import os

def test_backend():
    url = "https://minor-project-90rw.onrender.com/upload"
    csv_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\test_data.csv'
    
    if not os.path.exists(csv_path):
        print(f"File not found: {csv_path}")
        return
        
    print(f"Sending POST request to {url} with {csv_path}...")
    files = {
        'file': ('test_data.csv', open(csv_path, 'rb'), 'text/csv')
    }
    data = {
        'domain': 'general'
    }
    
    try:
        response = requests.post(url, files=files, data=data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print("Response Content:")
        print(response.json())
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == '__main__':
    test_backend()
