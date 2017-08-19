/**
 * Expressjs Web App for the trackerTimer.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

let submitButton = document.getElementById('submit')
submitButton.onclick = () => {
  // The current location, without any querystring parameters.
  let loc = `${location.protocol}//${location.host}${location.pathname}`
  // The URL that is going to be analyzed.
  let url = document.getElementById('url').value
  // Go the the current location, with the url to be analyzed as a querystring.
  location.href = loc + `?url=${url}`
  return false // This prevents the form button from reloading the page.
}
