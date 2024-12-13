import express from 'express';
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import hostRoutes from "./routes/hostRoutes.js";
import cors from 'cors';
import mongoose from 'mongoose';
import {config} from 'dotenv';

const app = express();

config();

const port = 8000;

const URI = process.env.MONGODB_URI;

mongoose.connect(URI);
console.log(URI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use('/api/listings', listingRoutes);

app.use('/api/bookings', bookingRoutes);

app.use("/api/auth", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/host", hostRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
