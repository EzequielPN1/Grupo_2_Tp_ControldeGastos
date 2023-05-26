import ServicioUsuario from '../servicio/gastos.js'

class ControladorGasto {

    constructor() {
        this.gastos = new ServicioUsuario()
    }

    agregar = async (req,res) => {
        try {
            let gasto = req.body
            await this.gastos.agregar(gasto)
            res.status(200).send("Gasto ingresado correctamente");
        }
        catch(e) {
            res.status(500).send("Error al agregar gasto: ", e);
        }
    }
    
    editar = async (req,res) => {
        try {
            let id = req.params.id
            let gasto = req.body
            await this.gastos.editar(id, gasto)
            res.status(200).send("Gasto editado correctamente");
        }
        catch(e) {
            res.status(500).send("Error al editar gasto: ", e);
        }
    }
    
    eliminar = async (req,res) => {
        try {
            let id = req.params.id
            await this.gastos.eliminar(id)
            res.status(200).send("Gasto eliminado correctamente");
        }
        catch(e) {
            res.status(500).send("Error al editar gasto: ", e);
        }
    }
    
    listar = async (req, res) => {
        const email = req.params.email
        await this.gastos.listar(email)
          .then(gastos => {
            res.status(200).json(gastos);
          })
          .catch(error => {
            res.status(500).send("Error interno del servidor.", error);
          });
      };
}

export default ControladorGasto