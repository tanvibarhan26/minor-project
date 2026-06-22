import os

def dump_details_3():
    target = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\scratch\extracted_cache_jsx_3.txt'
    if not os.path.exists(target):
        print("Target not found.")
        return
        
    with open(target, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    lines = content.split('\n')
    print("\n--- LINES 550 to 820 ---")
    for i, line in enumerate(lines[549:]):
        print(f"{i+550}: {line}")

if __name__ == '__main__':
    dump_details_3()
