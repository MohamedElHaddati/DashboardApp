import express from "express";
import bodyParser from "body-parser";
import { PORT, conn } from "./config.js";
import { router as userRoutes } from "./routes/user.js";
import { router as orderRoutes } from "./routes/order.js";
import { router as productRoutes } from "./routes/product.js";
import { router as categoryRoutes } from "./routes/category.js";
import { router as supplierRoutes } from "./routes/supplier.js";
import { router as warehouseRoutes } from "./routes/warehouse.js";

const app = express();

// Middleware
app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

// Routes
app.use('/user', userRoutes);
//app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use("/supplier", supplierRoutes);
app.use("/warehouse", warehouseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
