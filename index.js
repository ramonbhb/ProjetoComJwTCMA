const express = require('express');
const routes = require('./routes/routes');
// const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env'});

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(routes);
app.listen(3000);
// Sequelize ORM(Object Relationship Model)
