/** app */
const PORT = 8000;
const router = require('./app/api/api');
const app = require('express')()
    .use('/api', router)
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);                
    });
module.exports;