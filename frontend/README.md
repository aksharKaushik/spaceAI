# Employee Directory Frontend

Next.js React application for the Employee Directory.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Features

- **Home Page**: Employee list with department filtering
- **Employee Details**: Individual employee information
- **Add Employee**: Form to create new employees
- **Responsive Design**: Mobile-friendly interface

## Pages

- `/` - Home page with employee list
- `/employee/[id]` - Employee detail page

## Components

- `EmployeeForm` - Modal form for adding employees
- Apollo Client integration for GraphQL operations
- Tailwind CSS for styling

## Technologies

- Next.js 14 (App Router)
- React 18
- Apollo Client
- Tailwind CSS
- GraphQL

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```
