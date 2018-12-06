const express       = require('express');
const pgp         = require("pg-promise")();

exports.PORT = 5000;
exports.APP  = express();
exports.DB   = pgp({
  host: 'localhost',
  port: 5432,
  database: 'pahaladb',
  user: 'postgres',
  password: ''
});
exports.bodyParser    = require('body-parser');
exports.randomQuote   = require('random-quote');
exports.jsonPath      = require('jsonpath');
exports.jsonFormatter = require('json-string-formatter');
exports.stringToJson  = require('string-to-json');
exports.striptags     = require('striptags');
exports.openWeather   = require('openweather-apis');
exports.news          = require('newsapi');
exports.webSocket     = require('ws');
exports.xDate         = require('xdate');
exports.holiday       = require('node-holidayapi');
exports.weekend       = require('is-it-weekend');
exports.curl          = require('curl');
exports.firebaseAdmin = require('firebase-admin')
exports.errs          = err => { console.error(err); };
