import express from "express"
import ControladorGasto from '../controlador/gastos.js'

class RouterGasto {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorGasto()
    }

    start() {
        this.router.post("/agregar", this.controlador.agregar)
        this.router.put("/editar/:id", this.controlador.editar)
        this.router.delete("/eliminar/:id", this.controlador.eliminar)
        this.router.get("/listar/:email", this.controlador.listar)

        return this.router
    }
}

export default RouterGasto