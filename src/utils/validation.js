const joi =require('joi');
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).requires(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});

module.exorts={
    registerSchema,
    loginSchema
};