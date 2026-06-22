import urllib.request
import urllib.parse
import os

def test_http_post():
    url = "http://localhost:8000/api/analyze"
    csv_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\test_data.csv'
    
    if not os.path.exists(csv_path):
        print(f"File not found: {csv_path}")
        return
        
    print(f"Reading file: {csv_path}")
    with open(csv_path, 'rb') as f:
        file_bytes = f.read()
        
    # Build multipart/form-data request body natively
    boundary = b"----WebKitFormBoundaryDataCleanseAITest"
    
    body = []
    # File part
    body.append(b"--" + boundary)
    body.append(b'Content-Disposition: form-data; name="file"; filename="test_data.csv"')
    body.append(b'Content-Type: text/csv')
    body.append(b'')
    body.append(file_bytes)
    
    # Domain part
    body.append(b"--" + boundary)
    body.append(b'Content-Disposition: form-data; name="domain"')
    body.append(b'')
    body.append(b'general')
    
    body.append(b"--" + boundary + b"--")
    body.append(b'')
    
    body_data = b"\r\n".join(body)
    
    req = urllib.request.Request(url, data=body_data)
    req.add_header('Content-Type', f'multipart/form-data; boundary={boundary.decode()}')
    req.add_header('Content-Length', str(len(body_data)))
    
    print("Sending POST request to FastAPI server...")
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.status
            content = response.read().decode('utf-8')
            print(f"\nResponse received! Status code: {status}")
            print("Response body:")
            print(content)
    except urllib.error.HTTPError as e:
        print(f"\nHTTP Error: {e.code} - {e.reason}")
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f"\nRequest failed: {e}")

if __name__ == '__main__':
    test_http_post()
