/**
 *  app - Start
 */

const MYPORT = 8000;
const PORT = process.env.PROT || MYPORT;

const express = require('express');
const app = express();

const Router = require('./t09a02-api');

app.use(express.json());
app.use('/api', Router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
    console.log('Index page\n');
    res.send('Index page');
});

app.get('/api', (req, res) => {
   console.log('API page\n');
   res.send('API page');
});

module.exports;
/**
 * app - End
 */