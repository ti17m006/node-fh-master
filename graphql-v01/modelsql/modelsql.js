
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString
} = require('graphql');

const ManagerObject = {
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
};

const WorkerObject = {
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
};

const LocationObject = {
    longitude: { type: GraphQLString },
    latitude: { type: GraphQLString }
};

const Manager = {
    name: 'Manager',
    fields: ManagerObject
};

const Worker = {
    name: 'Worker',
    fields: WorkerObject
};

const Location = {
    name: 'Location',
    fields: LocationObject
};

const Geolocation = {
    name: 'Geolocation',
    fields: {
        id: { type: GraphQLID },
        worker_id: { type: GraphQLID },
        geo: { type: new GraphQLList(new GraphQLObjectType(Location)) }
    }
};

module.exports.ManagerObject = ManagerObject;
module.exports.WorkerObject = WorkerObject;
module.exports.LocationObject = LocationObject;

module.exports.ManagerType = new GraphQLObjectType(Manager);
module.exports.WorkerType = new GraphQLObjectType(Worker);
module.exports.GeolocationType = new GraphQLObjectType(Geolocation);