/**
 * Direct assignment of access token.
 * This code doesn't provide bearer token and 
 * it's for scholar purposes only.
 * 
 */

const jsonwebtoken = require('jsonwebtoken');

module.exports.errorMessageToken = {
    empty: "Empty token",
    invalid: "Invalid token"
};

const privateKeyManager = 'Manager_private_key';
const privateKeyWorker = 'Worker_private_key';

module.exports.signatureManager = (payload) => {
    return jsonwebtoken.sign({
        username: payload.username,
        password: payload.password
    }, privateKeyManager);
};

module.exports.signatureWorker = (payload) => {
    return jsonwebtoken.sign({
        username: payload.username,
        password: payload.password
    }, privateKeyWorker);
};

module.exports.verifyManager = (token) => (jsonwebtoken.verify(token, privateKeyManager));

module.exports.verifyWorker = (token) => (jsonwebtoken.verify(token, privateKeyWorker));