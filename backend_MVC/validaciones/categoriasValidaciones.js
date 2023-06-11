import Joi from "joi"


export const validar = categoria => {
    
    // email, nombre, presupuesto 

    const categoriaSchema = Joi.object({
        email: Joi.string().email.required(),
        nombre: Joi.string().alphanum().required(),
        presupuesto: Joi.number().positive().required(),

    })
    
    const { error } = categoriaSchema.validate(categoria);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
