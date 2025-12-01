'use client';

import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

interface PassportData {
  passportNumber: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  expiryDate: string;
}

interface PassportScannerProps {
  onScanComplete: (data: PassportData) => void;
}

export default function PassportScanner({ onScanComplete }: PassportScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseMRZ = (text: string): PassportData | null => {
    // Clean the text
    const cleanText = text.replace(/\s/g, '').toUpperCase();

    // Try to find MRZ lines (Machine Readable Zone)
    // MRZ format for passport has 2 lines of 44 characters each
    const lines = cleanText.split('\n').filter(line => line.length >= 30);

    if (lines.length < 2) {
      return null;
    }

    // Simple MRZ parsing (this is a simplified version)
    // In production, you'd want a more robust MRZ parser
    const line1 = lines[0];
    const line2 = lines[1];

    try {
      // Extract passport number (characters 0-8 of line 2)
      const passportNumber = line2.substring(0, 9).replace(/</g, '');

      // Extract date of birth (characters 13-18 of line 2, format YYMMDD)
      const dobStr = line2.substring(13, 19);
      const dobYear = parseInt(dobStr.substring(0, 2)) + 1900;
      const dobMonth = dobStr.substring(2, 4);
      const dobDay = dobStr.substring(4, 6);
      const dateOfBirth = `${dobYear}-${dobMonth}-${dobDay}`;

      // Extract expiry date (characters 21-26 of line 2, format YYMMDD)
      const expStr = line2.substring(21, 27);
      const expYear = parseInt(expStr.substring(0, 2)) + 2000;
      const expMonth = expStr.substring(2, 4);
      const expDay = expStr.substring(4, 6);
      const expiryDate = `${expYear}-${expMonth}-${expDay}`;

      // Extract nationality (characters 10-12 of line 2)
      const nationality = line2.substring(10, 13).replace(/</g, '');

      // Extract name from line 1 (characters 5-43)
      const nameStr = line1.substring(5, 44).replace(/</g, ' ').trim();
      const nameParts = nameStr.split('  ');
      const name = nameParts.reverse().join(' ');

      return {
        passportNumber,
        name,
        dateOfBirth,
        nationality,
        expiryDate,
      };
    } catch (error) {
      console.error('Error parsing MRZ:', error);
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsScanning(true);
    setProgress(0);

    try {
      // Perform OCR
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text;
      console.log('OCR Result:', text);

      // Parse MRZ
      const passportData = parseMRZ(text);

      if (passportData) {
        onScanComplete(passportData);
      } else {
        alert('Could not read passport information. Please ensure the image is clear and try again, or enter information manually.');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Error scanning passport. Please try again or enter information manually.');
    } finally {
      setIsScanning(false);
      setProgress(0);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {previewImage && (
        <div className="mb-4">
          <img
            src={previewImage}
            alt="Passport preview"
            className="max-h-40 mx-auto rounded border border-gray-300"
          />
        </div>
      )}

      {isScanning ? (
        <div className="space-y-3">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-600">Scanning passport... {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Scan Your Passport
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Take a photo of the passport information page (with MRZ at bottom)
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Scan Passport
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Or fill in the information manually below
          </p>
        </div>
      )}
    </div>
  );
}
