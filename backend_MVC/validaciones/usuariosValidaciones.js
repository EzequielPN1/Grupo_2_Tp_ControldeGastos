import Joi from "joi"


export const validar = (email, celular, nombre, pass, apellido, fechaNac, dni) => {
    
    //email, celular, nombre, pass, apellido, fechaNac, dni

    const usuarioSchema = Joi.object({
        email: Joi.string().email.required(),
        celular: Joi.number().precision(10).required(),
        nombre: Joi.string().required(),
        pass: Joi.string().alpanum().required(),
        apellido: Joi.string().required(),
        fechaNac: Joi.date().required(),
        dni: Joi.number().integer().required(),

    })
    
    const { error } = usuarioSchema.validate(email, celular, nombre, pass, apellido, fechaNac, dni);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
