const jsonwebtoken = require('jsonwebtoken');

module.exports.errorMessageToken = {
    empty: "Empty token",
    invalid: "Invalid token"
};

module.exports.signature = (payload, privateKey) => {
    return jsonwebtoken.sign({
        id: payload.id,
        username: payload.username
    }, privateKey);
};

module.exports.verify = (token, secret) => (jsonwebtoken.verify(token, secret));