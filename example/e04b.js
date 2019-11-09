/** DB connection */
const localhost = '127.0.0.1:27017';
const database = 'example04';
const dblink = `mongodb://${localhost}/${database}`;
const Model = require('./e04c.js');
const mongoose = require('mongoose');
class Database {
    constructor() {
        mongoose.connect(dblink, { useNewUrlParser: true })
            .then(() => { console.log('Successfully connected to a db\n'); })
            .catch(() => { console.error('Failed to connect to a db\n'); });
    }
    createManager() { 
        return mongoose.model('Managers', new mongoose.Schema(Model.Manager));
    }
    createUser() {
        return mongoose.model('Users', new mongoose.Schema(Model.User));
     }
    createGeolocation() {
        return mongoose.model('Geolocations', new mongoose.Schema('Geolocations', Model.Geolocation));
     }
}
module.exports = new Database();