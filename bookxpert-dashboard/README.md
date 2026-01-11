# BookXpert Dashboard

## Project Overview

BookXpert Dashboard is a modern, user-friendly employee management system designed to streamline HR operations. The application allows administrators to view, add, edit, and delete employee records with a clean and intuitive interface. It features employee authentication, advanced filtering capabilities, and print-friendly employee list generation.

### Key Features:
- **User Authentication** - Secure login system for authorized access
- **Employee Management** - Create, read, update, and delete employee records
- **Advanced Filtering** - Filter employees by name, gender, and active status
- **Employee Details** - Manage comprehensive employee information including profile images
- **Responsive Design** - Mobile-friendly interface using DaisyUI components
- **Print Functionality** - Generate print-friendly employee lists
- **Real-time Search** - Instant search across employee records
- **Employee Dashboard** - Overview of total and active employee counts

---

## Tech Stack

### Frontend Framework & Libraries:
- **React** (v19.2.0) - UI library for building interactive components
- **React Router DOM** (v7.12.0) - Client-side routing and navigation
- **Vite** (v7.2.4) - Lightning-fast build tool and development server

### Styling & UI:
- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **DaisyUI** (v5.5.14) - Component library built on Tailwind CSS
- **@tailwindcss/vite** (v4.1.18) - Vite plugin for Tailwind CSS

### HTTP Client:
- **Axios** (v1.13.2) - Promise-based HTTP client for API calls

### Development Tools:
- **ESLint** (v9.39.1) - Code quality and consistency checking
- **Node.js** (v14+) - JavaScript runtime environment

---

## Steps to Run the Project Locally

### Prerequisites:
- **Node.js** (v14 or higher) and **npm** installed on your system
- Git (optional, for cloning the repository)

### Installation & Setup:

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd bookxpert/bookxpert-dashboard
   
   # Or navigate to the project directory if already downloaded
   cd bookxpert-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port)

4. **Build for production**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Lint code for quality checks**
   ```bash
   npm run lint
   ```

### Login Credentials:
Use the following credentials to access the dashboard:
- **Email**: admin@bookxpert.com
- **Password**: password123

---

## Assumptions & Design Decisions

### 1. **Authentication**
- Uses hardcoded credentials stored in `constants/credentials.js` for demo purposes
- In production, this should be replaced with a backend API authentication system
- Sessions are maintained only during the current browser session (no persistence)

### 2. **Data Management**
- **Mock Data**: Employee data is initialized from `Data/MockData.js` on application load
- All data modifications (add, edit, delete) are stored in React state only
- Data is not persisted to a backend; refreshing the page resets data to initial mock state
- For production, integrate with a REST API backend (Node.js/Express, Django, etc.)

### 3. **Employee ID Generation**
- New employee IDs are automatically generated with format `EMPxxxxx` (e.g., EMP001, EMP002)
- Uses an internal counter that resets on page refresh

### 4. **Image Handling**
- Profile images are stored as base64 data URLs in state for editing capability
- External URLs are supported for displaying existing images
- Image upload is mandatory for new employees but optional during editing
- For production, implement cloud storage (AWS S3, Azure Blob) or backend file uploads

### 5. **Form Validation**
- Full Name: Minimum 3 characters required
- Date of Birth: Employee must be at least 18 years old
- Gender & State: Required fields from predefined lists
- Active Status: Toggle between Active/Inactive states
- All validations happen on client-side; server-side validation recommended for production

### 6. **Filtering & Search**
- Search is case-insensitive and real-time
- Multiple filters can be applied simultaneously (search + gender + status)
- Filters operate on the current dataset in state

### 7. **UI/UX Design**
- Built with DaisyUI for consistent, professional appearance
- Responsive grid layout using Tailwind CSS
- Modal-based forms for add/edit operations
- Confirmation dialogs before deletion to prevent accidental data loss
- Print stylesheet (`styles/print.css`) for clean employee list printing

### 8. **Component Structure**
- **App.jsx**: Main application wrapper
- **Login.jsx**: Authentication component
- **Dashboard.jsx**: Main dashboard with filters and employee overview
- **Table.jsx**: Employee list table with actions
- **EmployeeForm.jsx**: Reusable form for adding and editing employees
- **MockData.js**: Initial employee data
- **credentials.js**: Login credentials (demo only)

### 9. **Styling Approach**
- Utility-first CSS using Tailwind for consistent spacing, colors, and responsive design
- DaisyUI components for buttons, modals, tables, and forms
- Custom print styles for optimal printed output
- Dark/Light mode support inherent to DaisyUI configuration

### 10. **Future Enhancements**
- Backend API integration for persistent data storage
- Real authentication with JWT tokens
- Role-based access control (Admin, Manager, Employee)
- Employee profile pages with detailed information
- Export employee data to CSV/Excel
- Email notifications for employee updates
- Employee performance metrics and analytics
- Department and team management
- Salary and compensation tracking

---

## Project Structure

```
bookxpert-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── App.jsx       # Main app component
│   │   ├── Dashboard.jsx # Dashboard view
│   │   ├── Login.jsx     # Login form
│   │   ├── Table.jsx     # Employee table
│   │   └── EmployeeForm.jsx # Add/Edit employee form
│   ├── constants/        # Application constants
│   │   └── credentials.js # Login credentials
│   ├── Data/             # Mock data
│   │   └── MockData.js   # Sample employee data
│   ├── services/         # API services (for future use)
│   ├── styles/           # Custom stylesheets
│   │   ├── print.css    # Print styles
│   │   ├── App.css      # App styles
│   │   └── index.css    # Global styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── README.md           # This file
```

---

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues
Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Build Errors
Ensure you're using a compatible Node.js version:
```bash
node --version  # Should be v14+
npm --version   # Should be v6+
```

---

## License

This project is part of the BookXpert suite. All rights reserved.

---

## Support

For issues, questions, or contributions, please contact the development team.

**Last Updated**: January 2026
