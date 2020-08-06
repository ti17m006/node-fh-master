/** router worker example */
const router = require('express').Router();
const { compare } = require('../../miscellaneous/bcryptHash');
const { signatureWorker, errorMessageToken, verifyWorker } = require('../../miscellaneous/jwtModels');
const {
	validateLogin,
} = require('../../joi_schema/joi_schema');
const {
	Workers,
	Geolocation
} = require('../../database/mogodb_connection');

router.post('/login', async (req, res) => {
	try {
		const local_worker = {
			username: req.body.username.toString(),
			password: req.body.password.toString()
		};
		const check = validateLogin(local_worker);
		if (check.error) {
			throw `Login error: ${check.error}`;
		}
		const exists = await Workers.findOne({ username: local_worker.username });
		if (!exists) {
			throw 'User does not exist';
		}
		if (await compare(local_worker.password, exists.password)) {
			console.log('Login successful');
			res.setHeader('jwt_worker', signatureWorker(exists));
			res.send('Login successful');
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
			throw errorMessageToken.empty;
		}
		res.send(verifyWorker(req.header('jwt_worker')));
		console.error(` ${exception}\n`);
		res.status(400).send(exception);
	} catch (exception) {
		console.log(exception);
	}
});

router.put('/location', async (req, res) => {
	try {
		if (!req.header('jwt_worker')) {
			throw errorMessageToken.empty;
		}
		if (verifyWorker(req.header('jwt_worker'))) {
			const _id = parseInt(req.params.id);
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
			throw errorMessageToken.invalid;
		}
		console.log("Geolocation successfully updated.\n");
		res.send("Geolocation successfully updated.\n");
	} catch (exception) {
		console.error(exception);
		res.status(400).send(exception);
	}
});
module.exports = router;