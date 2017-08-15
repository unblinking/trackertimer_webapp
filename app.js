#!/usr/bin/env node

'use strict'

/**
 * Expressjs front-end for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Modules that will be used.
 * @see {@link https://github.com/expressjs/express express}
 * @see {@link https://github.com/helmetjs helmet}
 * @see {@link https://nodejs.org/api/http.html http}
 * @see {@link https://nodejs.org/api/path.html path}
 */
const expressjs = require('express')
const helmet = require('helmet')
const http = require('http')
const path = require('path')

/**
 * Instantiate the expressjs application.
 */
function expressInstance () {
  return new Promise(resolve => {
    let express = expressjs()
    resolve(express)
  })
}

/**
 * Configure the expressjs application.
 * Define all express configurations here (except routes, define routes last).
 * @param {Object} express The expressjs instance.
 */
function expressConfigure (express) {
  return new Promise(resolve => {
    express.use(helmet())
    express.use(expressjs.static(path.join(__dirname, '/public')))
    express.locals.pretty = true // Pretty html.
    express.set('views', './views')
    express.set('view engine', 'pug')
    resolve()
  })
}

/**
 * Define the express.js routes.
 * @param {Object} express The expressjs instance.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 */
function expressRoutes (express) {
  return new Promise(resolve => {
    express.get('/', (req, res) => res.render('index'))
    resolve()
  })
}

/**
 * Define the express.js error handling middleware.
 * @param {Object} express The expressjs instance.
 */
function expressErrors (express) {
  return new Promise(resolve => {
    express.use((req, res, next) => res.status(404).render('four, oh four!'))
    express.use((err, req, res, next) => {
      res.status(500).send('Something broke!')
      console.log(err.message)
    })
    resolve()
  })
}

/**
 * Instantiate the http server.
 * @param {Object} express The expressjs instance.
 */
function serverInstance (express) {
  return new Promise(resolve => {
    let server = http.Server(express)
    resolve(server)
  })
}

/**
 * Listen for http server connections.
 * @param {Object} server The http server instance.
 */
function serverListen (server) {
  return new Promise(resolve => {
    const port = parseInt(process.env.PORT, 10) || 1138
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      resolve()
    })
  })
}

/**
 * Create the web front-end parts in proper order.
 */
async function create () {
  let express = await expressInstance()
  await expressConfigure(express)
  await expressRoutes(express)
  await expressErrors(express)
  let server = await serverInstance(express)
  await serverListen(server)
}
exports.create = create // For supertest

create()
