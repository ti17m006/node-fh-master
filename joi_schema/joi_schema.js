const Joi = require('@hapi/joi');

const JoiManager = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
const JoiWorker = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
const JoiLogin = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(10).max(255).required()
});

const validateManager = (p) => { return Joi.validate(p, JoiManager); };

module.exports.validateManager = validateManager;

module.exports.JoiManager = JoiManager;
module.exports.JoiWorker = JoiWorker;
module.exports.JoiLogin = JoiLogin;