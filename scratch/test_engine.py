import sys
import os
import pandas as pd

# Add backend to path
sys.path.append(r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\backend')

from engine import DataCorrectionEngine

def test_pipeline():
    csv_path = r'c:\Users\DELL\OneDrive\Documents\CS\project\Data Correction\test_data.csv'
    if not os.path.exists(csv_path):
        print(f"File not found: {csv_path}")
        return
        
    print(f"Loading dataset: {csv_path}")
    df = pd.read_csv(csv_path)
    print("Dataset loaded. Initial head:")
    print(df)
    
    print("\nInitializing DataCorrectionEngine...")
    engine = DataCorrectionEngine(df, domain="general")
    
    print("Running pipeline...")
    try:
        cleaned_df, report = engine.run_pipeline()
        print("\nPipeline completed successfully!")
        print("Cleaned DataFrame:")
        print(cleaned_df)
        print("\nReport:")
        import pprint
        pprint.pprint(report)
    except Exception as e:
        print("\nPipeline failed!")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    test_pipeline()
