/**
 * RESTful API - Start
 */

const express = require('express');
const Joi = require('@hapi/joi');

const db = require('./test-03-db');
const UserDataJSON = require('../geo-test-data/user-data-01.json');
const FirstAreaJSON = require('../geo-test-data/geo-test-01.json');
const SecondAreaJSON = require('../geo-test-data/geo-test-02.json');
const ThirdAreaJSON = require('../geo-test-data/geo-test-03.json');
const Router = express.Router();

db;
const User = db.createUserModel();
const Geolocation = db.createGeolocationModel();

const schemaJoiUser = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(255).required(),
    isActive: Joi.boolean().required(),
    registration: Joi.date(),
    personalData: {
        fullname: Joi.string().min(3),
        email: Joi.string().email()
    }
});


// Insert all data from json file into mongodb
// curl --request POST localhost:8000/api/insert-all-users -H "Content-Type:application/json" && echo

Router.post('/insert-all-users', (req, res) => {
    console.log('Create all users');

    UserDataJSON.forEach(async (user) => {

        if (Joi.validate(user, schemaJoiUser).error) {
            console.error(`my-error: ${user.error.details[0].messages}`);
            res.status(404).send(user.error.details[0].messages);
            return;
        } else {
            try {
                console.log(await User(user).save());
            }
            catch (exception) {
                console.error(`Error save() ${exception}\n`);
            }
        }
        res.send('Success');
        return;
    });
});


// Get all
// curl --request GET localhost:8000/api/user/get-all-users -H "Content-Type:application/json" && echo 
Router.get('/user/get-all-users', async (req, res) => {
    console.log('Get all');
    // mongo shell ->  db.users.find().pretty();
    const users = await User.find();//.sort('id');
    users.forEach(user => {
        console.log(user);
    });
    res.send('Success');
    return;
    // res.send(users);
});

// curl --request GET localhost:8000/api/user/get-all-active-users -H "Content-Type:application/json" && echo 
Router.get('/user/get-all-active-users', async (req, res) => {
    console.log('Get all active users');
    // mongo shell ->  db.users.find().pretty();
    const users = await User.find({ isActive: true }).sort('id');
    users.forEach(user => {
        console.log(user);
    });
    res.send('Success');
    // res.send(users);
});

// curl --request GET localhost:8000/api/user/get-all-inactive-users -H "Content-Type:application/json" && echo 
Router.get('/user/get-all-inactive-users', async (req, res) => {
    console.log('Get all inactive users');
    // mongo shell ->  db.users.find().pretty();
    const users = await User.find({ isActive: false }).sort('id');
    users.forEach(user => {
        console.log(user);
    });
    res.send('Success');
    // res.send(users);
});

function getArea(area, user, index) {
    const areaArray = new Array();
    area.features.forEach(element => {
        areaArray.push(element.geometry.coordinates);
    })


    return new Object({
        userId: {
            type: user.id,
            reference: user.username
        },
        location: {
            // arbitrary value
            index: index,
            coordinates: areaArray
        }
    });
}

// First active user geolocation data collection
// curl --request POST localhost:8000/api/user/first-area -H "Content-Type:application/json" && echo 
Router.post('/user/first-area', async (req, res) => {
    const users = await User.find({ isActive: true }).sort('id');
    const first = users[0];
    console.log(first);
    const result = await Geolocation(getArea(FirstAreaJSON, first, 1)).save();
    res.send('Success');
    return;
});

// curl --request POST localhost:8000/api/user/second-area -H "Content-Type:application/json" && echo 
Router.post('/user/second-area', async (req, res) => {
    const users = await User.find({ isActive: true }).sort('id');
    const first = users[0];
    console.log(first);
    const result = await Geolocation(getArea(SecondAreaJSON, first, 2)).save();
    res.send('Success');
    return;
});

// curl --request POST localhost:8000/api/user/third-area -H "Content-Type:application/json" && echo 
Router.post('/user/third-area', async (req, res) => {
    const users = await User.find({ isActive: true }).sort('id');
    const first = users[0];
    console.log(first);
    const result = await Geolocation(getArea(ThirdAreaJSON, first, 3)).save();
    res.send('Success');
    return;
});

Router.get('/user/:id', async (req, res) => {
    // check if user exists
    const user = await User.find({ id: req.params.id });
    if (user.length) {
        console.log(user);
        res.send(user);
        return;
    }
    const emptyUser = 'User does not exist.\n';
    console.log(emptyUser);
    res.send(emptyUser);
    return;
});

Router.delete('/delete-all-data', async (req, res) => {
    console.log('Delete all users');
    const deleteUsers = await User.deleteMany();
    const deleteGeolocations = await Geolocation.deleteMany();
    res.send('Success');
});

module.exports = Router;

/**
 * RESTful API - End
 */