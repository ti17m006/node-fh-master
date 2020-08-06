const router = require('express').Router();
const { hashPasword, compare } = require('../../miscellaneous/bcryptHash');
const { signatureManager, errorMessageToken, verifyManager } = require('../../miscellaneous/jwtModels');
const {
    validateManager,
    validateLogin,
    validateWorker
} = require('../../joi_schema/joi_schema');
const {
    Managers,
    Workers,
    Geolocation
} = require('../../database/mogodb_connection');


router.post(`/register`, async (req, res) => {
    try {
        let local_manager = {
            id: parseInt(req.body.id),
            fullname: req.body.fullname.toString(),
            username: req.body.username.toString(),
            password: req.body.password.toString()
        };
        const check = validateManager(local_manager);
        if (check.error) {
            throw `manager error: ${check.error}`;
        }
        if (await Managers.findOne({ username: local_manager.username })) {
            throw 'User exists';
        } else {

            local_manager.password = await hashPasword(local_manager.password);
            await Managers(local_manager).save();
            console.log(`Manager successfully saved.`);
            res.send(`Manager successfully saved.`);
        }
    } catch (exception) {
        console.error(` ${exception}\n`);
        res.send(exception);
    };
});

router.post(`/login`, async (req, res) => {
    try {
        let local_manager = {
            username: req.body.username.toString(),
            password: req.body.password.toString()
        };
        const check = validateLogin(local_manager);
        if (check.error) {
            throw `manager error: ${check.error}`;
        }
        const payload = await Managers.findOne({ username: local_manager.username });
        if (!payload) {
            console.log('User does not exist');
            res.send('User does not exist');
        }
        if (await compare(local_manager.password, payload.password)) {
            console.log('Login successful');
            res.setHeader('jwt_manager', signatureManager(payload));
            res.send('Login successful');
        } else {
            throw 'Invalid password';
        }
    } catch (exception) {
        console.error(` ${exception}\n`);
        res.send(exception);
    }
});

router.get(`/current`, async (req, res) => {
    try {
        if (!req.header('jwt_manager')) {
            throw messageToken.empty;
        } else {
            if (verifyManager(req.header('jwt_manager'), privateKey)) {
                console.log('Verification succssessful');
                res.send(verified);
            }
        }
    }
    catch (exception) {
        if (exception === errorMessageToken.empty) {
            console.error(errorMessageToken.empty);
            res.send(errorMessageToken.empty);
        } else {
            console.error(errorMessageToken.invalid);
            res.send(errorMessageToken.invalid);
        }
    }
});

router.post(`/register-worker`, async (req, res) => {
    try {
        if (!req.header('jwt_manager')) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(req.header('jwt_manager'))) {
            throw errorMessageToken.invalid;
        }
        const local_worker = {
            id: parseInt(req.body.id),
            fullname: req.body.fullname.toString(),
            username: req.body.username.toString(),
            password: req.body.password.toString()
        };
        const check = validateWorker(local_worker);
        if (check.error) {
            throw check.error;
        }
        const exists = await Workers.findOne({ username: local_worker.username });
        if (exists) {
            throw 'User exists';
        }
        local_worker.password = await hashPasword(local_worker.password);
        const local_geolocation = {
            workerId: parseInt(local_worker.id)
        };
        const workers = await Workers(local_worker).save();
        const init_loc = await Geolocation(local_geolocation).save();
        const messageWorker = `Worker successfully initialized.\n${workers}\n${init_loc}\n`;
        console.log(messageWorker);
        res.send(messageWorker);
    } catch (exception) {
        console.error(`Error:  ${exception}\n`);
        res.send(exception);
    }
});

router.get('/get-worker/:id', async (req, res) => {
    try {
        if (!req.header('jwt_manager')) {
            throw errorMessageToken.empty;
        }
        if (verifyManager(req.header('jwt_manager'), privateKey)) {
            throw errorMessageToken.invalid;
        }
        const local_worker_id = parseInt(req.params.id);
        const local_worker = await Workers.find({ id: local_worker_id });
        if (local_worker) {
            throw 'Worker not found';
        }
        const local_geoloc = await Geolocation.find({ workerId: local_worker_id });
        const output = `${local_worker} -> ${local_geoloc}`;
        console.log(output);
        res.send(output);
    }
    catch (exception) {
        console.error(exception);
        res.status(400).send(`${exception}`);
    }
});

router.put('/update-worker/:id', async (req, res) => {
    try {
        if (!req.header('jwt_manager')) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(req.header('jwt_manager'), privateKey)) {
            throw errorMessageToken.invalid;
        }
        const local_worker = {
            id: parseInt(req.params.id),
            old_password: req.body.old_password.toString(),
            new_password: req.body.new_password.toString()
        }
        const exists = await Workers.findOne({ id: local_worker.id });
        if (!exists) {
            throw 'User does not exist';
        }
        if (await compare(local_worker.old_password, exists.password)) {
            const new_password = hashPasword(local_worker.new_password);
            const output = await Workers.findOneAndUpdate({
                id: local_worker.id,
                "password": new_password
            });
            console.log(output);
            res.send(output);
        } else {
            throw 'Password exception\n';
        }
    }
    catch (exception) {
        console.error(exception);
        res.status(400).send(`${exception}\n`);
    }
});

router.delete('/delete-worker/:id', async (req, res) => {
    try {
        if (!req.header('jwt_manager')) {
            throw errorMessageToken.empty;
        }
        if (!verifyManager(req.header('jwt_manager'), privateKey)) {
            throw errorMessageToken.invalid;
        }
        const local_worker_id = parseInt(req.params.id);
        const local_worker = await Workers.findOne({ id: local_worker_id });
        if (!local_worker) {
            throw 'Worker not found';
        } else {
            await Workers.findOneAndDelete({ id: req.params.id });
            console.log('Worker deleted');
            res.send('Worker deleted');
        }
    }
    catch (exception) {
        console.error(exception);
        res.status(400).send(`${exception}`);
    }
});

module.exports = router;