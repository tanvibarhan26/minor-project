import os

def print_snippet():
    target = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\scratch\extracted_cache_jsx_2.txt'
    if not os.path.exists(target):
        print(f"{target} not found.")
        return
        
    print(f"Reading {target}...")
    with open(target, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    print(f"File size: {len(content)} characters.")
    
    # Print character index range 2000 to 5000
    print("\nSnippet (chars 1000 to 5000):")
    print(content[1000:5000])

if __name__ == '__main__':
    print_snippet()
