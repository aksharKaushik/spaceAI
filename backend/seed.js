const { MongoClient } = require('mongodb');
const config = require('./config');

const seedData = async () => {
  const client = new MongoClient(config.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('employee-directory');
    
    // Clear existing data
    await db.collection('employees').deleteMany({});
    await db.collection('departments').deleteMany({});
    
    // Insert departments
    const departments = [
      { name: 'Engineering', floor: 2 },
      { name: 'Marketing', floor: 1 },
      { name: 'HR', floor: 3 }
    ];
    
    const deptResult = await db.collection('departments').insertMany(departments);
    console.log('Departments seeded:', deptResult.insertedCount);
    
    // Insert employees
    const employees = [
      {
        name: 'John Doe',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        salary: 95000,
        createdAt: new Date()
      },
      {
        name: 'Jane Smith',
        position: 'Frontend Developer',
        department: 'Engineering',
        salary: 85000,
        createdAt: new Date()
      },
      {
        name: 'Mike Johnson',
        position: 'Marketing Manager',
        department: 'Marketing',
        salary: 75000,
        createdAt: new Date()
      },
      {
        name: 'Sarah Wilson',
        position: 'HR Specialist',
        department: 'HR',
        salary: 65000,
        createdAt: new Date()
      },
      {
        name: 'David Brown',
        position: 'Backend Developer',
        department: 'Engineering',
        salary: 90000,
        createdAt: new Date()
      },
      {
        name: 'Lisa Davis',
        position: 'Marketing Coordinator',
        department: 'Marketing',
        salary: 55000,
        createdAt: new Date()
      }
    ];
    
    const empResult = await db.collection('employees').insertMany(employees);
    console.log('Employees seeded:', empResult.insertedCount);
    
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
};

seedData();
