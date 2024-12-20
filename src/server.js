import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/chit/admin/adminRoutes.js';
import userRoutes from './routes/chit/app/customerRouters.js'

const mongodbURI=process.env.MONGO_URI;

if (!mongodbURI) {
    console.error("MONGO_URI is not defined in the .env");
    process.exit(1);
  }

const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//middleware to know api route calls
app.use(morgan('dev'));
//cookie parse middleware
app.use(cookieParser());

// routes for admin,customer etc
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);

// Connect to MongoDB
mongoose.connect(mongodbURI, {w: 'majority' })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error during connecting to MongoDB', err);
    });

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})