import ServicioUsuario from "../servicio/usuarios.js"
import Autentificador from './autentificador.js'
import Correo from './correo.js';
import WhatsAppSender from './WhatsAppSender.js';

class ControladorUsuario {

  constructor() {
    this.servicio = new ServicioUsuario()
    this.autentificador = new Autentificador()
    this.correo = new Correo()
    this.WhatsAppSender = new WhatsAppSender()
  }

  inicio = async (req, res) => {
    res.status(200).send('<div style="background-color: #f3f3f3; padding: 20px; text-align: center;"><h1 style="color: #333;">¡Servidor Control Gastos!</h1></div>');
  }

  registro = async (req, res) => {
    try {
      const { nombre, apellido, email, fechaNacimiento, dni, pass, celular } = req.body
      const respuesta = await this.servicio.registro(email, celular, nombre, pass, apellido, fechaNacimiento, dni);
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
      const { email, pass } = req.body
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
      const { email, celular, nombre, apellido } = req.body
      await this.autentificador.autentificarToken(req.body.token);

      const usuario = await this.servicio.editarUsuario(email, celular, nombre, apellido);
      const token = this.autentificador.generateTokenTiempo(email, '20s');
      usuario.token = token;
      console.log("Usuario " + email + " editado correctamente")
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
        let confirmado = await this.servicio.chequearConfirmacion(emailDecodificado);
        
        if (confirmado) {
          const usuario = await this.servicio.confirmarRegistro(emailDecodificado);
          res.status(200).send('<div style="background-color: #f3f3f3; padding: 20px; text-align: center;"><h1 style="color: #333;">¡Registro confirmado!</h1></div>');
          let whatsapp = this.WhatsAppSender.convertirEnNumeroWhatsApp(usuario.celular)
          this.WhatsAppSender.enviarBootPresentacion(whatsapp)
        } else {
          res.status(200).send('<div style="background-color: #f3f3f3; padding: 20px; text-align: center;"><h1 style="color: #333;">¡Su registro ya se confirmo!</h1></div>');
        }


      } else {
        res.send('Email no válido');
      }
    } catch (error) {
      console.log("error conmfirmar")
      console.error(error.message);
      res.status(500).send(error.message);
    }
  };

  enviarCorreoNuevaPass = async (req, res) => {
    try {
      const email = req.body.email;
      await this.servicio.esValido(email);
      const token = this.autentificador.generateTokenTiempo(email, '10m');
      await this.correo.enviarCorreoCambioPass(email, token);
      console.log("solicitud cambio de pass enviado a " + email);
      res.status(200).json();
    } catch (error) {
      console.error('Error al enviar el correo:' + error.message);
      res.status(500).send(error.message);
    }
  };

  cambiarContrasenia = async (req, res) => {
    try {
      const { email, newPassword, token } = req.body
      //chequear Token
      console.log("Token " + token)
      await this.autentificador.autentificarToken(token);
      await this.servicio.cambiarContrasenia(email, newPassword);
      console.log("contraseña del email " + email + " modificada")
      res.status(200).json('Contraseña cambiada exitosamente');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  eliminarCuenta = async (req, res) => {
    try {
      const { pass, token, email } = req.body
      await this.autentificador.autentificarToken(token);
      await this.servicio.eliminarCuenta(pass, email);
      console.log("Cuenta eliminada  con el email " + email)
      res.status(200).json("Cuenta eliminada  con el email " + email);
    } catch (error) {
      console.log("Nose elimino")
      res.status(500).send(error.message);
    }
  };
};

export default ControladorUsuario