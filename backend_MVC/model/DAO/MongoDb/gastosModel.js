import ConexionMongo from './conexionMongoDb.js'


class GastosMongoDb {

  constructor() {
    this.gastosCollection = null;
        this.init();
  }

  async init() {
    try {
        const conexionMongo = new ConexionMongo();
        await conexionMongo.connectToMongoDB();
        this.gastosCollection = await conexionMongo.gastosColeccion()
    } catch (error) {
        console.error(error);
    }
}


agregar = async (gasto) => {
  try {
    const { email, titulo, monto, fecha, categoria, descripcion } = gasto;
    
    const newGasto ={
      email:email,
      titulo:titulo,
      monto:monto,
      fecha:fecha,
      categoria:categoria,
      descripcion:descripcion,
    };

    await this.gastosCollection.insertOne(newGasto)
    
    return "Gasto registrado correctamente";
  } catch (error) {
    console.log(error);
    throw new Error("Error al agregar gasto: " + error.message);
  }
};


listar = async (email) => {
  try {
    const gastos = await this.gastosCollection.find({ email }).toArray();
    return gastos;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener la lista de gastos: " + error.message);
  }
};



}

export default GastosMongoDb