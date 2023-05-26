import express from "express"
import gastos from '../controlador/gastos.js'

const routerGastos = express.Router()

routerGastos.post("/agregar", gastos.agregar)
routerGastos.put("/editar/:id", gastos.editar)
routerGastos.delete("/eliminar/:id", gastos.eliminar)
routerGastos.get("/listar/:email", gastos.listar)

export {
    routerGastos
}