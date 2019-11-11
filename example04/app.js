/** app */
const PORT = 8000;
const router = require('./app/api/api');
const app = require('express')()
    .use('/api', router)
    .get('/', (req, res) => {
        console.log('Index\n');
        res.send('Index\n');
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);                
    });
module.exports;