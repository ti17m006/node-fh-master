const { genSalt, hash, compare} = require('bcrypt');

module.exports.hashPasword = async (password) => {
    const rounds = 10;
    let salt = await genSalt(rounds);
    return await hash(password, salt);
}

module.exports.compare = compare;