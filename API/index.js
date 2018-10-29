const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

const port = 5000;
server.listen(port, () => console.log(`***API running on ${port}***`)); 