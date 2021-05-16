$ = jQuery
;(function () {
  /**
   * Handsfree.js
   */
  handsfree = new Handsfree({
    hands: true,
    // showDebug: true
  })
  handsfree.enablePlugins('browser')
  
  /**
   * Hide controls briefly on videos that autoplay on start don't briefly show controls
   */
  const $autoplayVideos = $('video[autoplay]')
  setTimeout(() => {
    $autoplayVideos.attr('controls', true)
  }, 500)
  
  /**
   * Autoplay active video inside carousels
   */
  $('.owl-carousel').on('changed.owl.carousel', function () {
    setTimeout(() => {
      const $video = $(this).find('.owl-item.active video')
      
      $(this).find('video').trigger('pause')
      $video.attr('controls', null)
      $video.trigger('play')

      // If controls are visible when played, then they will briefly appear
      // before fading out (at least on Chrome)
      setTimeout(() => {
        $video.attr('controls', true)
      }, 250)
    })
  })

  /**
   * Confetti
   * - if element has .handsfree-show-when-stopped then it'll get deferred until after running
   */
  $('.confetti-on-click').on('click', function () {
    let bounds = this.getBoundingClientRect()
    let config = {
      particleCount: 200,
      spread: 360,
      ticks: 60,
      startVelocity: 20,
      origin: {
        x: (bounds.x + bounds.width / 2) / window.innerWidth,
        y: bounds.y / window.innerHeight
      }
    }
    
    // Shoot after handsfree receives data
    if ($(this).hasClass('handsfree-show-when-stopped')) {
      bounds = $('~ .handsfree-show-when-loading', this)[0].getBoundingClientRect()
      config.origin.x = (bounds.x + bounds.width / 2) / window.innerWidth,
      config.origin.y = bounds.y / window.innerHeight

      handsfree.on('data', () => {
        confetti(config)
      }, {once: true})

    // Shoot immediately
    } else {
      confetti(config)
    }
  })
})();





/**
 * Random number between @min and @max
 * @see https://stackoverflow.com/a/7228322
 */
function rand(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Clear Twitter widget warnings and errors
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
 */
