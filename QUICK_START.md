# 🚀 Quick Start Guide

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Install MongoDB](https://www.mongodb.com/try/download/community)
3. **Git** - [Download here](https://git-scm.com/)

## 🎯 One-Command Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/employee-directory-app.git
cd employee-directory-app

# Make the startup script executable and run it
chmod +x run-apps.sh
./run-apps.sh
```

**That's it!** The script will automatically:
- Install dependencies for both backend and frontend
- Start MongoDB (if not running)
- Seed the database with sample data
- Start both applications

## 🔧 Manual Setup (Step by Step)

### Step 1: Start MongoDB

**On macOS:**
```bash
# Install MongoDB (if not installed)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**On Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**On Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod
```

### Step 2: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/employee-directory-app.git
cd employee-directory-app

# Install backend dependencies
cd backend
npm install

# Seed the database
npm run seed

# Start backend (in terminal 1)
node simple-server.js
```

### Step 3: Start Frontend

```bash
# Open new terminal and navigate to frontend
cd frontend
npm install

# Start frontend
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000

## 🎯 What You'll See

1. **Employee List** - Shows all employees in a responsive table
2. **Department Filter** - Filter employees by department
3. **Add Employee** - Click "Add New Employee" to test the form
4. **Employee Details** - Click "View Details" to see individual employee info

## 🔧 Troubleshooting

### MongoDB Issues
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB if not running
brew services start mongodb-community
```

### Port Conflicts
- Backend: Change port in `backend/simple-server.js`
- Frontend: Use `npm run dev -p 3001`

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📱 Features to Test

- ✅ View all employees
- ✅ Filter by department (Engineering, Marketing, HR)
- ✅ Add new employees with validation
- ✅ View employee details
- ✅ Mobile responsive design
- ✅ Form validation and error handling

## 🎉 Success!

If you can see the employee directory with 6+ employees and can add new ones, the application is working perfectly!

## 📞 Need Help?

If you encounter any issues:
1. Check that MongoDB is running
2. Ensure Node.js v16+ is installed
3. Try the manual setup steps
4. Check the console for error messages

The application is designed to work out-of-the-box once the prerequisites are met!
