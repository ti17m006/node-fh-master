/** DB Models */
const Id = {
	type: Number,
	min: 1,
	required: true
}
const FullName = {
	type: String,
	minlen: 4,
	maxlen: 255,
	required: true
}
const Username = {
	type: String,
	minlen: 4,
	maxlen: 255,
	unique: true,
	required: true
}
const Password = {
	type: String,
	minlen: 4,
	maxlen: 255,
	required: true
}

const ManagerModel = {
	id: Id,
	fullname: FullName,
	username: Username,
	password: Password
}
const WorkerModel = {
	id: Id,
	fullname: FullName,
	username: Username,
	password: Password
}
const GeolocationModel = {
	workerId: Id,
	locationLength: {
		type: Number,
		default: 0
	},
	location: [
		[String]
	]
}

module.exports.Manager = ManagerModel;
module.exports.Worker = WorkerModel;
module.exports.Geolocation = GeolocationModel;
