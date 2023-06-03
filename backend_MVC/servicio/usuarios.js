import ModelFactory from "../model/DAO/usuariosFactory.js"
import bcrypt from 'bcrypt'; //libreria para importar el hash y salt
import config from "../config.js";
import CalculadorEdad from "../servicio/calculadorEdad.js"

class ServicioUsuario {

  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
  }

  registro = async (email,celular, nombre, pass, apellido, fechaNac, dni) => {
    try {

      let edad = CalculadorEdad.calcularEdad(fechaNac)

      if (edad < 18) {
        throw new Error("Edad no valida para registrarse");
      }

      const salt = await bcrypt.genSalt(10); // generamos el salt de forma asincrónica
      const hash = await bcrypt.hash(pass, salt); // generamos el hash de forma asincrónica
      const respuesta = await this.model.registro(email,celular, nombre, hash, apellido, fechaNac, dni); // registramos el usuario con el hash
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (email, pass) => {
    try {
      const usuario = await this.model.login(email); // Obtener el usuario de la base de datos
      const match = await bcrypt.compare(pass, usuario.pass); // Comparar la contraseña ingresada con el hash almacenado
      if (match) {
        if (usuario.registro == 0) {
          throw new Error("Cuenta no confirmada");
        } else {
          console.log("Inicio de sesión exitoso de " + email);
          return usuario;
        }
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  editarUsuario = async (email,celular, nombre, apellido) => {
    try {
      const usuario = await this.model.editarUsuario(email,celular, nombre, apellido)
      console.log(usuario);
      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  };

  confirmarRegistro = async (email) => {
    try {
     const usuario =  await this.model.confirmarRegistro(email)
      console.log('Registro del email ' + email + ' confirmado correctamente');
      return usuario;
    } catch (error) {
      throw new Error("Error al confirmar el registro");
    }
  }


  chequearConfirmacion = async(email) => {
    try{
        let confirmado = await this.model.chequearConfirmacion(email);
        return confirmado;
    } catch (error) {
      throw new Error("Error al chequear la Confirmacion");
    }
  }

  esValido = async (email) => {
    try {
      await this.model.login(email); // Obtener el usuario de la base de datos
    } catch (error) {
      throw new Error(error);
    }

  }

  cambiarContrasenia = async (email, nuevaPass) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nuevaPass, salt);
      await this.model.cambiarContrasenia(email, hash);
    } catch (error) {
      throw new Error(error);
    }
  };

  eliminarCuenta = async (pass, email) => {
    try {
      const usuario = await this.model.login(email); // Obtener el usuario de la base de datos
      const match = await bcrypt.compare(pass, usuario.pass); // Comparar la contraseña ingresada con el hash almacenado
      if (match) {
        await this.model.eliminarCuenta(email);
      } else {
        throw new Error("Contraseña invalida");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default ServicioUsuario