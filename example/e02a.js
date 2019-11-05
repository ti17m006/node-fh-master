/**
 * https://expressjs.com/en/guide/routing.html
 */
const router = require('express').Router();
router.get('', (req, res) => {
    res.send('http GET method\n');
});
router.post('', (req, res) => {
    res.send('http POST method\n');
});
router.put('', (req, res) => {
    res.send('http PUT method\n');
});
router.delete('', (req, res) => {
    res.send('http DELETE method\n');
});
module.exports = router;