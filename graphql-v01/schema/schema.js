const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLScalarType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const {
    ManagerType,
    WorkerType,
    LoginType,
    ManagerObject,
    WorkerObject,
    LoginObject,
    GeolocationType,
    LocationObject
} = require('../modelsql/modelsql');

const manager_query = require('../query/manager_query');
const worker_query = require('../query/worker_query');

const manager_mutation = require('../mutations/manager_mutation');
const worker_mutation = require('../mutations/worker_mutation');

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        managerLogin: {
            type: LoginType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (parent, args) => ({ token: manager_query.login(args) })
        },
        workerLogin: {
            type: LoginType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (parent, args) => ({ token: worker_query.login(args) })
        },
        current: {
            type: ManagerType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: (parent, args, context) => (manager_query.current(args, context.headers))
        },
        worker: {
            type: WorkerType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: (parent, args, context) => (manager_query.getWorker(args, context.headers))
        },
        workers: {
            type: new GraphQLList(WorkerType), // WorkerListType ==> new GraphQLList(WorkerType);
            args: {},
            resolve: (parent, args, context) => (manager_query.getWorkers(context.headers))
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        managerRegister: {
            type: ManagerType,
            args: ManagerObject,
            resolve: (parent, args) => (manager_mutation.register(args))
        },
        workerRegister: {
            type: WorkerType,
            args: WorkerObject,
            resolve: (parent, args, context) => ({ message: manager_mutation.newWorker(args, context.headers) })
        },
        workerLocation: {
            type: GeolocationType,
            args: LocationObject,
            resolve: (parent, args, context) => { }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});