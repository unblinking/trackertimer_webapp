let button = document.getElementById('submit')

function showLoading () {
  return new Promise((resolve, reject) => {
    let url = document.getElementById('url').value
    document.body.innerHTML = `&#9201; generating report ...`
    let apiUrl = `https://trackertimerapi.herokuapp.com/?url=${url}`
    resolve(apiUrl)
  })
}

function showData (text) {
  return new Promise((resolve, reject) => {
    document.body.innerHTML = `<div class='jumbotron mx-auto align-middle' display='block' width='100%'><a class='btn btn-primary' href='/'>Start Over</a><br><br><pre>${text}</pre></div>`
    resolve()
  })
}

button.onclick = () => {
  showLoading()
    .then((apiUrl) => {
      return fetch(apiUrl)
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      let text = ''
      Object.keys(json.json).forEach(key => {
        text += json.json[key] + '\n'
      })
      return showData(text)
    })
}
