
const { Managers } = require('../../database/mogodb_connection');

module.exports.get = (id) => {
    return Managers.findOne({ id: id })
        .then((result) => {
            if (result) {
                return result;
            } else {
                throw `Not found in db -> ${result} `;
            }
        })
        .catch((e) => {
            console.error(e);
        });
};