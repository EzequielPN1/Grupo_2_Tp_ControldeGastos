import jwt from 'jsonwebtoken';

class Autentificador {

  constructor() {
    this.secretKey = 'secreto';
  }
  generateTokenTiempo = (id, tiempoExpiracion) => {
    const token = jwt.sign({ userId: id }, this.secretKey, { expiresIn: tiempoExpiracion });
    return token;
  };

  autentificarToken = (req, res, next) => {
    try {
      // Verificar el token
      const decoded = jwt.verify(req, 'secreto');

      // Si el token es válido, decoded contendrá la información decodificada del token
      console.log("Token valido " + decoded.exp); // Expiration time

    } catch (error) {
      // Si hay un error al verificar el token
      console.error('Error al verificar el token:', error.message);
      throw new Error('Error token expirado');
    }

  };


  decodificarToken(token){
    const decodedToken = jwt.verify(token, this.secretKey);
    return decodedToken
  }

}

export default Autentificador