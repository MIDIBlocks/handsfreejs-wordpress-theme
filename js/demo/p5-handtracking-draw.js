$('.demo-p5-handtracking-draw').each(function () {
  let $this = this
  let prevPointer = [
    [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
    [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
  ]

  this.p5 = new p5(function (p) {
    /** 
     * Setup
     * - Configure handsfree (set which models, plugins, and gestures you want to use)
     * - Create start/stop buttons. It's nice to always ask user for permission to start webcam :)
     */
    p.setup = function(){
      p.createCanvas($this.getBoundingClientRect().width, 400)
    
      // Colors for each fingertip
      colorMap = [
        // Left fingertips
        [p.color(0, 0, 0), p.color(255, 0, 255), p.color(0, 0, 255), p.color(255, 255, 255)],
        // Right fingertips
        [p.color(255, 0, 0), p.color(0, 255, 0), p.color(0, 0, 255), p.color(255, 255, 0)]
      ]

      // Clear with button
      $($this).next().find('button').on('click', function () {
        p.background(255, 255, 255)
      })
    }

    /**
     * Main draw loop
     */
    p.draw = function () {
      fingerPaint()
      mousePaint()
    }
    
    /**
     * #2 Finger paint
     * Since p5.js already has it's own loop, we just check the data directly
     * @see https://handsfree.js.org/ref/plugin/pinchers.html
     */
    const fingerPaint = function () {
      // Check for pinches and create dots if something is pinched
      const hands = handsfree.data?.hands
      let bounds = $this.getBoundingClientRect()

      // Paint with fingers
      if (hands?.pinchState) {
        // Loop through each hand
        hands.pinchState.forEach((hand, handIndex) => {
          if (!handIndex) return
          
          // Loop through each finger
          hand.forEach((state, finger) => {
            if (hands.pointer[handIndex].y >= bounds.y && hands.pointer[handIndex].y <= bounds.y + bounds.height) {
              let x = hands.pointer[handIndex].x - bounds.x
              let y = hands.pointer[handIndex].y - bounds.y
              
              p.fill(colorMap[handIndex][finger])
              p.stroke(colorMap[handIndex][finger])
              p.strokeWeight(10)
      
              // Draw a circle on the spot that we started
              if (state === 'start') {
                prevPointer[handIndex, finger] = {x, y}

              // Draw line from circle
              } else if (state === 'held') {
                p.line(prevPointer[handIndex, finger].x, prevPointer[handIndex, finger].y, x, y)
              }

              // Set the last position
              prevPointer[handIndex, finger] = {
                x: hands.pointer[handIndex].x - bounds.x,
                y: hands.pointer[handIndex].y - bounds.y
              }
            }
          })
        })  
      } 
        
      // Clear everything if the left [0] pinky [3] is pinched
      if (hands?.pinchState && hands.pinchState[0][3] === 'released') {
        p.background(255, 255, 255)
      }
    }

    /**
     * Draw the mouse
     */
    const mousePaint = function () {
      if (p.mouseIsPressed === true) {
        p.fill(colorMap[1][0])
        p.stroke(colorMap[1][0])
        p.strokeWeight(10)
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
      }
    }
  }, this)
})