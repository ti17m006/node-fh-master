/** router worker example */
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const schemas = require('../joi_schema/joi_schema');
const Workers = require('../database/mogodb_connection').Workers;
const Geolocation = require('../database/mogodb_connection').Geolocation;

const privateKey = 'worker_PrivateKey';

const messageToken = {
	empty: "Empty token",
	invalid: "Invalid token"
};

function signWorker(payload) {
	return jwt.sign({
		id: payload.id,
		username: payload.username
	}, privateKey);
}

router.post('/login', async (req, res) => {
	try {
		const local_worker = {
			username: req.body.username.toString(),
			password: req.body.password.toString()
		};
		const check = Joi.validate(local_worker, schemas.JoiLogin);
		if (check.error) {
			throw `Login error: ${check.error}`;
		}
		const exists = await Workers.findOne({ username: local_worker.username });
		if (!exists) {
			throw 'User does not exist';
		}
		if (await bcrypt.compare(local_worker.password, exists.password)) {
			console.log('Login successful');
			res.header('jwt-worker', signWorker(exists)).send(exists);
		} else {
			throw 'Invalid password';
		}
	} catch (exception) {
		console.error(` ${exception}\n`);
		res.status(400).send(exception);
	}
});

router.get('/current', async (req, res) => {
	try {
		if (!req.header('jwt-worker')) {
			throw messageToken.empty;
		}
		res.send(jwt.verify(req.header('jwt-worker'), privateKey));
	} catch (exception) {
		console.error(` ${exception}\n`);
		res.status(400).send(exception);
	}
});

router.put('/location', async (req, res) => {
	try {
		if (!req.header('jwt-worker')) {
			throw messageToken.empty;
		}
		if (jwt.verify(req.header('jwt-worker'), privateKey)) {
			const _id = parseInt(req.query.id);
			const coordinates = req.body.coordinates;
			await Geolocation.updateOne(
				{
					workerId: _id
				},
				{
					$inc: {
						locationLength: 1
					},
					$push: {
						location: coordinates
					}
				},
				{
					new: true
				}
			);
		} else {
			throw messageToken.invalid;
		}
		console.log("Geolocation successfully updated.\n");
		res.send("Geolocation successfully updated.\n");
	} catch (exception) {
		console.error(exception);
		res.status(400).send(exception);
	}
});
module.exports = router;