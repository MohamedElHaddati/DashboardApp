import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoute } from "./routes/auth.js"
import { router as userRoutes } from "./routes/user.js";
import { router as productRoutes } from "./routes/product.js";
import { router as categoryRoutes } from "./routes/category.js";
import { router as supplierRoutes } from "./routes/supplier.js";
import { router as warehouseRoutes } from "./routes/warehouse.js";
import { router as employeeRoutes } from "./routes/employee.js";
import { router as customerRoutes } from "./routes/customer.js";
// Below are unfinished controllers as there are multiple relations between the db entities
//import { router as orderRoutes } from "./routes/order.js";
//import { router as saleRoutes } from "./routes/sale.js";
//import { router as transferRoutes } from "./routes/transfer.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env. MONGODB_URI;
const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/", authRoute);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use("/supplier", supplierRoutes);
app.use("/warehouse", warehouseRoutes);
app.use("/employee", employeeRoutes);
app.use("/customer", customerRoutes);
//app.use('/order', orderRoutes);
//app.use('/transfer', transferRoutes);
//app.use('/sale', saleRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
