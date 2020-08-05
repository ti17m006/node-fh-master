const { genSalt, hash, compare } = require('bcrypt');


// https://www.npmjs.com/package/bcrypt saltRounds = 10 recommended   

module.exports.hashPasword = async (password) => {
    const rounds = 10;
    let salt = await genSalt(rounds);
    return await hash(password, salt);
}

module.exports.compare = compare;