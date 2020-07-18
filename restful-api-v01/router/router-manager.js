const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const schemas = require('../joi_schema/joi_schema');
const Managers = require('../database/mogodb_connection').Managers;
const Workers = require('../database/mogodb_connection').Workers;
const Geolocation = require('../database/mogodb_connection').Geolocation;

function signManager(payload) {
    return jwt.sign({
        id: payload.id,
        username: payload.username
    }, 'manager_PrivateKey');
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
            // https://www.npmjs.com/package/bcrypt
            // const saltRounds = 10; is recommended
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
        const payload = await Managers.findOne({ username: req.query.username });
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
            res.header('manager_PrivateKey', signManager(payload)).send(payload);
            console.log('Login successfull');
        } else {
            res.send('Invalid password');
        }
    } catch (exception) {
        console.error(exception);
    }

});

router.get(`/current`, async (req, res) => {
    if (!req.header('jwt-manager')) {
        res.status(401).send('Empty token');
    }
    try {
        res.send(jwt.verify(req.header('jwt-manager'), 'manager_PrivateKey'));
    } catch (exception) {
        res.status(400).send('Invalid token');
    }
});

router.post(`/register-worker`, async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send('Empty token');
        }
        if (!jwt.verify(req.header('jwt-manager'), 'manager_PrivateKey')) {
            res.status(401).send('invalid token');
        }
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
    } catch (exception) {
        res.status(400).send('Invalid token');
    }
});

router.get('/get-worker', async (req, res) => {
    try {
        if (!req.header('jwt-manager')) {
            res.status(401).send('Empty token');
        }
        if (!jwt.verify(req.header('jwt-manager'), 'manager_PrivateKey')) {
            res.status(401).send('invalid token');
        }
        const local_worker = await Workers.find({ id: req.query.id });
        if (!local_worker) {
            console.log('local_worker');
            res.send('Worker not found');
        }
        const local_geoloc = await Geolocation.find({ workerId: req.query.id });

        const output = `${local_worker} -> ${local_geoloc}`;
        res.send(output);
        console.log(output);
    }
    catch (exception) {
        res.status(400).send(`Invalid token: ${exception}`);
    }
});

router.put('/update-worker', async (req, res) => {
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
        if (await bcrypt.compare(req.query.old_password, local_worker.password)) {
            const salt = await bcrypt.genSalt(10);
            const new_password = await (await bcrypt.hash(req.query.new_password, salt)).toString();
            const output = await Workers.findOneAndUpdate(
                {
                    id: req.query.id,
                    "password": new_password
                });
            console.log(output);
            res.send(output);
        }

    }
    catch (exception) {
        res.status(400).send(`${exception}`);
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