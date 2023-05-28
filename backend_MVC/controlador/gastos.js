import ServicioUsuario from '../servicio/gastos.js'

class ControladorGasto {

    constructor() {
        this.gastos = new ServicioUsuario()
    }

    agregar = async (req, res) => {
        try {
            let gasto = req.body
            console.log(gasto);
            await this.gastos.agregar(gasto)
            res.status(200).send("Gasto ingresado correctamente");
            console.log(req.body);
        }
        catch (e) {
            res.status(500).send("Error al agregar gasto: ", e);
        }
    }

    editar = async (req, res) => {
        try {
            let gasto = req.body
            await this.gastos.editar(gasto)
            res.status(200).send("Gasto editado correctamente");
        }
        catch (e) {
            res.status(500).send("Error al editar gasto: ", e);
        }
    }

    eliminar = async (req, res) => {
        try {
            let gasto = req.body
            await this.gastos.eliminar(gasto)
            res.status(200).send("Gasto eliminado correctamente");
        }
        catch (e) {
            res.status(500).send("Error al editar gasto: ", e);
        }
    }

    listar = async (req, res) => {
        try {
          let email = req.params.email;
          const gastos = await this.gastos.listar(email);
          res.status(200).json(gastos);
        } catch (error) {
          res.status(500).send("Error interno del servidor.");
        }
      };
      
}

export default ControladorGasto