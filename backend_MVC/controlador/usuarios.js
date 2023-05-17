import ServicioUsuarios from "../servicio/usuarios.js"
import jwt from 'jsonwebtoken';
import Autentificador from './autentificador.js'
import Correo from './correo.js';


const secretKey = 'secreto';
// Generar token
const generateToken = (id, tiempoExpiracion) => {
  const token = jwt.sign({ userId: id }, secretKey, { expiresIn: tiempoExpiracion });
  return token;
};


class Controlador {

  constructor() {
    this.servicio = new ServicioUsuarios()
    this.autentificador = new Autentificador()
    this.correo = new Correo()
  }


  registro = async (req, res) => {
    try {
      const email = req.body.email;
      const nombre = req.body.nombre;
      const pass = req.body.pass;

      const respuesta = await this.servicio.registro(email, nombre, pass);

      const token = generateToken(email, '1h');
      await this.correo.enviarCorreoConfirmacion(token, email);

      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };


  login = async (req, res) => {
    try {
      const email = req.body.email;
      const pass = req.body.pass;

      const usuario = await this.servicio.login(email, pass);
      const token = generateToken(email, '20s');
      usuario.token = token;

      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };


  editarUsuario = async (req, res) => {
    try {
      const email = req.body.email;
      const nombre = req.body.nombre;

      await this.autentificador.autentificarToken(req.body.token);

      const usuario = await this.servicio.editarUsuario(nombre, email);
      const token = generateToken(email, '20s');
      usuario.token = token;
      res.status(200).json(usuario);

    } catch (error) {
      res.status(401).send('Tiempo de espera ha expirado');
    }
  }


  confirmar = async (req, res) => {
    try {
      const email = req.query.email;
      const token = req.query.token;

      const decodedToken = jwt.verify(token, secretKey);
      const emailDecodificado = decodedToken.userId;

      if (email === emailDecodificado) {
        await this.servicio.confirmarRegistro(emailDecodificado);
        res.send('<h1>Registro confirmado</h1>');
      } else {
        res.send('Email no válido');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(500).send('Error al verificar el token');
    }
  };


  enviarCorreoNuevaPass = async (req, res) => {
    try {
      const email = req.body.email;
      console.log("solicitud cambio de pass enviado a "+email);
      await this.correo.enviarCorreoCambioPass(email);  
      res.status(200).json();
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    }
  };


  cambiarContrasenia = async (req, res) => {
    try {
      const email = req.body.email;
      const nuevaPass = req.body.newPassword;
      await this.servicio.cambiarContrasenia(email, nuevaPass);
      console.log("contraseña del email " + email +" modificada")
      res.status(200).json();
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  };

  
};


export default Controlador



