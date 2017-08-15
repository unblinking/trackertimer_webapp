/* global fetch:false */

let button = document.getElementById('submit')

function showLoading () {
  return new Promise((resolve, reject) => {
    let url = document.getElementById('url').value
    document.getElementById('jumbotron').innerHTML = `&#9201; generating report ...`
    let apiUrl = `https://trackertimerapi.herokuapp.com/?url=${url}`
    resolve(apiUrl)
  })
}

function showData (output) {
  return new Promise(resolve => {
    let text = ''
    for (var i = 0, len = output.length; i < len; i++) {
      text += output[i] + '\n'
    }
    document.body.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block'><a class='btn btn-primary' href='/'>Start Over</a><br><br><pre>${text}</pre></div>`
    resolve()
  })
}

function showError (message) {
  return new Promise(resolve => {
    document.body.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block'><a class='btn btn-primary' href='/'>Start Over</a><br><br><pre>${message}</pre></div>`
    resolve()
  })
}

button.onclick = () => showLoading()
  .then(apiUrl => { return fetch(apiUrl) })
  .then(res => { return res.json() })
  .then(json => {
    if (json.status === 'success') showData(json.output)
    else showError(json.message)
  })
