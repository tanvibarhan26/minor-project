import os
import re

def clean_css():
    src_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\scratch\extracted_cache_css_0.txt'
    dest_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\frontend\src\pages\Dashboard.css'
    
    if not os.path.exists(src_path):
        print("Source CSS cache not found.")
        return
        
    with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # We find the line containing `const __vite__css = `
    match = re.search(r'const __vite__css = "(.*)"', content, re.DOTALL)
    if not match:
        # Let's try searching on line 3 directly
        lines = content.split('\n')
        for line in lines:
            if line.startswith('const __vite__css = '):
                # Extract whatever is in the quotes
                match_str = line[len('const __vite__css = "'):-1]
                # If it ends with quote, remove it
                if match_str.endswith('"'):
                    match_str = match_str[:-1]
                
                # Unescape standard javascript escapes
                # We can use codecs to escape or python's eval / JSON decode
                # But since it's a raw js string with double quotes, we can wrap it in double quotes and json.loads
                import json
                try:
                    # Escape double quotes that are not already escaped
                    # Actually, if we read it as JSON it needs proper double-quote escapes.
                    # The easiest way in python is to decode raw_unicode_escape
                    css_code = bytes(match_str, "utf-8").decode("unicode_escape")
                except Exception as e:
                    print(f"Unicode decode failed: {e}, falling back to manual replacement")
                    css_code = match_str.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')
                
                # Let's write to target
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                with open(dest_path, 'w', encoding='utf-8') as dest_f:
                    dest_f.write(css_code)
                print(f"Successfully cleaned CSS and wrote to {dest_path}")
                return
                
        print("Could not locate const __vite__css line.")
        
if __name__ == '__main__':
    clean_css()
