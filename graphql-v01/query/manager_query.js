
const { Managers } = require('../../database/mogodb_connection');

module.exports.get = (id) => {
    return Managers.find({ id: id })
        .then((result) => {
            if (result[0]) {
                return result.pop();
            } else {
                throw 'Not found in db';
            }
        })
        .catch((e) => {
            console.error(e);
        });
};