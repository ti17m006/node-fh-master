const PORT = process.env.PORT || 8000;

const http = require('http');
const https = require('https');
const filesystem = require('fs');

const privateKey = filesystem.readFileSync('./key.pem');
const certificate = filesystem.readFileSync('./cert.pem');

const credentials = {
    key: privateKey,
    cert: certificate
}

const express = require('express')
const router = express.Router();
const manager = require('./router/router-manager');
const worker = require('./router/router-worker');
const db = require('../restful-api-v01/database/mogodb_connection');
db;
const compression = require('compression');
const app = require('express')()
    .use(compression())
    .use(require('express').json())
    .use('/api', router)
    .use('/api/manager', manager)
    .use('/api/worker', worker)
    .post('/', (req, res) => {
        console.log(req.body);
        res.send(req.body);
    })
    .get('/', (req, res) => {
        const message = 'Index page -> Working\n';
        const repetition = 1;//000000;
        res.send(message.repeat(repetition));
    });

module.exports = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

/*
module.exports = https
    .createServer(credentials, app)
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
*/