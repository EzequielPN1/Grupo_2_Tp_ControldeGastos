import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  RouterUsuarios  from './router/usuarios.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.use(new RouterUsuarios().start())



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});










