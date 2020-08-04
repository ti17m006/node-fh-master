const Joi = require('@hapi/joi');

const JoiManager = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
const JoiWorker = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    fullname: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});
const JoiLogin = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(4).max(255).required()
});

const validateManager = (p) => { return Joi.validate(p, JoiManager); };
const validateWorker = (p) => { return Joi.validate(p, JoiWorker); };
const validateLogin = (p) => { return Joi.validate(p, JoiLogin); };

module.exports.validateManager = validateManager;
module.exports.validateWorker = validateWorker;
module.exports.validateLogin = validateLogin;

module.exports.JoiManager = JoiManager;
module.exports.JoiWorker = JoiWorker;
module.exports.JoiLogin = JoiLogin;