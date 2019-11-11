/** app */
const PORT = 8000;
const express = require('express');
const app = express();
const router = require('./app/api/api');
app
    .use(express.json())
    .use('/api', router)
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);                
    });
module.exports;