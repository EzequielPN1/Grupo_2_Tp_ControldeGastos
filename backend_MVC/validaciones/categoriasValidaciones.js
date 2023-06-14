import Joi from "joi"


export const validar = categoria => {

    const categoriaSchema = Joi.object({
        id: Joi.string().allow(''),
        email: Joi.string().email().required(),
        nombre: Joi.string().required(),
        presupuesto: Joi.number().positive().required(),

    })
    
    const { error } = categoriaSchema.validate(categoria);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
