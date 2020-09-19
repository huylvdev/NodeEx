'use strict';

const HOST = '0.0.0.0'
const PORT = '8080'

const app = require('./bin/server');

app.listen(PORT, HOST);
