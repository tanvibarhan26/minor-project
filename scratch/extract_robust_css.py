import os

def clean_css():
    src_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\scratch\extracted_cache_css_0.txt'
    dest_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\frontend\src\pages\Dashboard.css'
    
    print(f"Checking if source file exists: {src_path}")
    if not os.path.exists(src_path):
        print("Source CSS cache not found.")
        return
        
    with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
        
    print(f"Loaded {len(lines)} lines from source.")
    for idx, line in enumerate(lines):
        line = line.strip()
        if line.startswith('const __vite__css = '):
            print(f"Found CSS definition line at index {idx}!")
            # Extract content between first and last double quotes
            # The line structure is: const __vite__css = "..."
            prefix = 'const __vite__css = "'
            if line.endswith('"'):
                css_str = line[len(prefix):-1]
            else:
                css_str = line[len(prefix):]
                # If there's a trailing quote somewhere, find it or clean it
                if css_str.endswith('"') or css_str.endswith('";'):
                    css_str = css_str[:-2] if css_str.endswith('";') else css_str[:-1]
            
            # Clean string replacements for JS escapes
            css_code = (css_str
                        .replace('\\n', '\n')
                        .replace('\\t', '\t')
                        .replace('\\"', '"')
                        .replace('\\\\', '\\')
                        .replace('\\/', '/'))
            
            print(f"Cleaned CSS string of length: {len(css_code)}")
            
            # Write out
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(dest_path, 'w', encoding='utf-8') as dest_f:
                dest_f.write(css_code)
            print(f"SUCCESS: Wrote cleaned CSS to {dest_path}")
            return
            
    print("ERROR: Did not find a line starting with const __vite__css")

if __name__ == '__main__':
    clean_css()
