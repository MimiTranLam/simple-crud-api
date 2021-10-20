const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // addition

const indexRouter = require('./routes/index');
const e = require("express");
//const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // addition

app.use('/api', indexRouter);
// app.use('/users', usersRouter);

app.use((req, res, next) => {
    const error = new Error("Url request invalid");
    error.statusCode = 404;
    console.log(`error request url`, req.path);
    next (error);
});

app.use((err, req, res, next) => {
    if (err.statusCode) {
        return res.send(err.statusCode).send(err.message);
    } else {
        return res.status(500).send(err.message);
    }
});

module.exports = app;
