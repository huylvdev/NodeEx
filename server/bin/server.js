'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../src/config/key')
const apiRouter = require('../src/routes/api')
const postRouter = require('../src/routes/post')

mongoose.set('useCreateIndex', true)
mongoose.connect(keys.mongodb.dbURL, {
  useNewUrlParser: true, useUnifiedTopology: true,
}, () => {
  console.log('connet monggodb')
});


router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
app.use(apiRouter, postRouter);
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
