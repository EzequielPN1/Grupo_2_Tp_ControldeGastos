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

const editar = async (req,res) => {
    try {
        let id = req.params.id
        let gasto = req.body
        await gastos.editar(id, gasto)
        res.status(200).send("Gasto editado correctamente");
    }
    catch(e) {
        res.status(500).send("Error al editar gasto: ", e);
    }
}

const eliminar = async (req,res) => {
    try {
        let id = req.params.id
        await gastos.eliminar(id)
        res.status(200).send("Gasto eliminado correctamente");
    }
    catch(e) {
        res.status(500).send("Error al editar gasto: ", e);
    }
}

// const listar = async (req,res) => {
//     try {
//         let email = req.params.email
//         let gastos = await gastos.listar(email)
//         res.status(200).json(gastos);
//     }
//     catch(e) {
//         res.status(500).send("Error al listar gastos: ", e);
//     }
// }

const listar = async (req, res) => {
    const email = req.params.email
    await gastos.listar(email)
      .then(gastos => {
        res.status(200).json(gastos);
      })
      .catch(error => {
        res.status(500).send("Error interno del servidor.", error);
      });
  };

export default {
    agregar, 
    editar,
    eliminar,
    listar
}