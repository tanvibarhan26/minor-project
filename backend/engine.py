import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

class DataCorrectionEngine:
    def __init__(self, df, domain="general"):
        self.df = df.copy()
        self.domain = domain
        self.original_stats = self._get_stats()
        self.changes_made = []

    def _get_stats(self):
        return {
            "missing": self.df.isnull().sum().sum(),
            "duplicates": self.df.duplicated().sum(),
            "rows": len(self.df)
        }

    def run_pipeline(self):
        """Executes the full cleaning pipeline."""
        self.remove_duplicates()
        self.handle_missing_values()
        self.standardize_formats()
        
        if self.domain == "ecommerce":
            self.clean_ecommerce()
        elif self.domain == "healthcare":
            self.clean_healthcare()
        elif self.domain == "realestate":
            self.clean_realestate()
            
        final_stats = self._get_stats()
        return self.df, {
            "original": self.original_stats,
            "final": final_stats,
            "changes": self.changes_made
        }

    def remove_duplicates(self):
        initial_count = len(self.df)
        self.df.drop_duplicates(inplace=True)
        dropped = initial_count - len(self.df)
        if dropped > 0:
            self.changes_made.append(f"Removed {dropped} duplicate rows.")

    def handle_missing_values(self):
        for col in self.df.columns:
            missing_count = self.df[col].isnull().sum()

            if missing_count == 0:
                continue

            if pd.api.types.is_numeric_dtype(self.df[col]):
                fill_value = self.df[col].median()

                if pd.isna(fill_value):
                    fill_value = 0

                self.df[col] = self.df[col].fillna(fill_value)

                self.changes_made.append(
                    f"Imputed {missing_count} missing values in '{col}' using median."
            )

            else:
                modes = self.df[col].mode()

                fill_value = modes.iloc[0] if not modes.empty else "N/A"

                self.df[col] = self.df[col].fillna(fill_value)

                self.changes_made.append(
                    f"Imputed {missing_count} missing values in '{col}' using mode."
                )
    def standardize_formats(self):
        for col in self.df.columns:
            if pd.api.types.is_string_dtype(self.df[col]):
                # Trim whitespace
                self.df[col] = self.df[col].str.strip()
                
                # Check if it looks like an email and normalize
                if 'email' in col.lower():
                    self.df[col] = self.df[col].str.lower()
                    self.changes_made.append(f"Normalized emails in '{col}' to lowercase.")

    def clean_ecommerce(self):
        # Ensure Price/Cost is positive
        price_cols = [c for c in self.df.columns if any(x in c.lower() for x in ['price', 'cost', 'amount'])]
        for col in price_cols:
            if pd.api.types.is_numeric_dtype(self.df[col]):
                invalid = (self.df[col] < 0).sum()
                if invalid > 0:
                    self.df[col] = self.df[col].abs()
                    self.changes_made.append(f"Corrected {invalid} negative values in '{col}'.")

    def clean_healthcare(self):
        # Ensure Age is realistic
        age_cols = [c for c in self.df.columns if 'age' in c.lower()]
        for col in age_cols:
            if pd.api.types.is_numeric_dtype(self.df[col]):
                outliers = ((self.df[col] < 0) | (self.df[col] > 120)).sum()
                if outliers > 0:
                    median_age = self.df[col].median()
                    self.df.loc[(self.df[col] < 0) | (self.df[col] > 120), col] = median_age
                    self.changes_made.append(f"Corrected {outliers} unrealistic age values in '{col}'.")

    def clean_realestate(self):
        # Normalize Area/SqFt
        area_cols = [c for c in self.df.columns if any(x in c.lower() for x in ['area', 'sqft', 'square'])]
        for col in area_cols:
            if pd.api.types.is_numeric_dtype(self.df[col]):
                invalid = (self.df[col] <= 0).sum()
                if invalid > 0:
                    median_area = self.df[col].median()
                    self.df.loc[self.df[col] <= 0, col] = median_area
                    self.changes_made.append(f"Corrected {invalid} non-positive area values in '{col}'.")
