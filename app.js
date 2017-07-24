#!/usr/bin/env node

'use strict'

/**
 * Express.js front-end for the trackerTimer.
 * @author jmg1138 {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * 3rd party modules that will be used.
 * @see {@link https://github.com/expressjs/express express}
 * @see {@link https://nodejs.org/api/http.html http}
 * @see {@link https://nodejs.org/api/path.html path}
 */
const express = require('express')
const http = require('http')
const path = require('path')

/**
 * Instantiate the express.js application.
 * @param {Object} bundle The main bundle of shared references.
 */
function expressInstance (bundle) {
  return new Promise(resolve => {
    bundle.express = express()
    resolve()
  })
}

/**
 * Configure the express.js application.
 * Define all express configurations here (except routes, define routes last).
 * @param {Object} bundle The main bundle of shared references.
 */
function expressConfigure (bundle) {
  return new Promise(resolve => {
    bundle.express.use(express.static(path.join(__dirname, '/public')))
    bundle.express.locals.pretty = true // Pretty html.
    bundle.express.set('views', './views')
    bundle.express.set('view engine', 'pug')
    resolve()
  })
}

/**
 * Define the express.js routes.
 * @param {Object} bundle The main bundle of shared references.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 */
function expressRoutes (bundle) {
  return new Promise(resolve => {
    bundle.express.get('/', (req, res) => res.render('index'))
    resolve()
  })
}

/**
 * Define the express.js error handling middleware.
 * @param {Object} bundle The main bundle of shared references.
 */
function expressErrors (bundle) {
  return new Promise(resolve => {
    bundle.express.use(function (req, res, next) {
      res.status(404).render('404')
    })
    bundle.express.use(function (err, req, res, next) {
      res.status(500).send('Something broke!')
    })
    resolve()
  })
}

/**
 * Instantiate the http server.
 * @param {Object} bundle The main bundle of shared references.
 */
function serverInstance (bundle) {
  return new Promise(resolve => {
    bundle.server = http.Server(bundle.express)
    resolve()
  })
}

/**
 * Listen for http server connections.
 * @param {Object} bundle The main bundle of shared references.
 * @see {@link https://expressjs.com/en/api.html#app.listen Express app.listen}
 */
function serverListen (bundle) {
  return new Promise(resolve => {
    const port = parseInt(process.env.PORT, 10) || 1138
    bundle.server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      resolve()
    })
  })
}

/**
 * Create the web front-end parts in proper order.
 * @param {Object} bundle The main bundle of shared references.
 */
async function create (bundle) {
  await expressInstance(bundle)
  await expressConfigure(bundle)
  await expressRoutes(bundle)
  await expressErrors(bundle)
  await serverInstance(bundle)
  await serverListen(bundle)
}
exports.create = create

/**
 * The main "bundle" object, which holds copies of references, to be passed to
 * other functions. I'm creating it here with undefined (placeholder) names that
 * will be assigned as the application starts up.
 */
var bundle = {
  "express": undefined, // Express.js web application framework.
  "server": undefined // Http server for Express.js.
}
create(bundle)
