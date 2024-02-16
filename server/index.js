import { PORT } from "./config.js";
import express from "express";

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello from MERN stack!');
});

