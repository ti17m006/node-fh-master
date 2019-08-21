/**
	RESTful API - Start
*/

const db = require('./test-03');
const userModule = require('./test-04');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

db;
const User = db.createModel();

// curl --request GET localhost:8000/api/user/get-all/all -H "Content-Type:application/json" && echo
router.get('/get-all/all', async (req, res) => {
	console.log('Get all');
	// mongo shell ->  db.users.find().pretty();
	const t = await User.find().sort('id');
	console.log(t);
	res.send(t);
});


// curl --request GET localhost:8000/api/user/id -H "Content-Type:application/json" && echo
router.get('/:id', async (req, res) => {
	console.log(`Get ${req.params.id}`);
	// TODO
	// if object does not exist!!!
	res.send(await User.find({id: req.params.id}));
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
// curl --request POST localhost:8000/api/user/add-first-user -H "Content-Type:application/json" -d '{"name": "first"}' && echo
router.post('/add-first-user', async (req, res) => {
	const firstUser = userModule.UserData.first;
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
			res.status(200).send('First item successfully added');
		}
	} else {
		res.status(404).send("An error occurred");
	}
});

// add all users
// curl --request POST localhost:8000/api/user/add-all-users -H "Content-Type:application/json" -d '{"name": "all-users"}' && echo
router.post('/add-all-users', async (req, res) => {
	console.log('Create all users');
	if (req.body.name === "all-users") {
		let check = new Object();

		check.first = Joi.validate(userModule.UserData.first, schemaJoiUser);
		check.second = Joi.validate(userModule.UserData.second, schemaJoiUser);
		check.third = Joi.validate(userModule.UserData.third, schemaJoiUser);
		check.fourth = Joi.validate(userModule.UserData.fourth, schemaJoiUser);
		check.fifth = Joi.validate(userModule.UserData.fifth, schemaJoiUser);
		check.sixth = Joi.validate(userModule.UserData.sixth, schemaJoiUser);

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
			let a = await User(userModule.UserData.first).save();
			console.log('Item added ', a);
			let b = await User(userModule.UserData.second).save();
			console.log('Item added ', b);
			let c = await User(userModule.UserData.third).save();
			console.log('Item added ', c);
			let d = await User(userModule.UserData.fourth).save();
			console.log('Item added ', d);
			let e = await User(userModule.UserData.fifth).save();
			console.log('Item added ', e);
			let f = await User(userModule.UserData.sixth).save();
			console.log('Item added ', f);
		}
	}
});

// alter user's data
// curt --request PUT localhost:8000/api/user/id -H "Content-Type:application/json" -d '{}' && echo
// router.put('/:id', async (req, res) => {});

// delete user with id
// curl --request DELETE localhost:8000/api/user/id -H "Content-Type:application/json" && echo
router.delete('/:id', async (req, res) => { 
	console.log(`Delete user with id ${req.params.id}`);
	// check if user exists in collection
	res.send(await User.deleteOne({id: req.params.id}))
});

// delete all users 
// curl --request DELETE localhost:8000/api/user/delete-all/all -H "Content-Type:application/json" && echo
router.delete('/delete-all/all', async (req, res) => { 
	console.log('Delete all users');
	res.send(await User.deleteMany());
})


module.exports = router;
/**
	RESTful API - End
*/
