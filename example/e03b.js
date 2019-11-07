/** DB connect */
const localhost = '127.0.0.1:27017';
const database = 'example02';
const dblink = `mongodb://${localhost}/${database}`;
const Model = require('./e03c');
const mongoose = require('mongoose');
class Database {
    constructor() {
        mongoose.connect(dblink, { useNewUrlParser:true})
        .then(() => {
            console.log('Successfully connected to database\n');
        })
        .catch(() => {
            console.error('Could not connect to database\n', error);
        });
    }
    createUserModel() {
        return mongoose.model('Users', new mongoose.Schema(Model.User));
    }
}
module.exports = new Database();