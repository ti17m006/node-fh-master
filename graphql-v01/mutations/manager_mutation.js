const { Managers, Workers } = require('../../database/mogodb_connection');
const { hashPasword } = require('../miscellaneous/bcryptHash');
const { validateManager } = require('../../joi_schema/joi_schema');

// register
module.exports.register = async (manager) => {
    try {
        let local_manager = {
            id: manager.id,
            fullname: manager.fullname,
            username: manager.username,
            password: manager.password
        };
        const check = validateManager(local_manager);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const result = await Managers.findOne({ username: local_manager.username });
            if (result) {
                throw 'Manager exists';
            }
            local_manager.password = await hashPasword(local_manager.password);
            return Managers.create(local_manager)
                .then((success) => {
                    if (success) {
                        console.log('Successfully saved\n', success);
                        return true;
                    } else {
                        throw 'Not saved';
                    }
                })
                .catch((e) => {
                    console.error(e);
                    return false;
                });
        };
    } catch (exception) {
        console.error(exception);
        return false;
    }
}



