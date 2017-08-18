/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Expressjs Web App for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

/**
 * Get the text form input URL and prevent further input by replacing the input
 * with a loading message. Return an API URL string where the input URL is a
 * 'url' query string at the end.
 * @return {String} The API URL.
 */
function formatApiUrl () {
  return new Promise(resolve => {
    let url = document.getElementById('url').value
    let jumbotron = document.getElementById('jumbotron')
    jumbotron.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-animated"></div><br>&#9201; generating report ...`
    resolve(`https://trackertimerapi.herokuapp.com/?url=${url}`)
  })
}

/**
 * Request the API URL and return the JSON response.
 * @type {String} apiUrl The full API URL including querystring.
 */
function requestData (apiUrl) {
  return new Promise((resolve, reject) => {
    function reqListen () {
      resolve(JSON.parse(this.responseText))
    }
    function reqErr (err) {
      alert(`Error during XMLHttpRequest: ${err}`)
    }
    let req = new XMLHttpRequest()
    req.onload = reqListen
    req.onerror = reqErr
    req.open('get', apiUrl, true)
    req.send()
  })
}

/**
 * Show the performance report data.
 * @param  {Array} output Performance report as an array of report lines.
 */
function showData (output) {
  return new Promise(resolve => {
    let text = ''
    for (var i = 0, len = output.length; i < len; i++) {
      text += output[i] + '\n'
    }
    document.body.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block'><a class='btn btn-primary' href='/'>Click Here To Start Over</a><br><br><h1>Success! Below is the performance report.</h1><br><ul><li>If there were any errors during processing of the URL they will be listed first.</li><li>If there were no errors, the first information will be the configuration settings (hard coded for now), followed by elapsed load times for resources.</li><li>Below that will be the waterfall diagram of the waits and receipts of each requested resource.</li><li>Below the waterfall diagram are resource URLs, numbered to correspond to the rows of the diagram.</li></ul><br><hr><pre>${text}</pre></div>`
    resolve()
  })
}

/**
 * Show an error message.
 * @param  {String} message An error message.
 */
function showError (message) {
  return new Promise(resolve => {
    document.body.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block'><a class='btn btn-primary' href='/'>Start Over</a><br><br><pre>${message}</pre></div>`
    resolve()
  })
}

let submitButton = document.getElementById('submit')
submitButton.onclick = () => formatApiUrl()
  .then(apiUrl => { return requestData(apiUrl) })
  .then(json => {
    if (json.status === 'success') showData(json.output)
    else showError(json.message)
  })


/***/ })
/******/ ]);