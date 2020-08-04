

const { Managers, Workers } = require('../../database/mogodb_connection');
const { validateManager } = require('../../joi_schema/joi_schema');
const { hashPasword } = require('../miscellaneous/bcryptHash');
const { errorMessageToken, signManager } = require('../miscellaneous/jwtModels');

const privateKey = 'manager_PrivateKey'

// register
module.exports.register = async (manager) => {
    let local_manager = {
        id: manager.id,
        fullname: manager.fullname,
        username: manager.username,
        password: manager.password
    };
    try {
        const check = validateManager(local_manager);
        if (check.error) {
            throw `Joi validation failed ${check.error}`;
        } else {
            const result = await Managers.findOne({ username: local_manager.username });
            if (result) {
                throw 'Manager exists';
            }
            local_manager.password = await hashPasword(local_manager.password);
            Managers.create(local_manager)
                .then((success) => {
                    if (success) {
                        console.log('Successfully saved\n', success);
                        return success.id;
                    } else {
                        throw 'Not saved';
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        };
    } catch (e) {
        console.error(e);
        return e;
    }
}


//                 .catch ((e) => {
//     console.error(e);
// })

// login
module.exports.login = (manager) => {

}

// register worker
module.exports.registerWorker = (worker) => {
    Workers.create()
        .then()
        .catch()
}

// /update-worker/:id
module.exports.updateWorker = (id) => {

}

// /delete-worker/:id
module.exports.deleteWorker = (id) => {

}