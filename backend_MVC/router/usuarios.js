import express from "express";
import ControladorUsuario from '../controlador/usuarios.js'


class Router {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorUsuario()
    }


    start() {
        this.router.post("/register", this.controlador.registro)
        this.router.post("/login", this.controlador.login)
        this.router.post("/editarUsuario", this.controlador.editarUsuario)
        this.router.get("/confirmar", this.controlador.confirmar)
        this.router.post("/enviarCorreoNuevaPass", this.controlador.enviarCorreoNuevaPass)
        this.router.post("/cambiarContrasenia", this.controlador.cambiarContrasenia)

        return this.router
    }



}



export default Router