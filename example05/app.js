const PORT = process.env.PORT || 8000;

const express = require('express')
const router = express.Router();
const manager = require('./api/router-manager');
const worker = require('./api/router-worker');
const db = require('./api/db_connection');

db;
db.createCollectionManager();
db.createCollectionWorker();
db.createCollectionGeolocation();

const compression = require('compression');

const app = require('express')()
    .use(compression())
    .use(require('express').json())
    .use('/api', router)
    .use('/api/manager', manager)
    .use('/api/worker', worker)
    .post('/', (req, res) => {
        // REMINDER !!!
        console.log(req.body); // Displays value
        res.send(req.body);
    })
    .get('/', (req, res) => {
        const message = 'Index page -> Working\n';
        const repetition = 1;//000000;
        res.send(message.repeat(repetition));
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });

module.exports = app;