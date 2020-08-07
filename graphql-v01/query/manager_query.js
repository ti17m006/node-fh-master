
const { Managers } = require('../../database/mogodb_connection');
const { validateLogin } = require('../../joi_schema/joi_schema');
const { compare } = require('../../miscellaneous/bcryptHash');
const { errorMessageToken, signatureManager, verifyManager } = require('../../miscellaneous/jwtModels');

const privateKey = `superunknown`;

module.exports.current = async (args, header) => {
    try {
        if (!header.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(header.authorization)) {
            throw errorMessageToken.invalid;
        } else {
            if (args.username) {
                return Managers.findOne({ username: args.username });
            } else {
                throw `Not found in db -> ${result} `;
            }
        }
    } catch (exception) {
        console.error(exception);
        return exception;
    }
};

/**
 * 
 * @param manager has username and password,
 * @return jwt token
 */
module.exports.login = async (manager) => {
    try {
        let local_manager = {
            username: manager.username.toString(),
            password: manager.password.toString()
        };
        const check = validateLogin(local_manager);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const payload = await Managers.findOne({ username: local_manager.username });
            console.log(payload);
            if (!payload) {
                throw 'Manager does not exist';
            } else {
                if (await compare(local_manager.password, payload.password)) {
                    return signatureManager(payload, privateKey);
                } else {
                    throw errorMessageToken.invalid;
                }
            }

        }
    } catch (exception) {
        console.error(exception);
        return exception
    }
};