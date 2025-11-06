import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import connectDb from './config/dbConnect.js';
import productModel from './models/product.model.js';

configDotenv()

const mockProducts = [
  {
    name: 'Classic Tee',
    price: 24.99,
    imageUrl:
      'https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363.png',
    rating: 4.7,
    colors: ['#ffffff', '#000000', '#808080', '#f2f2f2'], // white, black, gray, light gray
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    name: 'Leather Wallet',
    price: 49.99,
    imageUrl:
      'https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-leather-wallet-png-file-png-image_10209261.png',
    rating: 4.2,
    colors: ['#4b3621', '#000000', '#8b4513'], // dark brown, black, saddle brown
    sizes: ['One Size'],
  },
  {
    name: 'Canvas Backpack',
    price: 79.99,
    imageUrl:
      'https://image.similarpng.com/file/similarpng/original-picture/2021/12/Backpack-mockup-template-on-transparent-background-PNG.png',
    rating: 4.1,
    colors: ['#2f4f4f', '#696969', '#c0c0c0', '#000000'], // dark gray variants
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    name: 'Wireless Earbuds',
    price: 129.99,
    imageUrl:
      'https://png.pngtree.com/png-vector/20250416/ourmid/pngtree-white-airpods-wireless-earphones-with-charging-case-isolated-on-transparent-background-png-image_16032402.png',
    rating: 3.7,
    colors: ['#ffffff', '#000000', '#a9a9a9'], // white, black, silver gray
    sizes: ['One Size'],
  },
  {
    name: 'Coffee Mug',
    price: 15.0,
    imageUrl:
      'https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-white-mug-mockup-png-png-image_9948592.png',
    rating: 2.7,
    colors: ['#ffffff', '#ff0000', '#000000', '#008080'], // white, red, black, teal
    sizes: ['250ml', '350ml', '500ml'],
  },
  {
    name: 'Minimalist Watch',
    price: 99.99,
    imageUrl:
      'https://png.pngtree.com/png-clipart/20230506/original/pngtree-simple-time-watch-png-image_9144874.png',
    rating: 4.0,
    colors: ['#000000', '#c0c0c0', '#ffffff', '#d4af37'], // black, silver, white, gold
    sizes: ['38mm', '42mm', '45mm'],
  },
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