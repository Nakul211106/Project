# Internship Tracker Web App

A clean, responsive, and interactive dashboard built to help students manage, search, filter, and track their internship applications in one place. Perfect for resumes and internship applications.

## 📌 Project Overview
Applying for internships is a numbers game, but keeping track of companies, contact emails, roles, follow-up dates, and application statuses can quickly become overwhelming. The **Internship Tracker** solves this by letting students organize all application details in a single dashboard with persistent storage.

## 🚀 Live Demo & How to Run
Since this is a client-side frontend project, you do not need to install any servers or backends.
1. Download or clone this folder.
2. Open [index.html](index.html) directly in any modern web browser.
3. Start tracking! Your data will be saved automatically using browser **LocalStorage**.

---

## ✨ Features
- **Interactive Stats Board**: Real-time summary cards displaying Total Applications, Applied, Follow-up Needed, Interview Scheduled, Selected, Rejected, and High Priority.
- **Full CRUD Support**: Easily add, view details of, edit, and delete applications.
- **Local Storage Persistence**: Closes the loop on data loss by saving all data locally—your tracker remains intact even after refreshing the page or closing the browser.
- **Combined Search & Filters**: Search instantly by company name, role, email, or location, and filter by status and priority level simultaneously.
- **Advanced Sorting**: Sort entries alphabetically, by application date (newest/oldest), priority level, or nearest follow-up date.
- **Follow-up Date Highlights**: Visual pulses and reminders dynamically flags cards when a follow-up is scheduled for today or is overdue.
- **Premium Custom Modals**: Custom-designed, promise-based confirm and form inputs replacing default browser alerts for a polished experience.
- **Dynamic Dark/Light Mode**: Toggle system to match your IDE or system theme preference.
- **Data Portability (CSV Export/Import)**: 
  - **Export CSV**: Back up your internship application sheet into a clean `.csv` file.
  - **Import CSV**: Bulk load applications into the tracker from a spreadsheet.
- **Responsive Layout**: Designed mobile-first, ensuring it works perfectly on smartphones, tablets, laptops, and desktop screens.

---

## 🛠️ Tech Stack
- **HTML5**: Structured semantic markup.
- **CSS3**: Vanilla CSS utilizing custom variables, flexbox, CSS grid, media queries, and transition animations.
- **JavaScript (ES6+)**: Custom DOM manipulation, local storage API, data management, regex validation, and CSV parsing.
- **FontAwesome & Google Fonts**: Premium iconography and modern typography.

---

## 📂 Folder Structure
```text
internship-tracker/
│
├── index.html       # Web app layout, modals, and templates
├── style.css        # Responsive styling, color systems, and themes
├── script.js        # Core logic, LocalStorage sync, CSV handlers, validation
└── README.md        # Project documentation
```

---

## 📝 Usage Guide
1. **Adding an Entry**: Click the **Add Application** button. Fill out the fields. Validation checks will guide you (e.g. valid email syntax, matching dates).
2. **Editing / Deleting**: Each card has quick action links. Deleting calls a custom confirm dialog before removing the item.
3. **Tracking Follow-ups**: If you set a follow-up date for today or a past date, the app will show a bright warning badge and animate the card's border to draw your attention.
4. **CSV Exporting**: Click **Export CSV** to download a spreadsheet-compatible backup of your data.
5. **CSV Importing**: Click **Import CSV** to select a formatted CSV backup and merge the data directly into your dashboard.

---

## 💼 Resume bullet points
If you add this to your resume, here is a professional description:

> **Internship Tracker Web App | HTML, CSS, JavaScript, LocalStorage**
> * Developed a responsive client-side web application to help students organize and manage internship applications.
> * Implemented search, multi-filter query matching, custom date validation, and responsive mobile-first grids.
> * Utilized LocalStorage for offline data retention, implemented custom promise-based confirmation modals, and enabled data portability via CSV import/export engines.

---

## 🔮 Future Improvements
- Add a user login system with Firebase/Auth0.
- Connect a cloud database (MongoDB or PostgreSQL) for cross-device syncing.
- Integrate Web Push Notifications or automated email follow-up reminders.
- Build interactive analytics charts using Chart.js to map application progress over time.
