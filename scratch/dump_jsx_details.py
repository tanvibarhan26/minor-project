import os

def dump_details():
    target = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\scratch\extracted_cache_jsx_3.txt'
    if not os.path.exists(target):
        print("Target not found.")
        return
        
    with open(target, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    print(f"Content length: {len(content)}")
    
    # Let's print sections in chunks to see the exact code
    lines = content.split('\n')
    print(f"Total lines: {len(lines)}")
    
    # Let's dump lines 1 to 200 first (imports and state variables)
    print("\n--- LINES 1 to 250 ---")
    for i, line in enumerate(lines[:250]):
        print(f"{i+1}: {line}")

if __name__ == '__main__':
    dump_details()
