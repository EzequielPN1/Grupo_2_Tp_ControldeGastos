import jwt from 'jsonwebtoken';

class Autentificador {

 autentificarToken = (req, res, next) => {
  try {
    // Verificar el token
    const decoded = jwt.verify(req, 'secreto');
  
    // Si el token es válido, decoded contendrá la información decodificada del token
    console.log("Token valido "+ decoded.exp); // Expiration time
    
  } catch (error) {
    // Si hay un error al verificar el token
    console.error('Error al verificar el token:', error.message);
    return res.status(401).json();
  }

};

}
  
export default Autentificador