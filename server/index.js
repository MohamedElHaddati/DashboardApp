import { PORT , conn } from "./config.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const jsonparser = bodyParser.json()

//app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
/*validation and add

*/



app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello from MERN stack!');
});

