import os

def search_css():
    cache_dir = r'C:\Users\DELL\.gemini\antigravity-browser-profile\Default\Cache\Cache_Data'
    if not os.path.exists(cache_dir):
        print("Chrome Cache folder not found.")
        return
        
    print(f"Scanning for Dashboard CSS in Chrome Cache...")
    found_css = []
    
    # We look for files containing classes from the clean SaaS dashboard
    patterns = [
        b'.dashboard-page',
        b'.health-dashboard-grid',
        b'.main-score-card',
        b'.health-bars',
        b'.ai-insights-panel',
        b'.report-modal',
        b'.comparison-container'
    ]
    
    for file in os.listdir(cache_dir):
        path = os.path.join(cache_dir, file)
        if not os.path.isfile(path) or file.startswith('data_'):
            continue
            
        try:
            with open(path, 'rb') as f:
                content = f.read()
                
            # Check if it matches any pattern
            matches = [p for p in patterns if p in content]
            if len(matches) >= 2: # Match at least 2 pattern classes
                found_css.append((path, len(content), content, matches))
        except Exception:
            pass
            
    print(f"\nFound {len(found_css)} potential Dashboard CSS cache files:")
    for idx, (path, size, content, matches) in enumerate(found_css):
        pattern_str = ", ".join([p.decode('utf-8') for p in matches])
        print(f" [{idx}] Size: {size} bytes | Path: {path} | Matches: {pattern_str}")
        out_name = f"extracted_cache_css_{idx}.txt"
        with open(out_name, 'wb') as out_f:
            out_f.write(content)
        print(f" - Saved to {out_name}")
        try:
            text = content.decode('utf-8', errors='ignore')
            print(f" - Text Sample:\n{text[:250]}")
        except Exception:
            pass

if __name__ == '__main__':
    search_css()
