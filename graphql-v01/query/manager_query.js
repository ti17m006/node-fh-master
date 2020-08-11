
const { Managers, Workers, GeolocationNumber } = require('../../database/mogodb_connection');
const { validateLogin } = require('../../joi_schema/joi_schema');
const { compare } = require('../../miscellaneous/bcryptHash');
const { errorMessageToken, signatureManager, verifyManager } = require('../../miscellaneous/jwtModels');

module.exports.login = async (manager) => {
    try {
        let _manager = {
            username: manager.username.toString(),
            password: manager.password.toString()
        };
        const check = validateLogin(_manager);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const payload = await Managers.findOne({ username: _manager.username });
            if (!payload) {
                throw 'Manager does not exist';
            } else {
                if (await compare(_manager.password, payload.password)) {
                    return signatureManager(payload);
                } else {
                    throw errorMessageToken.invalid;
                }
            }

        }
    } catch (exception) {
        console.error(exception);
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
 * 
 * // const t = await GeolocationNumber.find({ workerId: _workerId });
// .then((success) => {
//     // const t = GeolocationNumber.find({ workerId: _workerId })
//     //     .then((result) => ({ result }))
//     //     .catch((error) => { throw error });
//     return success;
// })
// .catch((error) => { throw error });
 */
module.exports.getWorker = async (args, headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
            throw errorMessageToken.invalid;
        }
        let _workerId = args.id;
        let _username = args.username;
        return await Workers.findOne({ username: _username });
    } catch (exception) {
        console.error(exception);
        return exception;
    }
};



/**
 *
 * @param {Number} args username 
 * @param {Object} headers authorization - 'jwt token'
 * 
 * .then((success) => { console.log(success); return success })
            .catch((error) => { throw error });
 */
module.exports.getWorkers = async (headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
            throw errorMessageToken.invalid;
        }
        return await Workers.find({});
    } catch (exception) {
        console.error(exception);
        return exception;
    }
};


// module.exports.location = async () => { };
// module.exports.locations = async () => { };