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
    resolve(`https://trackertimerapi.herokuapp.com/?url=${url}`)
  })
}

/**
 * Request the API URL and return the JSON response.
 * @type {String} apiUrl The full API URL including querystring.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest Using XMLHttpRequest}
 */
function requestData (apiUrl) {
  return new Promise((resolve, reject) => {
    function reqListen () {
      resolve(JSON.parse(this.response))
    }
    function reqErr (err) {
      resolve({
        'status': 'error',
        'message': 'There was an error during the XMLHttpRequest: ' + JSON.stringify(err)
      })
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

    // Get rid of the loading message.
    let loading = document.getElementById('loading')
    loading.parentNode.removeChild(loading)

    // Build up the HTML to show the data, then show it.
    let container = document.createElement('div')
    container.className = 'container'
    let jumbotron = document.createElement('div')
    jumbotron.className = 'jumbotron'
    jumbotron.style.display = 'block'
    let startOver = document.createElement('a')
    startOver.className = 'btn btn-primary'
    startOver.href = '/'
    startOver.innerHTML = 'Click here to start over.'
    startOver.title = 'Start Over'
    let h1 = document.createElement('h1')
    h1.innerHTML = 'Success! Below is the performance report'
    let ul = document.createElement('ul')
    let li1 = document.createElement('li')
    li1.innerHTML = 'If there were any errors during processing of the URL they will be listed first.'
    let li2 = document.createElement('li')
    li2.innerHTML = 'If there were no errors, the first information will be the configuration settings (hard coded for now), followed by elapsed load times for resources.'
    let li3 = document.createElement('li')
    li3.innerHTML = 'Below that will be the waterfall diagram of the waits and receipts of each requested resource.'
    let li4 = document.createElement('li')
    li4.innerHTML = 'Below the waterfall diagram are resource URLs, numbered to correspond to the rows of the diagram.'
    ul.appendChild(li1)
    ul.appendChild(li2)
    ul.appendChild(li3)
    ul.appendChild(li4)
    let hr = document.createElement('hr')
    let pre = document.createElement('pre')
    pre.innerHTML = text
    let body = document.body
    jumbotron.appendChild(startOver)
    jumbotron.appendChild(document.createElement('br'))
    jumbotron.appendChild(document.createElement('br'))
    jumbotron.appendChild(h1)
    jumbotron.appendChild(document.createElement('br'))
    jumbotron.appendChild(ul)
    jumbotron.appendChild(document.createElement('br'))
    jumbotron.appendChild(hr)
    jumbotron.appendChild(pre)
    container.appendChild(jumbotron)
    body.appendChild(container)

    resolve()
  })
}

/**
 * Show an error message.
 * @param  {String} message An error message.
 */
function showError (message) {
  return new Promise(resolve => {
    let loading = document.getElementById('loading')
    loading.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block'><a class='btn btn-primary' href='/'>Start Over</a><br><br><pre>${message}</pre></div>`
    resolve()
  })
}

formatApiUrl()
  .then(apiUrl => { return requestData(apiUrl) })
  .then(json => {
    if (json.status === 'success') showData(json.output)
    else showError(json.message)
  })
