/** DB Connection */
const localhost = '127.0.0.1:27017';
const database = 'example05';
const mongoatlas = process.env.MONGODB_URL;
const dblink = `mongodb://${localhost}/${database}` || mongoatlas;
const Model = require('./db_models');
const mongoose = require('mongoose');

class Database {
	constructor() {
		mongoose.connect(dblink,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => { console.log('Successfully connected to a db\n'); })
			.catch(() => { console.error('Failed to connect to a db\n'); });
	}
}
module.exports = new Database();
module.exports.Managers = mongoose.model('Managers', new mongoose.Schema(Model.Manager));
module.exports.Workers = mongoose.model('Worker', new mongoose.Schema(Model.Worker));
module.exports.Geolocation = mongoose.model('Geolocation', new mongoose.Schema(Model.Geolocation));
