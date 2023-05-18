import ModelSqlite from "./Sqlite/usuariosSqlite.js"


class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                console.log("Conectado a la base de datos sqlite.");
                return new ModelSqlite()


            default:
                console.log("Conectado a la base de datos sqlite.(Default)");
                return new ModelSqlite()

        }


    }
}

export default ModelFactory