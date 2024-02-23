import express from "express";
import bodyParser from "body-parser";
import { PORT, conn } from "./config.js";
import { router as userRoutes } from "./routes/user.js";
import { router as productRoutes } from "./routes/product.js";
import { router as categoryRoutes } from "./routes/category.js";
import { router as supplierRoutes } from "./routes/supplier.js";
import { router as warehouseRoutes } from "./routes/warehouse.js";
//import { router as orderRoutes } from "./routes/order.js";
//import { router as saleRoutes } from "./routes/sale.js";
//import { router as transferRoutes } from "./routes/transfer.js";

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use("/supplier", supplierRoutes);
app.use("/warehouse", warehouseRoutes);
//app.use('/order', orderRoutes);
//app.use('/transfer', transferRoutes);
//app.use('/sale', saleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
