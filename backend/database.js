const { MongoClient } = require('mongodb');
const config = require('./config');

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    db = client.db('employee-directory');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDB, getDB };
