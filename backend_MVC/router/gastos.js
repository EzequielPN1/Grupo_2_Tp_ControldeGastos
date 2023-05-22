import express from "express"
import gastos from '../controlador/gastos.js'

const routerGastos = express.Router()

routerGastos.post("/agregar", gastos.agregar)
// routerGastos.put("/editar", gastos.editar)
// routerGastos.delete("/eliminar", gastos.eliminar)
// routerGastos.get("/listar", gastos.listar)

export {
    routerGastos
}