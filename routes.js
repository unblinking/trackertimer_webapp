#!/usr/bin/env node

'use strict'

/**
 * Application end points (routes) for the trackerTimer API server.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
* Handle a request to the root route.
* @param {Object} req The expressjs request.
* @param {Object} res The expressjs response.
*/
function index (req, res) {
  return new Promise(resolve => {
    res.render('index')
    resolve()
  })
}

/**
 * Handle a request for a URL performance report.
 * @param {Object} req The expressjs request.
 * @param {Object} res The expressjs response.
 */
function urlQueryStringReceived (req, res) {
  return new Promise(resolve => {
    res.render('url', {'url': req.query.url})
    resolve()
  })
}

/**
* Define the expressjs routes.
* @param {Object} express - The expressjs instance.
*/
function router (express) {
  express.get('/', (req, res) => {
    if (req.query.url !== undefined) urlQueryStringReceived(req, res)
    else index(req, res)
  })
}
exports.router = router
