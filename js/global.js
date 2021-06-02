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
      handsfree.on('data', () => {
        bounds = $('~ .handsfree-show-when-started', this)[0].getBoundingClientRect()
        config.origin.x = (bounds.x + bounds.width / 2) / window.innerWidth,
        config.origin.y = bounds.y / window.innerHeight

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
 * Enlighter Backup and Restore
 * - This is needed to prevent Vue from removing whitespaces during a mount
 */
enlighterCodeBackups = []

/**
 * Step 1: Call this before new Vue()
 */
function enlighterBackup () {
  $('.enlighter-default').each(function () {
    let $this = $(this)
    enlighterCodeBackups.push($this.html())
  })
}

/**
 * Step 2: Call this inside the Vue's mounted event
 */
function enlighterRestoreBackups () {
  $('.enlighter-default').each(function () {
    $(this).html(enlighterCodeBackups.shift())
  })
}




/**
 * Overwrite pinchScroll so that it doesn't scroll while painting
 */
handsfree.use('pinchScroll', {
  models: 'hands',
  tags: ['browser'],
  enabled: true,

  // Number of frames the current element is the same as the last
  numFramesFocused: [0, 0, 0, 0],
  // The current scrollable target
  $target: [null, null, null, null],

  // The original grab point
  origScrollLeft: [0, 0, 0, 0],
  origScrollTop: [0, 0, 0, 0],

  // The tweened scrollTop, used to smoothen out scroll
  tweenScroll: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],

  config: {
    // Number of frames over the same element before activating that element
    framesToFocus: 10,

    // Number of pixels the middle and thumb tips must be near each other to drag
    threshold: 50,

    // Number of frames where a hold is not registered before releasing a drag
    numThresholdErrorFrames: 5,

    // Speed multiplier
    speed: 1
  },

  /**
   * Scroll the page when the cursor goes above/below the threshold
   */
  onFrame ({hands}) {
    // Wait for other plugins to update
    setTimeout(() => {
      if (!hands.pointer) return
      const height = this.handsfree.debug.$canvas.hands.height
      const width = this.handsfree.debug.$canvas.hands.width

      hands.pointer.forEach((pointer, n) => {
        // @fixme Get rid of n > origPinch.length
        if (!pointer.isVisible || n > hands.origPinch.length) return

        // Start scroll
        if (hands.pinchState[n]?.[0] === 'start') {
          let $potTarget = document.elementFromPoint(pointer.x, pointer.y)
          let isValidTarget = this.checkDontScroll($potTarget)

          if (isValidTarget) {
            this.$target[n] = this.getTarget($potTarget)
            this.tweenScroll[n].x = this.origScrollLeft[n] = this.getTargetScrollLeft(this.$target[n])
            this.tweenScroll[n].y = this.origScrollTop[n] = this.getTargetScrollTop(this.$target[n])
            this.handsfree.TweenMax.killTweensOf(this.tweenScroll[n])
          } else {
            this.$target[n] = null
          }
        }

        if (hands.pinchState[n]?.[0] === 'held' && this.$target[n]) {
          // With this one you have to pinch, drag, and release in sections each time
          // this.handsfree.TweenMax.to(this.tweenScroll[n], 1, {
          //   x: this.origScrollLeft[n] - (hands.origPinch[n][0].x - hands.curPinch[n][0].x) * width,
          //   y: this.origScrollTop[n] + (hands.origPinch[n][0].y - hands.curPinch[n][0].y) * height,
          //   overwrite: true,
          //   ease: 'linear.easeNone',
          //   immediateRender: true  
          // })

          // With this one it continuously moves based on the pinch drag distance
          this.handsfree.TweenMax.to(this.tweenScroll[n], 1, {
            x: this.tweenScroll[n].x - (hands.origPinch[n][0].x - hands.curPinch[n][0].x) * width * this.config.speed,
            y: this.tweenScroll[n].y + (hands.origPinch[n][0].y - hands.curPinch[n][0].y) * height * this.config.speed,
            overwrite: true,
            ease: 'linear.easeNone',
            immediateRender: true  
          })

          this.$target[n].scrollTo(this.tweenScroll[n].x, this.tweenScroll[n].y)
        }
      })
    })
  },

  /**
   * Finds the closest scroll area
   */
  getTarget ($potTarget) {
    const styles = $potTarget && $potTarget.getBoundingClientRect ? getComputedStyle($potTarget) : {}

    if ($potTarget && $potTarget.scrollHeight > $potTarget.clientHeight &&
      (styles.overflow === 'auto' ||
        styles.overflow === 'auto scroll' ||
        styles.overflowY === 'auto' ||
        styles.overflowY === 'auto scroll')
    ) {
      return $potTarget
    } else {
      if ($potTarget && $potTarget.parentElement) {
        return this.getTarget($potTarget.parentElement)
      } else {
        return window
      }
    }
  },

  /**
   * Check recursively for a parent element with .handsfree-dont-scroll
   */
  checkDontScroll ($potTarget) {
    if ($potTarget && $potTarget.classList.contains('handsfree-dont-scroll')) {
      return false
    }

    if ($potTarget && $potTarget.parentElement) {
      if ($potTarget.parentElement.classList.contains('handsfree-dont-scroll')) {
        return false
      } else {
        return this.checkDontScroll($potTarget.parentElement)
      }
    }

    return true
  },

  /**
   * Gets the scrolltop, taking account the window object
   */
  getTargetScrollLeft ($target) {
    return $target.scrollX || $target.scrollLeft || 0
  },

  /**
   * Gets the scrolltop, taking account the window object
   */
  getTargetScrollTop ($target) {
    return $target.scrollY || $target.scrollTop || 0
  }
})





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
