import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import connectDb from './config/dbConnect.js';
import productModel from './models/product.model.js';

configDotenv()

const mockProducts = [
  { name: 'Classic Tee', price: 24.99, imageUrl: 'https://i.imgur.com/qYq8r5T.png' },
  { name: 'Leather Wallet', price: 49.99, imageUrl: 'https://i.imgur.com/dC9XGk7.png' },
  { name: 'Canvas Backpack', price: 79.99, imageUrl: 'https://i.imgur.com/iR3uA15.png' },
  { name: 'Wireless Earbuds', price: 129.99, imageUrl: 'https://i.imgur.com/C5rIQM2.png' },
  { name: 'Coffee Mug', price: 15.00, imageUrl: 'https://i.imgur.com/KXTqG5A.png' },
  { name: 'Minimalist Watch', price: 99.99, imageUrl: 'https://i.imgur.com/vYxTfM9.png' },
];

const seedDB = async () => {
  await connectDb();
  try {
    await productModel.deleteMany({});
    console.log('Products cleared');
    
    await productModel.insertMany(mockProducts);
    console.log('Mock products added');
    
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedDB();