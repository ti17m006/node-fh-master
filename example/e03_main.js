/** main */
const PORT = 8000;
const express = require('express');
const app = express();
const router = require('./e03a');
app.use(express.json());
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});