import Joi from "joi"


export const validar = gasto => {

   
    const gastoSchema = Joi.object({
        email: Joi.string().email().required(),
        titulo: Joi.string().alphanum().required(),
        monto: Joi.number().integer().required(),
        fecha: Joi.string().required(),
        idCategoria: Joi.string().alphanum().required(),
        descripcion: Joi.string().allow(''),
      }).unknown(false).keys({
        idCategoria: Joi.any(),
      });
      
    
    const { error } = gastoSchema.validate(gasto);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}