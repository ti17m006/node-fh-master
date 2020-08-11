/** MongoDB Connection */

const mongo_config = require('./mongo_config.json').developer;
const dblink = `mongodb://${mongo_config.server}:${mongo_config.port}/${mongo_config.database}`;

const Model = require('./mongo_models');
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

	disconnect() {
		mongoose.disconnect()
			.then(() => { console.log('The connection is closed\n'); })
			.catch(() => { console.error('The connection failed to close\n'); });
	}
}
module.exports = new Database();
module.exports.Managers = mongoose.model('Managers', new mongoose.Schema(Model.Manager));
module.exports.Workers = mongoose.model('Worker', new mongoose.Schema(Model.Worker));
module.exports.Geolocation = mongoose.model('Geolocation', new mongoose.Schema(Model.Geolocation));
module.exports.GeolocationNumber = mongoose.model('GeolocationNumber', new mongoose.Schema(Model.GeolocationNumber))
