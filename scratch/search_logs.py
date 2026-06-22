import os

def search_overview():
    log_path = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\.system_generated\logs\overview.txt'
    if not os.path.exists(log_path):
        print(f"Log not found at: {log_path}")
        return
        
    print(f"Scanning conversation log: {log_path}")
    matches = 0
    with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
        for i, line in enumerate(f):
            if 'app.py' in line or 'python' in line or 'port 8000' in line:
                print(f"Line {i+1}: {line.strip()[:200]}")
                matches += 1
                
    print(f"Done. Found {matches} matching lines.")

if __name__ == '__main__':
    search_overview()
