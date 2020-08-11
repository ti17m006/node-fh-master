
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const LoginObject = {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString }
}

const ManagerObject = {
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString }
};

const WorkerObject = {
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString }
};



const Login = {
    name: 'Login',
    fields: LoginObject
}

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
    fields: {
        longitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat }
    }
};

const Geolocation = {
    name: 'Geolocation',
    fields: {
        id: { type: GraphQLID },
        worker_id: { type: GraphQLID },
        geo: { type: new GraphQLList(new GraphQLObjectType(Location)) },
        message: { type: GraphQLString }
    }
};

module.exports.LoginObject = LoginObject;
module.exports.ManagerObject = ManagerObject;
module.exports.WorkerObject = WorkerObject;

module.exports.LoginType = new GraphQLObjectType(Login);
module.exports.ManagerType = new GraphQLObjectType(Manager);
module.exports.WorkerType = new GraphQLObjectType(Worker);
module.exports.GeolocationType = new GraphQLObjectType(Geolocation);