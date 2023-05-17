import ModelUsuario from "../model/usuariosSqlite.js"
import bcrypt from 'bcrypt'; //libreria para importar el hash y salt



class Servicio {

  constructor() {
    this.model = new ModelUsuario()
  }

  registro = async (email, nombre, pass) => {
    try {
      const salt = await bcrypt.genSalt(10); // generamos el salt de forma asincrónica
      const hash = await bcrypt.hash(pass, salt); // generamos el hash de forma asincrónica
      const respuesta = await this.model.registro(email, nombre, hash); // registramos el usuario con el hash
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };




  login = async (email, pass) => {
    try {
      const usuario = await this.model.login(email); // Obtener el usuario de la base de datos

      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }

      const match = await bcrypt.compare(pass, usuario.pass); // Comparar la contraseña ingresada con el hash almacenado
      if (match) {
        if (usuario.registro == 0) {
          throw new Error("Cuenta no confirmada");
        } else {
          console.log("Inicio de sesión exitoso");
          return usuario;
        }
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      throw new Error(error);
    }
  };


  editarUsuario = async (email, nombre) => {
    try {
      const usuario = await this.model.editarUsuario(nombre, email)
      console.log(usuario);
      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  };


  confirmarRegistro = async (email) => {
    try {
      await this.model.confirmarRegistro(email)
      console.log('Registro del email ' + email + ' confirmado correctamente');
    } catch (error) {
      throw new Error("Error al confirmar el registro");
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

}


export default Servicio





