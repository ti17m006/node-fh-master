const PORT = process.env.PORT || 8000;

const http = require('http');
const express = require('express');
const exgraph = require('express-graphql');

const schema = require('./shema/schema');

const app = express();
app.use('/graphql', exgraph.graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});