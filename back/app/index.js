const express = require('express');
const app = express();

app.get('/health', (req, res) => {
    res.status(200).send('server is alive');
});

module.exports = app;