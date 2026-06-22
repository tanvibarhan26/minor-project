import os

def inspect_css():
    files = [f for f in os.listdir('.') if f.startswith('raw_extracted_Dashboard_')]
    for f_name in sorted(files):
        print(f"\n==========================================")
        print(f"File: {f_name} | Size: {os.path.getsize(f_name)} bytes")
        with open(f_name, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        print("First 25 lines:")
        for line in lines[:25]:
            print(line.rstrip())

if __name__ == '__main__':
    inspect_css()
