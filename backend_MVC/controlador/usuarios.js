import ServicioUsuarios from "../servicio/usuarios.js"
import Autentificador from './autentificador.js'
import Correo from './correo.js';





class Controlador {

  constructor() {
    this.servicio = new ServicioUsuarios()
    this.autentificador = new Autentificador()
    this.correo = new Correo()
  }


  registro = async (req, res) => {
    try {
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const email = req.body.email;
      const fechaNac = req.body.fechaNacimiento;
      const dni = req.body.dni;
      const saldo = req.body.saldo;
      const pass = req.body.pass;
      const respuesta = await this.servicio.registro(email, nombre, pass,apellido,fechaNac,dni,saldo);
      const token = this.autentificador.generateTokenTiempo(email, '1h');
      await this.correo.enviarCorreoConfirmacion(token, email);
      console.log("Usuario a confirmar registro " + email)
      res.status(200).send(respuesta);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };


  login = async (req, res) => {
    try {
      const email = req.body.email;
      const pass = req.body.pass;
      const usuario = await this.servicio.login(email, pass);
      const token = this.autentificador.generateTokenTiempo(email, '20s');
      usuario.token = token;
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };


  editarUsuario = async (req, res) => {
    try {
      const email = req.body.email;
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const saldo = req.body.saldo;

      await this.autentificador.autentificarToken(req.body.token);

      const usuario = await this.servicio.editarUsuario(nombre, email,apellido,saldo);
      const token = this.autentificador.generateTokenTiempo(email, '20s');
      usuario.token = token;
      console.log("Usuario "+ email +" editado correctamente")
      res.status(200).json(usuario);

    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }


  confirmar = async (req, res) => {
    try {
      const email = req.query.email;
      const token = req.query.token;

      const decodedToken = this.autentificador.decodificarToken(token)
      const emailDecodificado = decodedToken.userId;

      if (email === emailDecodificado) {
        await this.servicio.confirmarRegistro(emailDecodificado);
        res.status(200).send('<div style="background-color: #f3f3f3; padding: 20px; text-align: center;"><h1 style="color: #333;">¡Registro confirmado!</h1></div>');

      } else {
        res.send('Email no válido');
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  };


  enviarCorreoNuevaPass = async (req, res) => {
    try {
      const email = req.body.email;
      await this.servicio.esValido(email);
      const token = this.autentificador.generateTokenTiempo(email, '10m');
      await this.correo.enviarCorreoCambioPass(email,token);  
      console.log("solicitud cambio de pass enviado a "+ email);
      res.status(200).json();
    } catch (error) {
      console.error('Error al enviar el correo:'+ error.message);
      res.status(500).send(error.message);
    }
  };


  cambiarContrasenia = async (req, res) => {
    try {
      const email = req.body.email;
      const nuevaPass = req.body.newPassword;
      const token = req.body.token;
      //chequear Token
      console.log("Token " + token)
      await this.autentificador.autentificarToken(token);
      await this.servicio.cambiarContrasenia(email, nuevaPass);
      console.log("contraseña del email " + email +" modificada")
      res.status(200).json('Contraseña cambiada exitosamente');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  
};


export default Controlador



