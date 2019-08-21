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
	id: Joi.number().integer().required(),
	username: Joi.string().min(3).max(255).required(),
	// https://hapi.dev/family/joi/#boolean---inherits-form-any
	isActive: Joi.boolean().required(),
	date: Joi.date(),
	fullname: Joi.string().min(3),
	email: Joi.string().email(),
	phone: Joi.string().min(3)
});

// add first user -> EXAMPLE!!!
// curl --request POST localhost:8000/api/add-first-user -H "Content-Type:application/json" -d '{"name": "first"}' && echo
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

// add all users
// curl --request POST localhost:8000/api/user/add-all-users -H "Content-Type:application/json" -d '{"name": "all-users"}' && echo
router.post('/add-all-users', async (req, res) => {
	console.log('Create all users');
	if (req.body.name === "all-users") {
		let check = new Object();

		check.first = Joi.validateu(userModule.UserModuleData.first, schemaJoiUser);
		check.second = Joi.validate(userModule.UserModuleData.second, schemaJoiUser);
		check.third = Joi.validate(userModule.UserModuleData.third, schemaJoiUser);
		check.fourth = Joi.validate(userModule.UserModuleData.fourth, schemaJoiUser);
		check.fifth = Joi.validate(userModule.UserModuleData.fifth, schemaJoiUser);
		check.sixth = Joi.validate(userModule.UserModuleData.sixth, schemaJoiUser);

		if (check.first.error && 
			check.second.error && 
			check.third.error && 
			check.fourth.error && 
			check.fifth.error && 
			check.sixth.error) {
			for (let i in check) { 
				console.error(i.error.details[0].messages);
				res.status(404).send(i.error.details[0].message);
				}
				return;
		} else { 
			let a = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', a);
			let b = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', b);
			let c = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', c);
			let d = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', d);
			let e = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', e);
			let f = await User(userModule.UserModuleData.first).save();
			console.log('Item added ', f);
		}
	}
});

// alter user's data
// curt --request PUT localhost:8000/api/id -H "Content-Type:application/json" -d '{}' && echo
// router.put('/:id', async (req, res) => {});

// delete user with id
// curl --request DELETE localhost:8000/api/delete-user/id -H "Content-Type:application/json" && echo
router.delete('/:id', async (req, res) => { 
	console.log(`Delete user with id ${req.params.id}`);
	// check if user exists in collection
	res.send(await User.deleteOne({id: req.params.id}))
});

// delete all users 
// curl --request DELETE localhost:8000/api/delete-all -H "Content-Type:application/json" && echo
router.delete('/delete-all', async (req, res) => { 
	console.log('Delete all users');
	res.send(await User.deleteMany());
})


module.expors = router;
/**
	RESTful API - End
*/
