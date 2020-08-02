if (!true) {
    console.log('restful api');
    const restfulapi = require('./restful-api-v01/app');
    restfulapi;
} else {
    console.log('graphql');
    const graphql = require('./graphql-v01/app');
    graphql;
}
