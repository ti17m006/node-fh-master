/**
 * Database connection - Strat
 */

const localhost = '127.0.0.1:27017';
const database = 'user-02';
const dblink = `mongodb://${localhost}/${database}`;

const Model = require('./t09a04-models');

const mongoose = require('mongoose');

class Database {

    constructor() {
        mongoose.connect(dblink, { useNewUrlParser: true })
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
    createGeolocationModel() {
        return mongoose.model('Geolocations', new mongoose.Schema(Model.Geolocation));
    }
    createMetadataModel() {
        return mongoose.model('Metadata', new mongoose.Schema(Model.Metadata));
    }
    
    // userExists() {
    //     return 
    // }
}

module.exports = new Database();
/**
 * Database connection - End
 */