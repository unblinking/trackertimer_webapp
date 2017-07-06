#!/usr/bin/env node

'use strict'

/**
 * Application end points (routes).
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * @param {object} app - The Express application instance.
 * @see {@link https://expressjs.com/en/guide/routing.html Express routing}
 * @see {@link http://expressjs.com/en/api.html Express API}
 */
const router = app => {
  /**
   * GET request to the root route.
   * @example
   * const request = require("request");
   * request("https://trackertimerwebapp.herokuapp.com/",
   *   function(err, res, body) {
   *     if (!err && res.statusCode == 200) {
   *       console.log(body);
   *     }
   *   });
   */
  app.get('/', (req, res) => res.render('index.html'))
}

module.exports = router
