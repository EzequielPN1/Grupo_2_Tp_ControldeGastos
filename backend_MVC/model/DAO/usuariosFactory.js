import ModelSqlite from "./Sqlite/usuariosSqlite.js"
import ModelMongodb from "./MongoDb/usuariosModel.js"

class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                console.log("Usando la base de datos sqlite.");
                return new ModelSqlite()
                
            case 'mongoDb':
                console.log("Usando la base de datos MongoDb.");
                  return new ModelMongodb()

            default:
                console.log("Usando la base de datos sqlite.(Default)");
                return new ModelSqlite()

        }


    }
}

export default ModelFactory