const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLScalarType,
    GraphQLString
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
        getManager: {
            type: ManagerType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => (manager_query.get(parseInt(args.id)))
        },
        managerLogin: {
            type: LoginType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (parent, args) => ({
                token: manager_query.login(args)
            })
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});