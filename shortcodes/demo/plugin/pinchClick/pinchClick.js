/**
 * pinchClick plugin
 */
 handsfree.use('pinchClick', {
  config: {
    threshold: 10,
    
    // Which fingers should trigger a click
    fingers: [
      [true, false, false, false],
      [true, false, false, false],
      [true, false, false, false],
      [true, false, false, false],
    ]
  },
   
  // Stores how many frames passed between start and released
  pinchedCounter: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ],

  onFrame: function ({hands}) {
    if (!hands?.pinchState) return
    
    hands.pinchState.forEach((hand, handIdx) => {
      hand.forEach((finger, fingerIdx) => {
        // Click if the finger is active
        if (this.config.fingers[handIdx][fingerIdx]) {
          if (hands.pinchState[handIdx][fingerIdx] === 'start') {
            this.pinchedCounter[handIdx][fingerIdx] = 0
          } else if (hands.pinchState[handIdx][fingerIdx] === 'held') {
            this.pinchedCounter[handIdx][fingerIdx] += 1
          } else if (hands.pinchState[handIdx][fingerIdx] === 'released') {
            this.pinchedCounter[handIdx][fingerIdx] < this.config.threshold && this.click(hands, handIdx)
          }
        }
      })
    })
  },

  /**
   * Trigger a click
   */
  click (hands, handIdx) {
    if (!hands.pointer) return

    // Try because occasionally the element is not visible etc
    try {
      const $el = document.elementFromPoint(hands.pointer[handIdx].x, hands.pointer[handIdx].y)
      
      if ($el) {
        $el.click()
  
        // Focus
        if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName)) {
          $el.focus()
        }
      }
    } catch (e) {}
  }
})
