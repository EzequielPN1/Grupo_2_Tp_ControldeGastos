import ServicioCategoria from '../servicio/categorias.js'

class ControladorCategoria {

    constructor() {
        this.categorias = new ServicioCategoria()
    }

    agregar = async (req,res) => {
        try {
            let categoria = req.body
            console.log(categoria);
            const respuesta = await this.categorias.agregar(categoria)
            res.status(200).send(respuesta);
        }
        catch(error) {
            console.log(error.message)
            res.status(500).send(error.message);
        }
        
    }


    
    
    editar = async (req,res) => {
        try {
            let id = req.params.id
            let categoria = req.body
            await this.categorias.editar(id, categoria)
            res.status(200).send("Categoria editada correctamente");
        }
        catch(e) {
            res.status(500).send("Error al editar categoria: ", e);
        }
    }
    
    eliminar = async (req,res) => {
        try {
            let id = req.params.id
            await this.categorias.eliminar(id)
            res.status(200).send("Categoria eliminada correctamente");
        }
        catch(e) {
            res.status(500).send("Error al editar categoria: ", e);
        }
    }
    
    listar = async (req, res) => {
        const email = req.params.email
        await this.categorias.listar(email)
          .then(categorias => {
            res.status(200).json(categorias);
          })
          .catch(error => {
            res.status(500).send("Error interno del servidor.", error);
          });
    };
}

export default ControladorCategoria