/**
 * Expressjs Web App for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

let submitButton = document.getElementById('submit')
submitButton.onclick = () => {
  let url = document.getElementById('url').value
  window.location.href = `http://127.0.0.1:1138/?url=${url}`
  return false
}
