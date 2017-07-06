#!/usr/bin/env node

'use strict'

/**
 * The application entry point.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Require the 3rd party modules that will be used.
 * @see {@link https://github.com/expressjs/express express}
 * @see {@link https://github.com/helmetjs/helmet helmet}
 * @see {@link https://github.com/petkaantonov/bluebird bluebird}
 * @see {@link https://nodejs.org/api/path.html path}
 */
const express = require('express')
const helmet = require('helmet')
const P = require('bluebird')
const path = require('path')

/**
 * Require the local modules/functions that will be used.
 */
const routes = require('./routes.js')

/**
 * Define the port for the application entry point to listen on.
 * Use port 1138 if environmental variable PORT is not defined.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt MDN JavaScript parseInt}
 */
const port = parseInt(process.env.PORT, 10) || 1138

/**
 * Define all app configurations here except routes (define routes last).
 * Instantiate the Express application.
 */
const app = express()
app.use(helmet())
app.set('views', './dist')
app.set('view engine', 'html')

/**
 * Define routes last, after all other configurations.
 * @param {object} app - The Express application instance.
 */
routes(app)

/**
 * Listen for connections on the specified port.
 * @see {@link https://expressjs.com/en/api.html#app.listen Express API app.listen}
 */
app.listen(port, () =>
  console.log(`trackerTimer Web App listening on port ${port}.`)
).on('error', err => console.log(err))

/**
 * Define error-handling middleware after app and route configurations.
 */
app.use((req, res, next) => res.send('four, oh four!'))
app.use((err, req, res, next) => res.send(err.message))

module.exports = app // For testing with supertest
