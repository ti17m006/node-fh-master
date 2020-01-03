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
				id: req.body.id,
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
		let t = jwt.sign({
			id : payload.id,
			username : payload.username
		}, 'managerPrivateKey');
		res.header('jwt-manager', t).send(payload);
	} else {
		res.send('Invalid password');
	}
});

module.exports = router;
