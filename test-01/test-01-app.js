/**
	app - Start
*/

const MYPORT = 8000;
const PORT = process.env.PORT || MYPORT;

const express = require('express');
const api = require('./test-02.js');

const app = express();

app.use(express.json());
app.use('/api/user', api);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
	console.log('Index page\n');
	res.send('Index page\n');
});

app.get('/api', (req, res) => {
	console.log('API page\n');
	res.send('API page\n');
});

module.exports;

/**
	app - End
*/
