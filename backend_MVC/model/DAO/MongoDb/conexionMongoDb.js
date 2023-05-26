import mongoose from 'mongoose';

class ConexionMongo {
  
  constructor() {
    this.uri = 'mongodb://127.0.0.1:27017'; // URI de conexión a tu base de datos MongoDB
    this.usuariosMongoDb = null;
  }

  async connectToMongoDB() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Usuario' // Nombre de la base de datos que deseas utilizar
      });
      console.log('Conexión exitosa a MongoDB');

      // Obtener la colección "usuarios" de la base de datos
      this.usuariosMongoDb = mongoose.connection.collection('usuarios');
      
      return this.usuariosMongoDb;
      
    } catch (error) {
      console.error('Error al conectarse a MongoDB:', error);
    }
  }
}

export default ConexionMongo;


