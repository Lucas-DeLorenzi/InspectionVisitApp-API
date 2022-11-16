const joi = require('joi')

module.exports =  async (req, res, next) => {

    const passwordSchema = joi.object({
        password: joi
            .string()
            .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
            .min(6)
            .max(30)
            .required()
            .messages({
                "string.min": "La contraseña debe contener al menos 6 caracteres",
                "string.max": "La contraseña debe contener como máximo 30 caracteres",
                "string.empty": "El campo para la contraseña es obligatorio",
                "string.pattern.base": "La contraseña debe contener caracteres alfanumericos, al menos uno de cada uno",
                "any.required": "El campo para la contraseña es obligatorio",
            })
    });

    const validate = passwordSchema.validate({password: req.body.password});
    if (validate.error) {
        return res.status(400).json({
            msg: 'Ocurrió un error',
            error: validate.error.details[0].message,
        });
    } else {
        next();
    }

}