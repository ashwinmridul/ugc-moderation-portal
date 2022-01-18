// const path = require("path");
// const express = require("express");
// let  app = express();

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, "static", "index.html")));
// app.use(express.static('src/static'));

// app.listen(3000,  () => console.log("Example app listening on port 3000!"));


import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './routes';

// initialize the server and configure support for ejs templates
const app = new Express();
const express = require("express");
const bodyParser = require("body-parser");
const superagent = require('superagent');

const API_HOST = 'http://0.0.0.0:3333'

// var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let router = express.Router();

// API ROUTES

const sendResponse = (res, err, response) => {
    if (err) {
        res.status(response.statusCode).send(err);
    }
    res.status(response.statusCode).send(response.body);
};

app.get('/getReviewsByUser/:uidx', (req, res) => {
    superagent
    .get(`${API_HOST}/v1/reviews/user?page=1&size=10`)
    .set('x-mynt-ctx', `storeid=2297;uidx=${req.params.uidx};`)
    .end((err, response) => {
        sendResponse(res, err, response);
    });
});

app.get('/getReviewsByProduct/:styleId', (req, res) => {
    superagent
    .get(`${API_HOST}/v1/reviews/product/${req.params.styleId}?size=${req.query.size}&sort=0&rating=0&page=${req.query.page}&includeMetaData=true`)
    .set('x-mynt-ctx', `storeid=2297;uidx=1238f5c4.2cd5.42ce.9b53.9a34596e901an3CPB3C6pJ;`)
    .end((err, response) => {
        sendResponse(res, err, response);
    });
});

// API ROUTES

app.use('/api', router);
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
    console.info(req.url);
    // This context object contains the results of the render
    const context = {};

    const html = renderToString(
        <StaticRouter location={req.url} context={context}>
            <AppRoutes />
        </StaticRouter>
    );
    res.status(200).send(html);
    // res.sendFile(path.join(__dirname, "static", "index.html"));
});

// start the server
const port = process.env.PORT || 3000;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port}`);
});
global.navigator = { userAgent: 'all' };