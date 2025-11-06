import { configDotenv } from 'dotenv';
import e from 'express';
import cors from 'cors'
import connectDb from './config/dbConnect.js';
configDotenv();
import router from './routes/api.js';

// Connect to Database
connectDb();

const app = e();

// Middleware
app.use(cors());
app.use(e.json());

// API Routes
app.use('/api', router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));