/**
 * Supress Twitter errors 
 */
// window.onerror = function () {
//   console.log('onERROR', arguments)
//   return false
// }
// window.addEventListener('error', function() {
//   console.log('ERROR LISTENER', arguments)
//   return false
// })

/**
 * Clear twitter errors
 */
function checkForTwitterErrors () {
  if (!window.twttr) {
    setTimeout(() => {
      checkForTwitterErrors()
    }, 250)
  } else {
    twttr.ready(function (twttr) {
      twttr.events.bind('rendered', function () {
        console.clear()
        setTimeout(() => {
          console.clear()
        }, 50)
        setTimeout(() => {
          console.clear()
        }, 100)
        setTimeout(() => {
          console.clear()
        }, 250)
        setTimeout(() => {
          console.clear()
        }, 500)
        setTimeout(() => {
          console.clear()
        }, 750)
        setTimeout(() => {
          console.clear()
        }, 1000)
      })
    })
  }
}
checkForTwitterErrors()