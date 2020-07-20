const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const _ = require('lodash');
const managers = [
    { id: 1, fullname: "Alice Martin", username: "artin", password: "123abc" },
    { id: 2, fullname: "Patrick Foster", username: "pfoster", password: "abc123" },
    { id: 3, fullname: "Anna Smith", username: "asmith", password: "123456" },
    { id: 4, fullname: "Jacob Davis", username: "jdavis", password: "qwerty" }
];

const ManagerType = new GraphQLObjectType({
    name: 'Manager',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        },
        fullname: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        manager: {
            type: ManagerType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                // query database
                return _.find(managers, { id: parseInt(args.id) });
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});