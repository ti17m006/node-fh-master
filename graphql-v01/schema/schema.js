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
    LoginObject
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
            resolve: (parent, args) => ({
                token: manager_query.login(args)
            })
        },
        current: {
            type: ManagerType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: (parent, args, context) => (manager_query.current(args, context.headers))
        },
        wroker: {
            type: WorkerType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: (parent, args, context) => (manager_mutation.getWorker(args, context.headers))
        },
        workers: {
            type: new GraphQLList(WorkerType), // WorkerListType ==> new GraphQLList(WorkerType);
            resolve: (parent, args, context) => (manager_mutation.getWorkers(args, context.headers))
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
            resolve: (parent, args, context) => (manager_mutation.newWorker(args, context.headers))
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});