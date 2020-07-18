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
		const payload = await Workers.findOne({ username: req.query.username });
		const check = Joi.validate(req.query, schemas.JoiManagerLogin);
		if (check.error) {
			console.error(`manager error: ${check.error}`);
			res.status(400).send(`Error ${check.error}`);
		}
		if (!payload) {
			console.log('User does not exist');
			res.send('User does not exist');
		}
		if (await bcrypt.compare(req.query.password, payload.password)) {
			res.header('jwt-worker', signWorker(payload)).send(payload);
		} else {
			res.send('Invalid password');
		}
	} catch (error) {
		console.error(` ${error}\n`);
	}
});

router.get('/current', async (req, res) => {
	try {
		if (!req.header('jwt-worker')) {
			res.status(401).send(messageToken.empty);
		}
		res.send(jwt.verify(req.header('jwt-worker'), privateKey));
	} catch (exception) {
		res.status(400).send(exception);
	}
});

router.put('/location', async (req, res) => {
	try {
		if (!req.header('jwt-worker')) {
			res.status(401).send(messageToken.empty);
		}
		if (jwt.verify(req.header('jwt-worker'), privateKey)) {
			const _id = parseInt(req.query.id);
			await Geolocation.updateOne(
				{
					workerId: _id
				},
				{
					$inc: {
						locationLength: 1
					},
					$push: {
						location: req.query.coordinates
					}
				},
				{
					new: true
				}
			);
		} else {
			res.status(400).send(messageToken.invalid);
		}
		res.send("Geolocation successfully updated.\n");
	} catch (exception) {
		res.status(400).send(exception);
	}
});
module.exports = router;