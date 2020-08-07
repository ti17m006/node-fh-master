
const { Workers } = require('../../database/mogodb_connection');

// login

module.exports.get = (id) => {
    return Workers.findOne({ id: id })
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
}

