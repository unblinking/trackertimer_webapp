/**
 * Expressjs Web App for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

let submitButton = document.getElementById('submit')
submitButton.onclick = () => {
  let loc = location.href
  let url = document.getElementById('url').value
  location.href = loc + `?url=${url}`
  return false
}
