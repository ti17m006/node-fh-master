const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID
} = require('graphql');

const {
    ManagerType,
    WorkerType,
    ManagerObject,
    WorkerObject
} = require('../modelsql/modelsql');

const manager_query = require('../query/manager_query');
const worker_query = require('../query/worker_query');

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        get_manager: {
            type: ManagerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return manager_query.get(parseInt(args.id));
            }
        },
        get_worker: {
            type: WorkerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return worker_query.get(parseInt(args.id));
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        managerRegister: {},
        managerLogin: {},
        workerLogin: {},
        workerRegister: {},
        workerUpdate: {},
        workerDelete: {}
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery//,
    //mutation: RootMutation
});