/**
	Database connection - Start
*/

const localhost = "127.0.0.1:27017";
const database = "user";
const dblink = `mongodb://${localhost}/${database}`;

const user = require('./test-04.js');

const mongoose = require('mongoose');

class Database {

	constructor() {
		mongoose.connect(dblink, { useNewUrlParser: true })
		.then(() => {
			console.log('Successfully connected to db/user');
		})
		.catch((error) => {
			console.error('Could not connect to db...\n', error);
		});
	}

	// create model example
	createModel() {
		return mongoose.model('User', new mongoose.Schema(user.UserModel));
	}
}


module.exports = new Database();

/**
	Database connection - End
*/
