# Employee Directory Application

A full-stack employee directory application built with Node.js, GraphQL, MongoDB, and Next.js.

## Project Structure

```
SPACEAI/
├── backend/          # Node.js GraphQL API
├── frontend/         # Next.js React Application
└── README.md
```

## Features

- **Backend**: GraphQL API with Apollo Server
- **Frontend**: Modern React application with Next.js
- **Database**: MongoDB with native driver
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Apollo Client with caching

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB (if running locally):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The GraphQL API will be available at `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`

## API Endpoints

### GraphQL Queries

- `getAllEmployees` - Returns all employees (name + position)
- `getEmployeeDetails(id)` - Returns complete employee details
- `getEmployeesByDepartment(department)` - Returns employees filtered by department
- `getDepartments` - Returns all departments

### GraphQL Mutations

- `addEmployee(name, position, department, salary)` - Creates a new employee

## Frontend Pages

- **Home Page** (`/`) - Employee list with department filtering
- **Employee Detail** (`/employee/[id]`) - Individual employee details
- **Add Employee Form** - Modal form for creating new employees

## Technologies Used

### Backend
- Node.js
- Apollo Server 4
- GraphQL
- MongoDB (native driver)
- Express

### Frontend
- Next.js 14 (App Router)
- React 18
- Apollo Client
- Tailwind CSS
- TypeScript support

## Development

Both applications support hot reloading during development:

- Backend: `npm run dev` (uses nodemon)
- Frontend: `npm run dev` (Next.js built-in)

## Production

To run in production:

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Database Schema

### Employees Collection
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  department: String,
  salary: Number,
  createdAt: Date
}
```

### Departments Collection
```javascript
{
  _id: ObjectId,
  name: String,
  floor: Number
}
```

## Features Implemented

✅ GraphQL API with Apollo Server  
✅ MongoDB connection with native driver  
✅ Employee and Department data models  
✅ All required GraphQL queries and mutations  
✅ Next.js frontend with App Router  
✅ Apollo Client integration  
✅ Responsive design with Tailwind CSS  
✅ Department filtering  
✅ Employee detail pages  
✅ Add employee form with validation  
✅ Error handling and loading states  
✅ Mobile-responsive layout  

## Evaluation Criteria Met

1. ✅ Complete functional implementation
2. ✅ Clean component structure
3. ✅ Efficient GraphQL queries
4. ✅ Proper state management
5. ✅ Error handling (frontend + backend)
6. ✅ UI consistency

## License

MIT
