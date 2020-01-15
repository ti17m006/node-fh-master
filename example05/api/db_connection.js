/** DB Connection */
const localhost = '127.0.0.1:27017';
const database = 'example05';
const dblink = `mongodb://${localhost}/${database}`;
const mongoatlas = `mongodb+srv://master-student:1234@cluster0-eeu87.mongodb.net/test?retryWrites=true&w=majority/${database}`;
const Model= require('./db_models');
const mongoose = require('mongoose');
class Database {
	constructor() {
		mongoose.connect(mongoatlas,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => { console.log('Successfully connected to a db\n'); })
		.catch(() => { console.error('Failed to connect to a db\n'); });
	}
	createCollectionManager() { 
		return mongoose.model('Managers', new mongoose.Schema(Model.Manager));
	}
	createCollectionWorker() {
		return mongoose.model('Workers', new mongoose.Schema(Model.Worker));
	}
	createCollectionGeolocation() {
		return mongoose.model('Geolocations', new mongoose.Schema(Model.Geolocation));	
		}
 }
module.exports = new Database();
