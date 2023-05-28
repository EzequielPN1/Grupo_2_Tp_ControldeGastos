import CategoriaSqlite from '../model/DAO/Sqlite/categoriasSqlite.js'

class ServicioCategoria {

    constructor() {
        this.model = new CategoriaSqlite()
    }

    agregar = async categoria => {
        return await this.model.agregar(categoria)
    }
    
    editar = async (id, categoria) => {
        return await this.model.editar(id, categoria)
    }
    
    eliminar = async (id) => {
        return await this.model.eliminar(id)
    }
    
    listar = async (email) => {
        return await this.model.listar(email)
    }
}

export default ServicioCategoria