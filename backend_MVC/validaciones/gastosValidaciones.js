import Joi from "joi"


export const validar = gasto => {
    
    //mail, titulo, monto, fecha, idCategoria, descripcion 

    const gastoSchema = Joi.object({
        mail: Joi.string().email().required(),
        titulo: Joi.string().alphanum().required(),
        monto: Joi.number().integer().required(),
        fecha: Joi.date().required(),
        idCategoria: Joi.number().integer().required(),
        descripcion: Joi.string(),
    })
    
    const { error } = gastoSchema.validate(gasto);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}