const PORT = process.env.PORT || 8000;
const router = require('./api/router');
const app = require('express')()
    .use(require('express').json())
    .use('/api', router)
    .post('/', (req, res) => {
        // REMINDER !!!
        console.log(req.body); // Displays value
        res.send(`${req.body}\n`); // [object Object]
    })
    .get('/', (req, res) => {
        res.send('index \n');
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
