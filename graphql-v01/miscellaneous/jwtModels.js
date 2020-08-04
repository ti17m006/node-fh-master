const jsonwebtoken = require('jsonwebtoken');



module.exports.errorMessageToken = {
    empty: "Empty token",
    invalid: "Invalid token"
};

module.exports.signManager = (payload, privateKey) => {
    return jsonwebtoken.sign({
        id: payload.id,
        username: payload.username
    }, privateKey);
};