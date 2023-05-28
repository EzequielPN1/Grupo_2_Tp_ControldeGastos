import express from "express"
import ControladorCategoria from '../controlador/categorias.js'

class RouterCategoria {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorCategoria()
    }

    start() {
        this.router.post("/agregar", this.controlador.agregar)
        this.router.put("/editar/:id", this.controlador.editar)
        this.router.delete("/eliminar/:id", this.controlador.eliminar)
        this.router.get("/listar/:email", this.controlador.listar)

        return this.router
    }
}

export default RouterCategoria