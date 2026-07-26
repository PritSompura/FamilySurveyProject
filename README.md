# Family Survey Form — Sompura Kendriya Parishad Samiti

A Flask + SQLite web app that digitizes the "Parivar Darpan" family survey form,
with an admin dashboard, search, edit/delete, and Excel export.

## 1. Install Python
Download and install Python 3.9+ from https://www.python.org/downloads/
During install on Windows, check **"Add Python to PATH"**.

Verify:
```
python --version
```

## 2. Install dependencies
From inside the `family_survey` project folder:
```
pip install flask pandas openpyxl
```
(or `pip install -r requirements.txt`)

## 3. Run the app
```
python app.py
```
The first run automatically creates `database/family_survey.db` with the
required tables.

Open your browser at: **http://127.0.0.1:5000/**

## 4. Using the app
- **/** — the survey form. Click "सदस्य जोड़ें (Add Family Member)" to add more
  members to the same family before submitting.
- **/dashboard** — admin view of all submitted families/members, with search,
  edit, delete, and an "Export to Excel" button (produces one row per member).

## 5. Folder structure
```
family_survey/
├── app.py
├── requirements.txt
├── database/
│   └── family_survey.db      (auto-created)
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── dashboard.html
│   └── edit.html
└── static/
    ├── css/style.css
    └── js/script.js
```

## 6. Validation rules
- Aadhaar: exactly 12 digits (optional field, validated if filled)
- Mobile: 10 digits, must start with 6, 7, 8, or 9
- DOB/Age: either a plain age number or a `YYYY-MM-DD` date
- Marriage date: standard date picker

Validation runs both in the browser (JavaScript) and on the server (Python),
so bad data can't be saved even if JavaScript is disabled.
