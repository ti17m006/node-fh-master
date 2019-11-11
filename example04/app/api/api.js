/** router */
const express = require('express');
express().use(express.json());
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

router.post('/geolocation/:userId', async (req, res) => {
    const _id = parseInt(req.params.userId);
    let tmp =
    {
        workerId: Number,
        location:[
            {
                date: { type: Date, default: Date.now() },
                type: { type: String, default: 'MultiPoint' },
                coordinates: [[Number, Number]]
            }
        ]
        
    };
    if (_id > 0) {
        try {
            const worker = await Workers.find({ id: _id });
            if (worker.length) {
                tmp.workerId = worker[0].id;
                switch (worker[0].id) {
                    case 1:
                        try {
                            geoData.Geo01.features.forEach(e => {

                            });
                            console.log(tmp);
                            console.log(tmp.location);
                            // console.log(tmp[1].location.coordinates);
                            // console.log(tmp[1].location.coordinates);

                            // geoData.Geo01.features.forEach(async (element) => {
                            //     tmp.id = element.id;
                            //     tmp.location.index = element.location.index;
                            //     tmp.location.date = element.location.date;
                            //     tmp.location.type = element.location.type;
                            //     element.coordinates.forEach(coordinates => {
                            //         tmp.location.coordinates = coordinates.slice();
                            //     });
                            //     console.log(await Geolocations(tmp).save());
                            // });
                        }
                        catch (exception) {
                            console.error(`Geo01  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 2:
                        try {
                            geoData.Geo02.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo02  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 3:
                        try {
                            geoData.Geo03.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 4:
                        try {
                            geoData.Geo04.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 5:
                        try {
                            geoData.Geo05.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 6:
                        try {
                            geoData.Geo06.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 7:
                        try {
                            geoData.Geo07.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 8:
                        try {
                            geoData.Geo08.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    case 9:
                        try {
                            geoData.Geo09.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
                        }
                        catch (exception) {
                            console.error(`Geo03  ${exception}\n`);
                            res.status(404).send('\n');
                        }
                        break;
                    default:
                        try {
                            geoData.Geo10.features.forEach(async (element) => {
                                tmp.id = element.id;
                                tmp.location.index = element.location.index;
                                tmp.location.date = element.location.date;
                                tmp.location.type = element.location.type;
                                element.coordinates.forEach(coordinates => {
                                    tmp.location.coordinates = coordinates.slice();
                                });
                                console.log(await Geolocations(tmp).save());
                            });
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
// router.get('/geolocation/:userId', (req, res) => {});
module.exports = router;