import os

def extract_code():
    src_path = r'C:\Users\DELL\.gemini\antigravity\brain\701db2c3-0ad0-4329-ab2a-96a7ac797000\scratch\extracted_cache_jsx_3.txt'
    dest_path = r'C:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\scratch\untransformed_dashboard_code.txt'
    
    if not os.path.exists(src_path):
        print("Source not found.")
        return
        
    with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Let's write the entire file but without Vite's HMR header and footer
    lines = content.split('\n')
    clean_lines = []
    
    # We skip Vite client imports and HMR setup at the top
    in_hmr_header = True
    for line in lines:
        if in_hmr_header:
            if 'const dataQualityMetrics =' in line or 'const Dashboard =' in line:
                in_hmr_header = False
            else:
                continue
        
        # Skip standard Vite HMR registrations at the bottom
        if '_c = Dashboard;' in line or 'var _c;' in line or 'if (import.meta.hot)' in line:
            break
            
        clean_lines.append(line)
        
    clean_code = '\n'.join(clean_lines)
    
    # Write to target
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(clean_code)
        
    print(f"Successfully cleaned HMR wrappers and wrote {len(clean_lines)} lines to {dest_path}")

if __name__ == '__main__':
    extract_code()
