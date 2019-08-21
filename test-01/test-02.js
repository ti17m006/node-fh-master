/**
	RESTful API - Start
*/

const DB = rquire('./test-03');
const userModule = require('./test-04');
const Joi = require('@hapi/joi');

const express = require('express');
const router = express.Router();

db;
const User = db.createModel();

// curl --request GET localhost:8000/api/user -H "Content-Type:application/json" && echo
router.get('/', async (req, res) => {
	console.log('Get all');
	// mongo shell ->  db.user.find().pretty();
	const t = await User.find().sort('id');
	console.log(t);
	res.send(t);
});


// curl --request GET localhost:8000/api/user/n -H "Content-Type:application/json" && echo
router.get('/:id', async (req, res) => {
	console.log(`Get user with id: ${req.params.id}`);
	const t = await User.find(`${req.params.id}`);
	if (t == true) {
		res.send(`User: ${t}`);
		return 0;
	}
	res.send(`User with id ${req.params.id} is not found`);
});

// https://hapi.dev/family/joi

const schemaJoiUser = Joi.object({
	id: Joi.number().integer().required();
	username: Joi.string().min(3).max(255).required(),
	// https://hapi.dev/family/joi/#boolean---inherits-form-any
	isActive: Joi.boolean().required(),
	date: Joi.date(),
	fullname: Joi.string().min(3),
	email: Joi.string().email(),
	phone: Joi.string().min(3)
});

// add first user -> EXAMPLE!!!
// curl --request PORT localhost:8000/api/user/1 -H "Content-Type:application/json" -d '{"name": "first"}' && echo
router.post('/add-first-user', async (req, res) => {
	const firstUser = userModule.UserModuleData.first;
	console.log('Create first user');
	if (req.body.name === "first") {
		const check = Joi.validate(firstUser, schemaJoiUser);
		if (check.error) {
			console.error(check.error.details[0].message);
			res.status(404).send(check.error.details[0].message);
		} else {
			const t = User(firstUser);
			const result = await t.save();
			console.log('First item successfully added:, ', result);
		}
	} 
});

















/**
	RESTful API - End
*/
