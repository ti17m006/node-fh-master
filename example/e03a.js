/** Router */
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const db = require('./e03b');
const dataJSON = require('./e03d.json');
db;
const Users = db.createUserModel();
const schemaJoiUser = Joi.object({
    index: Joi.number().integer().required(),
    fullname: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(10).max(255).required()
});
router.get('/get-all-users', async (req, res) => {
    console.log('\nGet all users: \n');
    const users = await Users.find();
    users.forEach(user => {
        console.log(user);
    });
    res.send('Success');
    return;
});
router.post('/create-all-users', (req, res) => {
    console.log('\nCreate all users: \n');
    dataJSON.forEach(async (user) => {
        if (Joi.validate(user, schemaJoiUser).error) {
            console.error(`my-error: ${user.error}`);
            res.status(404).send(user.error);
            return;
        } else {
            try {
                console.log(await Users(user).save());
            }
            catch (exception) {
                console.error(`Error save() ${exception}\n`);
            }
        }
    });
    res.send('Success');
    return;
});
module.exports = router;