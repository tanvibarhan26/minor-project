import shutil
import os

def restore_css():
    src = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\raw_extracted_Dashboard_2.css'
    dest = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\frontend\src\pages\Dashboard.css'
    
    if os.path.exists(src):
        shutil.copy2(src, dest)
        print("Successfully restored original Dashboard.css!")
    else:
        print("Source CSS cache not found.")

if __name__ == '__main__':
    restore_css()
