import mongoose from 'mongoose';

class ConexionMongo {

  constructor() {
    this.uri = 'mongodb://127.0.0.1:27017'; 
  }

  async connectToMongoDB() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Usuario' 
      });
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectarse a MongoDB:', error);
    }
  }

  async usuariosColeccion() {
    this.usuariosMongoDb = mongoose.connection.collection('usuarios');
    return this.usuariosMongoDb;
  }

  async gastosColeccion() {
    this.gastosMongodb = mongoose.connection.collection('gastos');
    return this.gastosMongodb;
  }

  async categoriasColeccion() {
    this.categoriasMongodb = mongoose.connection.collection('categorias');
    return this.categoriasMongodb;
  }

}

export default ConexionMongo;


