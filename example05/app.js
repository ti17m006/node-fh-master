const PORT = process.env.PORT || 8000;
const compression = require('compression');
const router = require('./api/router');
const app = require('express')()
    .use(compression())
    .use(require('express').json())
    .use('/api', router)
    .post('/', (req, res) => {
        // REMINDER !!!
        console.log(req.body); // Displays value
        res.send(`${req.body}\n`); // [object Object]
    })
    .get('/', (req, res) => {
        const message = 'Index page -> Working\n';
        const repetition = 1;//000000;
        res.send(message.repeat(repetition));
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
