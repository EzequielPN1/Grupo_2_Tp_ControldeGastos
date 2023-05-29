import ModelFactory from "../model/DAO/categoriasFactory.js"
import config from "../config.js";

class ServicioCategoria {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA) 
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