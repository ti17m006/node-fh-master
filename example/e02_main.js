/** Expressjs */
const PORT = 8000;
const express = require('express');
const app = express();
const router = require('./e02a');
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});