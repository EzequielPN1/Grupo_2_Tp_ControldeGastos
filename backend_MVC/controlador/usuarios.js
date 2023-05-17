import usuarios from "../servicio/usuarios.js"
import jwt from 'jsonwebtoken';
import middleware from './middleware.js'
import mailer from './mailer.js';

const secretKey = 'secreto';

// Generar token
const generateToken = (id, tiempoExpiracion) => {
  const token = jwt.sign({ userId: id }, secretKey, { expiresIn: tiempoExpiracion });
  return token;
};



const registro = (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  const pass = req.body.pass;
 
  usuarios.registro(email, nombre, pass)
    .then(() => {

      const token = generateToken(email,'1h')
      mailer.enviarCorreoConfirmacion(token,email)
      res.status(200).send("Usuario registrado correctamente");
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Error al registrar usuario");
    });
};




const login = (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  usuarios.login(email, pass)
    .then(usuario => {
      const token = generateToken(email,'20s')
      usuario.token = token;
      res.status(200).json(usuario);
    })
    .catch(error => {
      console.log(error);
           res.status(500).send(error.message);
    });
};



const editarUsuario = (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
try{
  
  middleware.authenticateMiddleware(req.body.token) 

  usuarios.editarUsuario(nombre,email)
    .then((usuario) => {
      const token = generateToken(email,'20s')
      usuario.token = token
      res.status(200).json(usuario);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error.message);
    });
}catch{
  res.status(500).send("Error el tiempo de la pagina ha expirado");
}

};


const confirmar = (req,res) => {

  const email = req.query.email;
  const token = req.query.token;
  

  try {
    const decodedToken = jwt.verify(token, secretKey);
    // Si el token es válido, la variable decodedToken contendrá los datos descifrados del token
    // Puedes extraer la información necesaria del token, como el correo electrónico, para continuar con la confirmación.
    const emailDecodificado = decodedToken.userId;

    if(email === emailDecodificado){
     
      res.send(`<h1>Registro confirmado</h1>`);
      usuarios.confirmarRegistro(emailDecodificado)

    }else{
      res.send('Email no valido');
    }

  } catch (error) {
    // Si el token no es válido o ha expirado, maneja el error apropiadamente.
    console.error('Error al verificar el token:', error);
    // Puedes devolver una respuesta de error al cliente o realizar otras acciones necesarias.
  }

}

const enviarCorreoNuevaPass = (req,res) => {
  const email = req.body.email;
  console.log(email)
  mailer.enviarCorreoCambioPass(email)
  res.status(200).json();
}




const cambiarContrasenia = (req, res) => {
  const email = req.body.email;
  const nuevaPass = req.body.newPassword;

  usuarios.cambiarContrasenia(email, nuevaPass)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      console.log(error.message)
        console.log(error); 
        res.status(500).send(error.message);
      
    });
};




export default {
  registro,
  login,
  editarUsuario,
  confirmar,
  enviarCorreoNuevaPass,
  cambiarContrasenia
}




