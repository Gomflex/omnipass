"""
Google Sheets integration service
Syncs user data to Google Sheets when users register
"""
import os
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime
from typing import Optional

# Google Sheets API setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = os.getenv('GOOGLE_SHEETS_ID', '')  # Set in .env file
CREDENTIALS_FILE = os.getenv('GOOGLE_CREDENTIALS_FILE', 'google-credentials.json')

class GoogleSheetsService:
    def __init__(self):
        self.service = None
        self.initialized = False
        self._initialize()

    def _initialize(self):
        """Initialize Google Sheets API client"""
        try:
            if not os.path.exists(CREDENTIALS_FILE):
                print(f"[Google Sheets] Credentials file not found: {CREDENTIALS_FILE}")
                print("[Google Sheets] Skipping initialization. Set up credentials to enable sync.")
                return

            if not SPREADSHEET_ID:
                print("[Google Sheets] GOOGLE_SHEETS_ID not set in environment")
                print("[Google Sheets] Skipping initialization.")
                return

            creds = Credentials.from_service_account_file(
                CREDENTIALS_FILE,
                scopes=SCOPES
            )
            self.service = build('sheets', 'v4', credentials=creds)
            self.initialized = True
            print("[Google Sheets] Successfully initialized")

            # Initialize sheet headers if needed
            self._ensure_headers()

        except Exception as e:
            print(f"[Google Sheets] Failed to initialize: {e}")
            self.initialized = False

    def _ensure_headers(self):
        """Ensure the spreadsheet has proper headers"""
        if not self.initialized:
            return

        headers = [
            ['User ID', 'Customer ID', 'Name', 'Email', 'Country', 'Nationality',
             'Phone', 'Preferred Language', 'Passport Number', 'Date of Birth',
             'Passport Expiry', 'Provider', 'Provider ID', 'Profile Picture',
             'Registration Date', 'Last Login', 'Created At', 'Updated At']
        ]

        try:
            # Check if headers already exist
            result = self.service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range='Sheet1!A1:R1'
            ).execute()

            if 'values' not in result:
                # Add headers if they don't exist
                self.service.spreadsheets().values().update(
                    spreadsheetId=SPREADSHEET_ID,
                    range='Sheet1!A1:R1',
                    valueInputOption='RAW',
                    body={'values': headers}
                ).execute()
                print("[Google Sheets] Headers initialized")

        except HttpError as e:
            print(f"[Google Sheets] Error ensuring headers: {e}")

    def sync_user(self, user_data: dict):
        """
        Sync user data to Google Sheets

        Args:
            user_data: Dictionary containing user information
        """
        if not self.initialized:
            print("[Google Sheets] Not initialized, skipping sync")
            return False

        try:
            # Prepare row data
            row = [
                user_data.get('id', ''),
                user_data.get('customer_id', ''),
                user_data.get('name', ''),
                user_data.get('email', ''),
                user_data.get('country', ''),
                user_data.get('nationality', ''),
                user_data.get('phone', ''),
                user_data.get('preferred_language', 'en'),
                user_data.get('passport_number', ''),
                user_data.get('date_of_birth', ''),
                user_data.get('passport_expiry', ''),
                user_data.get('provider', 'email'),
                user_data.get('provider_id', ''),
                user_data.get('profile_picture', ''),
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # Registration date
                user_data.get('last_login', ''),
                user_data.get('created_at', ''),
                user_data.get('updated_at', '')
            ]

            # Append to spreadsheet
            self.service.spreadsheets().values().append(
                spreadsheetId=SPREADSHEET_ID,
                range='Sheet1!A:R',
                valueInputOption='RAW',
                insertDataOption='INSERT_ROWS',
                body={'values': [row]}
            ).execute()

            print(f"[Google Sheets] Successfully synced user: {user_data.get('email')}")
            return True

        except HttpError as e:
            print(f"[Google Sheets] Error syncing user: {e}")
            return False
        except Exception as e:
            print(f"[Google Sheets] Unexpected error: {e}")
            return False

    def update_user(self, user_id: str, user_data: dict):
        """
        Update existing user data in Google Sheets

        Args:
            user_id: User ID to find
            user_data: Updated user information
        """
        if not self.initialized:
            print("[Google Sheets] Not initialized, skipping update")
            return False

        try:
            # Find the row with this user_id
            result = self.service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range='Sheet1!A:A'
            ).execute()

            values = result.get('values', [])
            row_number = None

            for idx, row in enumerate(values):
                if row and row[0] == user_id:
                    row_number = idx + 1
                    break

            if row_number is None:
                print(f"[Google Sheets] User {user_id} not found, creating new entry")
                return self.sync_user(user_data)

            # Update the row
            row = [
                user_data.get('id', ''),
                user_data.get('customer_id', ''),
                user_data.get('name', ''),
                user_data.get('email', ''),
                user_data.get('country', ''),
                user_data.get('nationality', ''),
                user_data.get('phone', ''),
                user_data.get('preferred_language', 'en'),
                user_data.get('passport_number', ''),
                user_data.get('date_of_birth', ''),
                user_data.get('passport_expiry', ''),
                user_data.get('provider', 'email'),
                user_data.get('provider_id', ''),
                user_data.get('profile_picture', ''),
                values[row_number - 1][14] if len(values[row_number - 1]) > 14 else '',  # Keep registration date
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # Update last login
                user_data.get('created_at', ''),
                datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Updated at
            ]

            self.service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'Sheet1!A{row_number}:R{row_number}',
                valueInputOption='RAW',
                body={'values': [row]}
            ).execute()

            print(f"[Google Sheets] Successfully updated user: {user_data.get('email')}")
            return True

        except HttpError as e:
            print(f"[Google Sheets] Error updating user: {e}")
            return False
        except Exception as e:
            print(f"[Google Sheets] Unexpected error: {e}")
            return False

# Global instance
sheets_service = GoogleSheetsService()
