import ModelSqlite from "./Sqlite/categoriasSqlite.js"
//import ModelMongodb from "./MongoDb/categoriasModel.js"

class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                console.log("Usando la base de datos sqlite para las categorias.");
                return new ModelSqlite()
                
            case 'mongoDb':
                console.log("Usando la base de datos MongoDb  para  las categorias.");
                return new ModelMongodb()

            default:
                console.log("Usando la base de datos sqlite  las categorias.(Default)");
                return new ModelSqlite()
        }
    }
}

export default ModelFactory