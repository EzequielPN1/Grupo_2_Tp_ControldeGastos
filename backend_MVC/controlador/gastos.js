import gastos from '../servicio/gastos.js'

const agregar = async (req,res) => {
    try {
        let gasto = req.body
        await gastos.agregar(gasto)
        res.status(200).send("Gasto ingresado correctamente");
    }
    catch(e) {
        res.status(500).send("Error al agregar gasto: ", e);
    }
}

export default {
    agregar
}