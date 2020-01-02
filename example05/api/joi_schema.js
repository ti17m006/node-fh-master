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
<<<<<<< HEAD
module.exports.JoiManagerLogin = Joi.object();
=======
module.exports.JoiManagerLogin = Joi.object({});
// error
>>>>>>> 18d586a0c60bbf41f368980c482f9fc2ab6e9bf5
