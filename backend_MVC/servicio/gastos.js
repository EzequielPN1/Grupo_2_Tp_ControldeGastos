import gastos from '../model/gastos.js'

const agregar = async gasto => {
    return await gastos.agregar(gasto)
}

export default {
    agregar
}