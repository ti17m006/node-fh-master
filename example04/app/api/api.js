/** router */
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const db = require('../database/db_connection');
const schemas = require('../../app_modules/joi_schema');
const managersData = require('../database/data/managers.json');
const workersData = require('../database/data/workers.json');
const geoData = require('../database/data/geo/d_all');

db;
const Managers = db.createManager();
const Workers = db.createWorker();
const Geolocations = db.createGeolocation();

router.post('/manager/create', (req, res) => {
    managersData.forEach(async (manager) => {
        if (Joi.validate(manager, schemas.JoiManager).error) {
            console.error(`my-error: ${user.error.details[0].messages}`);
            res.status(404).send(user.error.details[0].messages);
            return;
        } else {
            try {
                console.log(await Managers(manager).save());
            }
            catch (exception) {
                console.error(`Error save() ${exception}\n`);
            }
        }
    });
    res.status(200).send('Managers saved\n');
});

router.get('/manager/:id', async (req, res) => {
    const _id = parseInt(req.params.id);
    if (_id > 0) {
        try {
            const manager = await Managers.find({ id: _id });
            //console.log(maneger);
            if (manager.length) {
                res.send(manager + '\n');
            } else {
                res.status(404).send(`Doesn't exist\n`);
            }
        } catch (exception) {
            console.error(`Error get()  ${exception}\n`);
            res.status(404).send('\n');
        }
    } else {
        res.status(404).send(`Invalid id: ${req.params.id}\n`);
    }
});

router.post('/worker/create', (req, res) => {
    workersData.forEach(async (worker) => {
        if (Joi.validate(worker, schemas.JoiWorker).error) {
            console.error(`my-error: ${user.error.details[0].messages}`);
            res.status(404).send(user.error.details[0].messages);
            return;
        } else {
            try {
                console.log(await Workers(worker).save());
            }
            catch (exception) {
                console.error(`Error save() ${exception}\n`);
            }
        }
    });
    res.status(200).send('Workers saved\n');
});

router.get('/worker/:id', async (req, res) => {
    const _id = parseInt(req.params.id);
    if (_id > 0) {
        try {
            const worker = await Workers.find({ id: _id });
            // console.log(worker);
            if (worker.length) {
                res.send(worker + '\n');
            } else {
                res.status(404).send(`Doesn't exist\n`);
            }
        } catch {
            console.error(`Error get()  ${exception}\n`);
            res.status(404).send('\n');
        }
    } else {
        res.status(404).send(`Invalid id: ${req.params.id}\n`);
    }
});

router.post('/geolocation/:workerId', async (req, res) => {
    const _id = parseInt(req.params.workerId);
    let tmp =
    {
        workerId: Number,
        locationLength: Number,
        location: []
    };
    if (_id > 0) {
        try {
            const worker = await Workers.find({ id: _id });
            if (worker.length) {
                tmp.workerId = worker[0].id;
                tmp.locationLength = 0;
                switch (worker[0].id) {
                    case 1:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo01  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 2:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo02  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 3:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 4:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 5:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 6:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 7:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 8:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 9:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    default:
                        try {
                            console.log(await Geolocations(tmp).save());
                            res.send('Ok!\n');
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                }
            } else {
                res.status(404).send(`Doesn't exist\n`);
            }
        } catch (exception) {
            console.error(`Error get()  ${exception}\n`);
            res.status(404).send('\n');
        }
    } else {
        res.status(404).send(`Invalid id: ${req.params.id}\n`);
    }
});

router.put('/geolocation/:id', async (req, res) => {
    const _id = parseInt(req.params.id);
    if (_id > 0) {
        geoData.Geo01.features.forEach(async (e) => {
            try {
                const geolocation = await Geolocations.updateOne(
                    { workerId: _id },
                    {
                        $inc: {
                            locationLength: 1 
                        },
                        $push: {
                            location: e.geometry
                        },
                    },
                    { new: true }
                );   
            } catch {
                console.error(`Error get()  ${exception}\n`);
                res.status(404).send('\n');
            }
        });
    } else {
        res.status(404).send(`Invalid id: ${req.params.id}\n`);
    }
    res.send('Ok\n');
});

router.get('/geolocation-all', async (req, res) => {

    try {
        const tmp = await Geolocations.find();
        if (tmp.length) {
            res.send(tmp);
        }
    } catch (exception) {
        console.error(`Error get()  ${exception}\n`);
        res.status(404).send('\n');
    }
});
module.exports = router;