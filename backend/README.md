# Employee Directory Backend

GraphQL API server for the Employee Directory application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb-community
```

3. Seed the database:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

- **GraphQL Playground**: http://localhost:4000
- **GraphQL Endpoint**: http://localhost:4000

## GraphQL Schema

### Types

```graphql
type Employee {
  id: ID!
  name: String!
  position: String!
  department: String!
  salary: Float!
}

type Department {
  id: ID!
  name: String!
  floor: Int!
}
```

### Queries

```graphql
getAllEmployees: [Employee!]!
getEmployeeDetails(id: ID!): Employee
getEmployeesByDepartment(department: String!): [Employee!]!
getDepartments: [Department!]!
```

### Mutations

```graphql
addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
```

## Database

- **Database**: employee-directory
- **Collections**: employees, departments
- **Connection**: MongoDB native driver

## Environment Variables

Create a `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/employee-directory
PORT=4000
```
