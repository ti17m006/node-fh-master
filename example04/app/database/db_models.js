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
    workerId: {
        type: WorkerModel.id,
    },
    location: [
        { 
            index: { type: Number, min: 1, required: true },
            date: { type: Date, default: Date.now() },
            type: { type: String, default: 'MultiPoint' },
            coordinates: [[Number, Number]]
        }
    ] 
}
module.exports.Manager = ManagerModel;
module.exports.Worker = WorkerModel;
module.exports.Geolocation = GeolocationModel;