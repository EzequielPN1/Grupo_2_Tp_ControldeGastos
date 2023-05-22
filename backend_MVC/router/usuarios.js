import express from "express";
import usuarios from '../controlador/usuarios.js';

const routerUsuarios = express.Router()

routerUsuarios.post("/register",usuarios.registro)
routerUsuarios.post("/login", usuarios.login)
routerUsuarios.post("/editarUsuario",usuarios.editarUsuario)
routerUsuarios.get("/confirmar",usuarios.confirmar)
routerUsuarios.post("/enviarCorreoNuevaPass",usuarios.enviarCorreoNuevaPass)
routerUsuarios.post("/cambiarContrasenia",usuarios.cambiarContrasenia)

export {
    routerUsuarios
}