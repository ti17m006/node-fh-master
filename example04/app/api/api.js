/** router */
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const db = require('./e04b');
const schemas = require('./e04_modules/e04_joi_schema');
const managersData = require('./e04d_managers.json');
const userData = require('./e04e_users.json');
const geoData = require('./e04f/e04f_all');
db; // creating a db and its collections
const Managers = db.createManager();
const Users = db.createUser();
const Geolocations = db.createGeolocation();
