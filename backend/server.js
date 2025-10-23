const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { connectDB } = require('./database');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const config = require('./config');

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
      listen: { port: config.PORT },
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