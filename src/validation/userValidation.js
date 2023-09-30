const Joi = require("joi");


const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    as_id : Joi.number().integer()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

module.exports = {
    registerUserValidation,
    loginUserValidation
}