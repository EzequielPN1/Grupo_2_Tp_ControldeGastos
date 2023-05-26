import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RouterUsuario from './router/usuarios.js';
import config from "./config.js";
import RouterGasto from './router/gastos.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(new RouterUsuario().start())
app.use('/gastos', new RouterGasto().start())

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});