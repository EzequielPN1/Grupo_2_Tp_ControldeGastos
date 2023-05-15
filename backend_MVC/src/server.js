import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from '../router/usuarios.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.use(router)



const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});










