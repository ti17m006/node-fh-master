const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const schemas = require('../joi_schema/joi_schema');
const { invalid } = require('@hapi/joi');
const Managers = require('../database/mogodb_connection').Managers;
const Workers = require('../database/mogodb_connection').Workers;
const Geolocation = require('../database/mogodb_connection').Geolocation;

const privateKey = 'manager_PrivateKey'

const messageToken = {
    empty: "Empty token",
    invalid: "Invalid token"
};

function signManager(payload) {
    return jwt.sign({
        id: payload.id,
        username: payload.username
    }, privateKey);
}

router.post(`/register`, async (req, res) => {
    let local_manager = {
        id: parseInt(req.body.id),
        fullname: req.body.fullname.toString(),
        username: req.body.username.toString(),
        password: req.body.password.toString()
    };
    const check = Joi.validate(local_manager, schemas.JoiManager);
    if (check.error) {
        console.error(`manager error: ${check.error}`);
        res.status(400).send(`Error ${check.error}`);
    }
    if (await Managers.findOne({ username: local_manager.username })) {
        console.log('User exists');
        res.send('User exists');
    } else {
        try {
            // https://www.npmjs.com/package/bcrypt saltRounds = 10 recommended
            const salt = await bcrypt.genSalt(10);
            local_manager.password = await bcrypt.hash(local_manager.password, salt);
            await Managers(local_manager).save();
            res.send(`Manager successfully saved.`);
        } catch (exception) {
            console.error(`Error save() ${exception}\n`);
        }
    };
});

router.post(`/login`, async (req, res) => {
    try {
        let local_manager = {
            username: req.body.username.toString(),
            password: req.body.password.toString()
        }
        const check = Joi.validate(local_manager, schemas.JoiManagerLogin);
        if (check.error) {
            console.error(`manager error: ${check.error}`);
            res.status(400).send(`Error ${check.error}`);
        }
        const payload = await Managers.findOne({ username: local_manager.username });
        if (!payload) {
            console.log('User does not exist');
            res.send('User does not exist');
        }
        if (await bcrypt.compare(local_manager.password, payload.password)) {
            res.header(privateKey, signManager(payload)).send(payload);
            console.log('Login successful');
        } else {
            res.send('Invalid password');
        }
    } catch (exception) {
        console.error(exception);
    }
});

router.get(`/current`, async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            throw messageToken.empty;
        } else {
            const verified = jwt.verify(req.header('jwt-manager'), privateKey);
            if (verified) {
                console.log('Verification succssessful');
                res.send(verified);
            }
        }
    }
    catch (exception) {
        if (exception === messageToken.empty) {
            console.log(messageToken.empty);
            res.status(400).send(messageToken.empty);
        } else {
            console.log(messageToken.invalid);
            res.status(400).send(messageToken.invalid);
        }
    }
});

router.post(`/register-worker`, async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send(messageToken.empty);
        }
        if (!jwt.verify(req.header('jwt-manager'), privateKey)) {
            res.status(401).send(messageToken.invalid);
        }
        const local_worker = {
            id: parseInt(req.body.id),
            fullname: req.body.fullname.toString(),
            username: req.body.username.toString(),
            password: req.body.password.toString()
        };
        const check = Joi.validate(local_worker, schemas.JoiWorker);
        if (check.error) {
            console.error(`Worker registration error: ${check.error}`);
            res.status(400).send(`Error ${check.error}`);
        }
        const exists = await Workers.findOne({ username: local_worker.username });
        if (exists) {
            console.log('User exists');
            res.send('User exists');
        }
        try {
            const salt = await bcrypt.genSalt(10);
            local_worker.password = await bcrypt.hash(local_worker.password, salt);
            const local_geolocation = {
                workerId: parseInt(local_worker.id)
            };
            const workers = await Workers(local_worker).save();
            const init_loc = await Geolocation(local_geolocation).save();
            const messageWorker = `Worker successfully initialised.\n${workers}\n${init_loc}\n`;
            console.log(messageWorker);
            res.send(messageWorker);
        } catch (exception) {
            console.error(`Error save() ${exception}\n`);
        }
    } catch (exception) {
        res.status(400).send(exception);
    }
});

router.get('/get-worker', async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send(messageToken.empty);
        }
        if (!jwt.verify(req.header('jwt-manager'), privateKey)) {
            res.status(401).send(messageToken.invalid);
        }
        const local_worker_id = parseInt(req.query.id);
        const local_worker = await Workers.find({ id: local_worker_id });
        if (!local_worker) {
            console.log('local_worker not found');
            res.send('Worker not found');
        }
        const local_geoloc = await Geolocation.find({ workerId: local_worker_id });
        const output = `${local_worker} -> ${local_geoloc}`;
        console.log(output);
        res.send(output);
    }
    catch (exception) {
        res.status(400).send(`${exception}`);
    }
});

router.put('/update-worker', async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send(messageToken.empty);
        }
        if (!jwt.verify(req.header('jwt-manager'), privateKey)) {
            res.status(401).send(messageToken.invalid);
        }
        const local_worker = {
            id: parseInt(req.query.id),
            old_password: req.body.old_password.toString(),
            new_password: req.body.new_password.toString()
        }
        const exists = await Workers.findOne({ id: local_worker.id });
        if (!exists) {
            console.log('User does not exist');
            res.send('User does not exist');
        }
        if (await bcrypt.compare(local_worker.old_password, exists.password)) {
            const salt = await bcrypt.genSalt(10);
            const new_password = await bcrypt.hash(local_worker.new_password, salt);
            const output = await Workers.findOneAndUpdate({
                id: local_worker.id,
                "password": new_password
            });
            console.log(output);
            res.send(output);
        } else {
            throw 'Password exception';
        }
    }
    catch (exception) {
        console.log(exception);
        res.status(400).send(`${exception}\n`);
    }
});

router.delete('/delete-worker', async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send('Empty token');
        }
        if (!jwt.verify(req.header('jwt-manager'), 'manager_PrivateKey')) {
            res.status(401).send('invalid token');
        }
        const local_worker = await Workers.findOne({ id: req.query.id });
        if (!local_worker) {
            console.log('local_worker');
            res.send('Worker not found');
        }
        if (local_worker) {
            await Workers.findOneAndDelete(
                {
                    id: req.query.id
                });
            console.log('Worker deleted');
            res.send('Worker deleted');
        }
    }
    catch (exception) {
        res.status(400).send(`${exception}`);
    }
});

module.exports = router;