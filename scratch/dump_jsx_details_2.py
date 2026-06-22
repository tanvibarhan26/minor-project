import os

def dump_details_2():
    target = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\scratch\extracted_cache_jsx_3.txt'
    if not os.path.exists(target):
        print("Target not found.")
        return
        
    with open(target, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    lines = content.split('\n')
    print("\n--- LINES 250 to 550 ---")
    for i, line in enumerate(lines[249:550]):
        print(f"{i+250}: {line}")

if __name__ == '__main__':
    dump_details_2()
