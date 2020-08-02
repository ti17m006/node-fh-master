const PORT = process.env.PORT || 8002;


const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app_schema = require('./schema/schema');

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: app_schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});