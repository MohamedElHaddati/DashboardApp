import { PORT } from "./config.js";
import express from "express";
import mongoose from "mongoose";


const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello from MERN stack!');
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DashboardApp', {
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
