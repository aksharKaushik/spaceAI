const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { connectDB } = require('./database');

// Simple schema for testing
const typeDefs = `
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

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
  }
`;

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const db = require('./database').getDB();
        const employees = await db.collection('employees').find({}).toArray();
        return employees.map(emp => ({
          ...emp,
          id: emp._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching all employees:', error);
        throw new Error('Failed to fetch employees');
      }
    },

    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = require('./database').getDB();
        const { ObjectId } = require('mongodb');
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) {
          throw new Error('Employee not found');
        }
        return {
          ...employee,
          id: employee._id.toString()
        };
      } catch (error) {
        console.error('Error fetching employee details:', error);
        throw new Error('Failed to fetch employee details');
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      try {
        const db = require('./database').getDB();
        const employees = await db.collection('employees').find({ department }).toArray();
        return employees.map(emp => ({
          ...emp,
          id: emp._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching employees by department:', error);
        throw new Error('Failed to fetch employees by department');
      }
    },

    getDepartments: async () => {
      try {
        const db = require('./database').getDB();
        const departments = await db.collection('departments').find({}).toArray();
        return departments.map(dept => ({
          ...dept,
          id: dept._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching departments:', error);
        throw new Error('Failed to fetch departments');
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      try {
        const db = require('./database').getDB();
        const employee = {
          name,
          position,
          department,
          salary,
          createdAt: new Date()
        };
        
        const result = await db.collection('employees').insertOne(employee);
        return {
          ...employee,
          id: result.insertedId.toString()
        };
      } catch (error) {
        console.error('Error adding employee:', error);
        throw new Error('Failed to add employee');
      }
    }
  }
};

async function startServer() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
    });
    
    console.log('Starting Apollo Server...');
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        return {};
      }
    });
    
    console.log(`🚀 Server ready at ${url}`);
    console.log(`📊 GraphQL Playground available at ${url}`);
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
