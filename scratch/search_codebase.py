import os

def search_files():
    root_dir = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction'
    targets = ['num_col', '42.5', ',.1f']
    
    print(f"Scanning files in: {root_dir}")
    match_count = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        if 'node_modules' in dirpath or '.git' in dirpath or '.venv' in dirpath:
            continue
            
        for file in filenames:
            ext = os.path.splitext(file)[1].lower()
            if ext not in ['.py', '.js', '.jsx', '.html', '.css', '.json']:
                continue
                
            fullpath = os.path.join(dirpath, file)
            try:
                with open(fullpath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                for i, line in enumerate(lines):
                    for target in targets:
                        if target in line:
                            print(f"MATCH: {fullpath} (line {i+1}): {line.strip()}")
                            match_count += 1
            except Exception as e:
                print(f"Error reading {fullpath}: {e}")
                
    print(f"Search complete. Total matches found: {match_count}")

if __name__ == '__main__':
    search_files()
