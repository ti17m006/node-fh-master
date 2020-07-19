const Joi = require('@hapi/joi');
module.exports.JoiManager = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
module.exports.JoiWorker = Joi.object({
    id: Joi.number().integer().required(),
    fullname: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
module.exports.JoiLogin = Joi.object({
    username: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
