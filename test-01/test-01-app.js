/**
	app - Start
*/
const myport = 8000;
const PORT  = env.process.PORT || myport;

const express = require('express');

const app = express();

app.use(express.json());


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

/**
	app - End
*/
