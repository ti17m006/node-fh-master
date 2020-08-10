const { Managers, Workers } = require('../../database/mogodb_connection');
const { hashPasword } = require('../../miscellaneous/bcryptHash');
const { validateManager, validateWorker } = require('../../joi_schema/joi_schema');
const { errorMessageToken, verifyManager } = require('../../miscellaneous/jwtModels');

/**
 *
 * @param {"structure: id, fullname, username, password"} manager
 * @returns {boolean} true/false
 */
module.exports.register = async (manager) => {
    try {
        let _manager = {
            id: manager.id,
            fullname: manager.fullname,
            username: manager.username,
            password: manager.password
        };
        const check = validateManager(_manager);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const result = await Managers.findOne({ username: _manager.username });
            if (result) {
                throw 'Manager exists';
            }
            _manager.password = await hashPasword(_manager.password);
            return Managers.create(_manager)
                .then((success) => { console.log(`Manager saved\n${success}`); return true; })
                .catch((error) => { console.error(error); return false });
        }
    } catch (exception) {
        console.error(exception);
        return false;
    }
}

/**
 * 
 * @param {"structure: id, fullname, username, password"} worker 
 * @returns {boolean} true/false
 */
module.exports.newWorker = async (worker, headers) => {
    try {
        if (!headers.authorization) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(headers.authorization)) {
            throw errorMessageToken.invalid;
        } else {
        }
        let _worker = {
            id: worker.id,
            fullname: worker.fullname,
            username: worker.username,
            password: worker.password
        };
        let check = validateWorker(_worker);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const worker_db = await Workers.findOne({ username: _worker.username });
            if (worker_db) {
                throw 'Worker exists.'
            }
            _worker.password = await hashPasword(_worker.password);
            return Workers.create(_worker)
                .then((success) => { console.log(`Worker saved\n${success}`); return true; })
                .catch((error) => { console.error(error); return false });
        }
    } catch (exception) {
        console.error(exception);
        return false;
    }
}

/** deleteWorker from a database
 * @param {"worker's id"} id
 * @returns true or false
 */
// TODO: module.exports.deleteWorker = (id, headers) => { }