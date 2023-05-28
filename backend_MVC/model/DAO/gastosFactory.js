import ModelSqlite from "./Sqlite/gastosSqlite.js"
import ModelMongodb from "./MongoDb/gastosModel.js"

class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                console.log("Usando la base de datos sqlite para los gastos.");
                return new ModelSqlite()
                
            case 'mongoDb':
                console.log("Usando la base de datos MongoDb para los gastos.");
                return new ModelMongodb()

            default:
                console.log("Usando la base de datos sqlite.(Default)");
                return new ModelSqlite()
        }
    }
}

export default ModelFactory