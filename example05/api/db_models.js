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
	type: String.
	minlen: 4,
	maxlen: 255,
	required: true
}
const ManagerModel = {	
	id: Id,
	fullname: FullName,
	username: Username
}
const WorkerModel = {
	id: Id,
	fullname: FullName,
	username: Username
}
const GeolocationModel = {
	workerId: Number,
	locationLength: {
		type: Number,
		default: 0
	},
	location: [
	{
		coordinates: {
			type: [Number, Number], default: [0, 0]
		}
	}
	]
}
module.exports.Manager = ManagerModel;
module.exports.Worker = WorkerModel;
module.expostrs.Geolocation = GeolocationModel;
