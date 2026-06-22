import os

def search_css_modules():
    cache_dir = r'C:\Users\DELL\.gemini\antigravity-browser-profile\Default\Cache\Cache_Data'
    if not os.path.exists(cache_dir):
        print("Chrome Cache folder not found.")
        return
        
    print(f"Scanning for Vite CSS modules in Chrome Cache...")
    found_css_js = []
    
    for file in os.listdir(cache_dir):
        path = os.path.join(cache_dir, file)
        if not os.path.isfile(path) or file.startswith('data_'):
            continue
            
        try:
            with open(path, 'rb') as f:
                content = f.read()
                
            # Search for typical Vite CSS injection signatures
            if b'Dashboard.css' in content and b'const __vite__css' in content:
                found_css_js.append((path, len(content), content))
        except Exception:
            pass
            
    print(f"\nFound {len(found_css_js)} potential Dashboard.css modules:")
    for idx, (path, size, content) in enumerate(found_css_js):
        print(f" [{idx}] Size: {size} bytes | Path: {path}")
        out_name = f"extracted_cache_css_js_{idx}.txt"
        with open(out_name, 'wb') as out_f:
            out_f.write(content)
        print(f" - Saved to {out_name}")
        
        # Let's extract the actual raw CSS from inside the Vite CSS JS module!
        # Usually it's in a string literal const __vite__css = "..."
        try:
            text = content.decode('utf-8', errors='ignore')
            start_marker = 'const __vite__css = "'
            end_marker = '"\n'
            if start_marker in text:
                start_idx = text.find(start_marker) + len(start_marker)
                end_idx = text.find(end_marker, start_idx)
                raw_css = text[start_idx:end_idx].replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
                raw_css_path = f"raw_extracted_Dashboard_{idx}.css"
                with open(raw_css_path, 'w', encoding='utf-8') as raw_f:
                    raw_f.write(raw_css)
                print(f" - SUCCESSFULLY extracted raw CSS to {raw_css_path} (length: {len(raw_css)} chars)")
        except Exception as e:
            print(f" - Failed to extract raw CSS: {e}")

if __name__ == '__main__':
    search_css_modules()
