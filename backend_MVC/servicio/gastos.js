import ModelFactory from "../model/DAO/gastosFactory.js"
import config from "../config.js";

class ServicioGasto {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA) 
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