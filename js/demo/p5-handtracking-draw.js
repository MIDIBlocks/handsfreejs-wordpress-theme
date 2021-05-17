$('.demo-p5-handtracking-draw').each(function () {
  let $this = this
  
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
    }

    /**
     * Main draw loop
     */
    p.draw = function () {
      p.background('rgba(0,0,0,0)')
      p.clear()
      fingerPaint()
      mousePaint()
      drawPaint()
    }
    
    /**
     * #2 Finger paint
     * Since p5.js already has it's own loop, we just check the data directly
     * @see https://handsfree.js.org/ref/plugin/pinchers.html
     */
    // Whenever we pinch and move we'll store those points as a set of [x1, y1, handIndex, fingerIndex, size]
    let paint = []
    
    const fingerPaint = function () {
      // Check for pinches and create dots if something is pinched
      const hands = handsfree.data?.hands
      let bounds = $this.getBoundingClientRect()

      if (hands?.pinchState) {
        // Loop through each hand
        hands.pinchState.forEach((hand, handIndex) => {
          if (!handIndex) return
          
          // Loop through each finger
          hand.forEach((state, finger) => {
            // Other states are "start" and "released"
            if (state === 'held' && hands.pointer[handIndex].y >= bounds.y && hands.pointer[handIndex].y <= bounds.y + bounds.height) {
              // Left [0] index finger [0] is the eraser, so let's make it paint larger
              const circleSize = handIndex === 0 && finger === 0 ? 40 : 10
              
              // Store the paint
              paint.push([
                hands.pointer[handIndex].x - bounds.x,
                hands.pointer[handIndex].y - bounds.y,
                handIndex, finger, circleSize
              ])
            }
          })
        })  
      } 
        
      // Clear everything if the left [0] pinky [3] is pinched
      if (hands?.pinchState && hands.pinchState[0][3] === 'released') {
        paint = []
      }
    }

    /**
     * Draw the mouse
     */
    const mousePaint = function () {
      if (p.mouseIsPressed === true) {
        paint.push([p.mouseX, p.mouseY, 1, 0, 10])
      }
    }

    /**
     * Draw the paint
     */
    const drawPaint = function () {
      // Draw the paint
      paint.forEach((dot, i) => {
        p.fill(colorMap[dot[2]][dot[3]])
        p.stroke(colorMap[dot[2]][dot[3]])
        p.strokeWeight(dot[4])
    
        // Draw line
        if (i > 0) {
          p.line(paint[i-1][0], paint[i-1][1], paint[i][0], paint[i][1])
        } else {
          p.circle(dot[0], dot[1], dot[4])
        }
      })      
    }
  }, this)
})