import gastos from '../model/gastos.js'

const agregar = async gasto => {
    return await gastos.agregar(gasto)
}

const editar = async (id, gasto) => {
    return await gastos.editar(id, gasto)
}

const eliminar = async (id) => {
    return await gastos.eliminar(id)
}

const listar = async (email) => {
    return await gastos.listar(email)
}

export default {
    agregar,
    editar,
    eliminar,
    listar
}