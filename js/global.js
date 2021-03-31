$ = jQuery
;(function () {
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
})();

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
