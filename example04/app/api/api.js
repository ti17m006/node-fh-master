/** router */
const express = require('express');
express().use(express.json());
const router = express.Router();
const Joi = require('@hapi/joi');
const db = require('../database/db_connection');
const schemas = require('../../app_modules/joi_schema');
const managersData = require('../database/data/managers.json');
const userData = require('../database/data/users.json');
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
    let manager;
    let _id = parseInt(req.params.id);
    if ( _id > 0) {
        try {
            manager = await Managers.find({ id: _id });
            res.send(manager + '\n');
        } catch (exception) {
            console.error(`Error get()  ${exception}\n`);
            res.status(404).send('\n');
        }
    } else {
        res.status(404).send(`Invalid id: ${req.params.id}\n`);
    }
});

module.exports = router;