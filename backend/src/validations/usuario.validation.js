/*no se como poner las  en~e en linux T_T*/
import Joi from 'joi';
export const userBodyValidation = Joi.object({
    /*VALIDACION CORREO*/
    email: Joi.string()
    .email()
    .required()
    .messages({"string.empty":"El email no puede estar vacio",
        "any.required":"El email es obligatorio",
        "string.email": "El email debe tener un formato valido",
    }),
    //VALIDACIONCONTRASENA
    password : Joi.string().
        min(6)
        .max(50)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
            "string.empty":"La contrasena no puede estar vacia",
            "any.required":"La contrasena es obligatoria",
            "string.base": "La contrasena debe ser un texto",
            "string.pattern.base":"La contrasena debe tener solo letras y numeros."
        })
})