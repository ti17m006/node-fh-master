
const { Managers, Workers } = require('../../database/mogodb_connection');
const { validateLogin, validateManager } = require('../../joi_schema/joi_schema');
const { compare } = require('../../miscellaneous/bcryptHash');
const { errorMessageToken, signatureManager, verifyManager } = require('../../miscellaneous/jwtModels');

const privateKey = `superunknown`;

/**
 *
 * @param {object} manager 
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


/**
 *
 * @param {Number} args username
 * @param {Object} headers authorization - 'jwt token'
 */
module.exports.current = async (args, headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
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
 * @param {Number} args username 
 * @param {Object} headers authorization - 'jwt token'
 */
module.exports.getWorker = async (args, headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
            throw errorMessageToken.invalid;
        }
        let _username = args.username;
        return Workers.findOne({ username: _username })
            .then((success) => { console.log(success); return success })
            .catch((error) => { throw error });
    } catch (exception) {
        console.error(exception);
        return exception;
    }
};

/**
 *
 * @param {Number} args username 
 * @param {Object} headers authorization - 'jwt token'
 */
module.exports.getWorkers = async (headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
            throw errorMessageToken.invalid;
        }
        return Workers.find({})
            .then((success) => { console.log(success); return success })
            .catch((error) => { throw error });
    } catch (exception) {
        console.error(exception);
        return exception;
    }
};

// module.exports.location = async () => { };
// module.exports.locations = async () => { };