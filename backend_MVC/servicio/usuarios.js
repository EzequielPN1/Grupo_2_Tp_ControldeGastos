import usuarios from "../model/usuarios.js"
import bcrypt from 'bcrypt'; //libreria para importar el hash y salt


const registro = async (email, nombre, pass) => {
  try {
    const salt = await bcrypt.genSalt(10); // generamos el salt de forma asincrónica
    const hash = await bcrypt.hash(pass, salt); // generamos el hash de forma asincrónica

    await usuarios.registro(email, nombre, hash); // registramos el usuario con el hash

    return "Usuario registrado correctamente";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



   
const login = async (email, pass) => {
  try {
    const usuario = await usuarios.login(email); // Obtener el usuario de la base de datos

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    
    const match = await bcrypt.compare(pass, usuario.pass); // Comparar la contraseña ingresada con el hash almacenado
    if (match) {
       if(usuario.registro == 0){
        throw new Error("Cuenta no confirmada");
       }else{
        console.log("Inicio de sesión exitoso");
        return usuario;
       }
    } else {
      throw new Error("Contraseña incorrecta");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

   
   const editarUsuario = async (email, nombre) => {
    try {
      const usuario = await usuarios.editarUsuario(nombre,email)
      console.log(usuario);
      return usuario;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };


const confirmarRegistro = async (email) => {
  try {
    await usuarios.confirmarRegistro(email)
    console.log('Registro confirmado correctamente');   
  } catch (error) {
    console.log(error);
    throw new Error("Error al confirmar el registro");
  }
}

const cambiarContrasenia = async (email, nuevaPass) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(nuevaPass, salt);
    await usuarios.cambiarContrasenia(email, hash);
  } catch (error) {
    if (error === "El correo electrónico no está registrado") {
      throw new Error("Error email no registrado");
    } else {
      throw new Error("Error al cambiar la contraseñia");
    }
  }
};




   export default {
     registro,
     login,
     editarUsuario,
     confirmarRegistro,
     cambiarContrasenia
   };





