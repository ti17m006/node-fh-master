const Joi = require('@hapi/joi');
module.exports.JoiManager = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(10).max(255).required()
});
module.exports.JoiUser = Joi.object({
    index: Joi.number().integer().required(),
    fullname: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(10).max(255).required()
});