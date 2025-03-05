import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Lead from '../models/Lead.js';
import User from '../models/User.js';
import ErrorLog from '../models/ErrorLog.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const sampleLeads = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    source: 'website',
    message: 'Interested in your services',
    createdAt: new Date('2023-01-15')
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210',
    source: 'referral',
    message: 'Please contact me about pricing',
    createdAt: new Date('2023-02-20')
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '5551234567',
    source: 'google',
    message: 'Looking for a consultation',
    createdAt: new Date('2023-03-10')
  },
  {
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '7778889999',
    source: 'facebook',
    message: 'Need help with a project',
    createdAt: new Date('2023-04-05')
  },
  {
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    phone: '3334445555',
    source: 'linkedin',
    message: 'Requesting more information',
    createdAt: new Date('2023-05-12')
  }
];

const sampleErrorLogs = [
  {
    errorMessage: 'Invalid email format',
    endpoint: '/api/leads',
    statusCode: 400,
    timestamp: new Date('2023-03-15'),
    requestData: { body: { name: 'Test User', email: 'invalid-email' } }
  },
  {
    errorMessage: 'Database connection error',
    endpoint: '/api/leads',
    statusCode: 500,
    timestamp: new Date('2023-04-20'),
    requestData: { method: 'GET' }
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Lead.deleteMany({});
    await ErrorLog.deleteMany({});
    await User.deleteMany({});
    
    // Insert sample leads
    await Lead.insertMany(sampleLeads);
    console.log('Sample leads inserted');
    
    // Insert sample error logs
    await ErrorLog.insertMany(sampleErrorLogs);
    console.log('Sample error logs inserted');
    
    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created');
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

