import express from "express";
import usuarios from '../controlador/usuarios.js'


const router = express.Router()

router.post("/register",usuarios.registro)
router.post("/login", usuarios.login)
router.post("/editarUsuario",usuarios.editarUsuario)
router.get("/confirmar",usuarios.confirmar)
router.post("/enviarCorreoNuevaPass",usuarios.enviarCorreoNuevaPass)
router.post("/cambiarContrasenia",usuarios.cambiarContrasenia)


export {
    router
}