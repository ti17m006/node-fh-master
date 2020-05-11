/** router worker example */
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const schemas = require('./joi_schema');

function signWorker(payload) {
	return jwt.sign({
		id: payload.id,
		username: payload.username
	}, 'worker_PrivateKey');
}

router.post(`/register`, async (req, res) => {
	const existing = await Workers.findOne({ username: req.query.username });
	if (existing) {
		console.log('User exists');
		res.send('User exists');
	}
	const check = Joi.validate(req.query, schemas.JoiWorker);
	if (check.error) {
		console.error(`worker registration error: ${check.error}`);
		res.status(400).send(`Error ${check.error}`);
	} else {
		try {
			const salt = await bcrypt.genSalt(10);

			const local_worker = {
				id: parseInt(req.query.id),
				fullname: req.query.fullname,
				username: req.query.username,
				password: await bcrypt.hash(req.query.password, salt)
			};
			const local_geolocation = {
				workerId: parseInt(req.query.id)
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

router.post(`/login`, async (req, res) => {
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
});

router.get(`/current`, async (req, res) => {
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

router.put(`/location/:id`, async (req, res) => {
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
						location: req.query
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