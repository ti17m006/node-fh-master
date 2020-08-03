const { genSalt, hash } = require('bcrypt');

const { Managers, Workers } = require('../../database/mogodb_connection');
const { JoiLogin, JoiManager, JoiWorker } = require('../../joi_schema/joi_schema');
const { errorMessageToken, signManager } = require('../schema/jwt_modules');

const privateKey = 'manager_PrivateKey'

// register
module.exports.register = (manager) => {
    // TODO: validation
    Managers.create(manager)
        .then((success) => {
            if (success) {
                console.log('Successfully saved');
            } else {
                throw 'Not saved';
            }
        })
        .catch((e) => {
            console.error(e);
        });
}

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