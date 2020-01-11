/** router */
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const schemas = require('./joi_schema');
const db = require('./db_connection');

db;
const Managers = db.createCollectionManager();
const Workers = db.createCollectionWorker();
const Geolocation = db.createCollectionGeolocation();

function signManager(payload) {
	return jwt.sign({
		id: payload.id,
		username: payload.username
	}, 'managerPrivateKey');
}


router.post('/manager/register', async (req, res) => {
	const existing = await Managers.findOne({ username: req.body.username });
	if (existing) {
		console.log('User exists');
		res.send('User exists');
	}
	const check = Joi.validate(req.body, schemas.JoiManager);
	if (check.error) {
		console.error(`manager error: ${check.error}`);
		res.status(400).send(`Error ${check.error}`);
	} else {
		try {
			// https://www.npmjs.com/package/bcrypt
			// const saltRounds = 10; is recommended
			const salt = await bcrypt.genSalt(10);
			const local_manager = {
				id: parseInt(req.body.id),
				fullname: req.body.fullname,
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, salt)
			};
			console.log(await Managers(local_manager).save());
			res.send(`Manager successfully saved.`);
		} catch (exception) {
			console.error(`Error save() ${exception}\n`);
		}
	}

});

router.post('/manager/login', async (req, res) => {
	const payload = await Managers.findOne({ username: req.body.username });
	const check = Joi.validate(req.body, schemas.JoiManagerLogin);
	if (check.error) {
		console.error(`manager error: ${check.error}`);
		res.status(400).send(`Error ${check.error}`);
	}
	if (!payload) {
		console.log('User does not exist');
		res.send('User does not exist');
	}
	if (await bcrypt.compare(req.body.password, payload.password)) {
		res.header('jwt-manager', signManager(payload)).send(payload);
	} else {
		res.send('Invalid password');
	}
});

router.get('/manager/current', async (req, res) => {
	if (!req.header('jwt-manager')) {
		res.status(401).send('Empty token');
	}
	try {
		res.send(jwt.verify(req.header('jwt-manager'), 'managerPrivateKey'));
	} catch (exception) {
		res.status(400).send('Invalid token');
	}
	res.send();
});


function signWorker(payload) {
	return jwt.sign({
		id: payload.id,
		username: payload.username
	}, 'workerPrivateKey');
}

router.post('/worker/register', async (req, res) => {
	const existing = await Workers.findOne({ username: req.body.username });
	if (existing) {
		console.log('User exists');
		res.send('User exists');
	}
	const check = Joi.validate(req.body, schemas.JoiWorker);
	if (check.error) {
		console.error(`worker registration error: ${check.error}`);
		res.status(400).send(`Error ${check.error}`);
	} else {
		try {
			const salt = await bcrypt.genSalt(10);

			const local_worker = {
				id: parseInt(req.body.id),
				fullname: req.body.fullname,
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, salt)
			};
			const local_geolocation = {
				workerId: parseInt(req.body.id)
			};
			const workers = await Workers(local_worker).save();
			const init_loc = await Geolocation(local_geolocation).save();
			// console.log(`${workers} \n${init_loc} \n`);
			res.send(`Worker successfully initialised.\n${workers}\n${init_loc}\n`);
		} catch (exception) {
			console.error(`Error save() ${exception}\n`);
		}
	}
});

router.post('/worker/login', async (req, res) => {
	const payload = await Workers.findOne({ username: req.body.username });
	const check = Joi.validate(req.body, schemas.JoiManagerLogin);
	if (check.error) {
		console.error(`manager error: ${check.error}`);
		res.status(400).send(`Error ${check.error}`);
	}
	if (!payload) {
		console.log('User does not exist');
		res.send('User does not exist');
	}
	if (await bcrypt.compare(req.body.password, payload.password)) {
		res.header('jwt-worker', signWorker(payload)).send(payload);
	} else {
		res.send('Invalid password');
	}
})

router.get('/worker/current', async (req, res) => {
	if (!req.header('jwt-worker')) {
		res.status(401).send('Empty token');
	}
	try {
		res.send(jwt.verify(req.header('jwt-worker'), 'workerPrivateKey'));
	} catch (exception) {
		res.status(400).send('Invalid token');
	}
	res.send();
});

router.put('/worker/location/:id', async (req, res) => {
	if (!req.header('jwt-worker')) {
		res.status(401).send('Empty token');
	}
	try {
		if (jwt.verify(req.header('jwt-worker'), 'workerPrivateKey')) {
			const local_geolocation = await Geolocation.updateOne(
				{
					workerId: parseInt(req.params.id)
				},
				{
					$inc: {
						locationLength: 1
					},
					$push: {
						location: req.body
					}
				},
				{
					new: true
				}
			);
		} else {
			res.status(400).send('Invalid token');
		}
		res.send("Geolocation successfully updated.\n");
	} catch (exception) {
		res.status(400).send('Invalid token');
	}
	res.send();
});

module.exports = router;
