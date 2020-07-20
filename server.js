
const restfulapi = false;// require('./restful-api-v01/app');

if (restfulapi !== false) {
    restfulapi;
    console.log('restful api');
} else {
    console.log('graphql');
    const graphql = require('./graphql-v1/app');
    graphql;
}


