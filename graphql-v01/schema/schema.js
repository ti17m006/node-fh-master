const { GraphQLSchema, GraphQLObjectType, GraphQLID } = require('graphql');
const { ManagerType, ManagerObject } = require('../modelsql/modelsql');
const manager_query = require('../query/manager_query');

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        get_manager: {
            type: ManagerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return manager_query.get(parseInt(args.id));
            }
        }
    }
});

// const RootMutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {

//     }
// });

module.exports = new GraphQLSchema({
    query: RootQuery//,
    //mutation: RootMutation
});