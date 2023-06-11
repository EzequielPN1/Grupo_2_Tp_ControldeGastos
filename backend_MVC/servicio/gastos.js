import ModelFactory from "../model/DAO/gastosFactory.js"
import config from "../config.js";
import { validar } from '../validaciones/gastosValidaciones.js'

class ServicioGasto {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA) 
    }

    agregar = async gasto => {
        const res = validar(gasto)
       
        if(res.result) {
            const gastoGuardado = await this.model.agregar(gasto)
            return gastoGuardado
        }
        else {
            throw res.error
        }
    }
    
    editar = async (gasto) => {
        return await this.model.editar(gasto)
    }
    
    eliminar = async (gasto) => {
        return await this.model.eliminar(gasto)
    }
    
    listar = async (email) => {
        return await this.model.listar(email)
    }
}

export default ServicioGasto