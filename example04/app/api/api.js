/** router */
const express = require('express');
express().use(express.json());
const router = express.Router();
const Joi = require('@hapi/joi');
const db = require('../database/db_connection');
// const schemas = require('../');
const managersData = require('../database/data/managers.json');
const userData = require('../database/data/users.json');
const geoData = require('../database/data/geo/d_all');

// const Managers = db.createManager();
// const Workers = db.createWorker();
// const Geolocations = db.createGeolocation();

router.get('/', (req, res) => {
    console.log('Ok!\n');
    
    res.send('Ok!\n');
});

module.exports = router;