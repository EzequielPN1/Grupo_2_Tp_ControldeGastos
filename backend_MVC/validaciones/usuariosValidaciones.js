import Joi from "joi"


export const validar = (email, celular, nombre, pass, apellido, fechaNac, dni) => {

    const usuarioSchema = Joi.object({
        email: Joi.string().email().required(),
        celular: Joi.string().length(10).required(),
        nombre: Joi.string().required(),
        pass: Joi.string().alphanum().required(),
        apellido: Joi.string().required(),
        fechaNacimiento: Joi.string().required(),
        dni: Joi.string().length(8).required(),
        token: Joi.string().allow(''),
    })
    
    const { error } = usuarioSchema.validate(email, celular, nombre, pass, apellido, fechaNac, dni);
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
