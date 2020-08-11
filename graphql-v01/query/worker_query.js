
const { validateLogin } = require('../../joi_schema/joi_schema');
const { signatureWorker, errorMessageToken } = require('../../miscellaneous/jwtModels');
const { compare } = require('../../miscellaneous/bcryptHash');
const { Workers } = require('../../database/mogodb_connection');

module.exports.login = async (worker) => {
    try {
        let _worker = {
            username: worker.username.toString(),
            password: worker.password.toString()
        }
        const check = validateLogin(_worker);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const payload = await Workers.findOne({ username: _worker.username });
            if (!payload) {
                throw 'Worker does not exist';
            } else {
                if (await compare(_worker.password, payload.password)) {
                    return `${signatureWorker(payload)} with an id: ${payload.id}`;
                } else {
                    throw errorMessageToken.invalid;
                }
            }
        }
    } catch (exception) {
        console.error(exception);
    }
}

