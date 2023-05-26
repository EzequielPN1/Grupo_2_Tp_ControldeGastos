import GastoSqlite from '../model/DAO/Sqlite/gastosSqlite.js'

class ServicioGasto {

    constructor() {
        this.model = new GastoSqlite()
    }

    agregar = async gasto => {
        return await this.model.agregar(gasto)
    }
    
    editar = async (id, gasto) => {
        return await this.model.editar(id, gasto)
    }
    
    eliminar = async (id) => {
        return await this.model.eliminar(id)
    }
    
    listar = async (email) => {
        return await this.model.listar(email)
    }
}

export default ServicioGasto