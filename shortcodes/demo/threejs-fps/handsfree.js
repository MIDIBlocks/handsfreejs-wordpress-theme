// Configure Handsfree.js
handsfree = new Handsfree({
  weboji: true,
  showDebug: true
})
handsfree.on('data', function () {
  handsfree.model.hands.enable() 
  console.log('loading hands')
}, {once: true})

// This will hold our tween values
tween = {yaw: 0, pitch: 0, roll: 0}

/**
 * Move, Turn, Jump
 */
handsfree.use('moveTurnJump', ({weboji}) => {
  if (!weboji) return
  
  // Jump
  if (weboji.morphs[4] > .3 && weboji.morphs[5] > .3) {
    document.body.dispatchEvent(new KeyboardEvent("keydown", {
      bubbles : true,
      cancelable : true,
      code: 'Space',
      keyCode : 32
    }))
  } else {
    document.body.dispatchEvent(new KeyboardEvent("keyup", {
      bubbles : true,
      cancelable : true,
      code: 'Space',
      keyCode : 32
    }))    
  }
  
  // Rotation
  window.handsfree.TweenMax.to(tween, 1, {
    pitch: -weboji.rotation[0] * 3,
    yaw: -weboji.rotation[1] * 6,
    roll: weboji.rotation[2] * 3
  })
  camera.rotation.x = tween.pitch
  camera.rotation.y = tween.yaw
  camera.rotation.z = tween.roll

  // Move Forward
  console.log(weboji.translation[2])
  if (weboji.translation[2] > .26) {
    document.body.dispatchEvent(new KeyboardEvent("keydown", {
      bubbles : true,
      cancelable : true,
      code: 'KeyW',
      keyCode : 87
    }))
  } else {
    document.body.dispatchEvent(new KeyboardEvent("keyup", {
      bubbles : true,
      cancelable : true,
      code: 'KeyW',
      keyCode : 87
    }))    
  }

  // Move Backward
  if (weboji.translation[2] < .20) {
    document.body.dispatchEvent(new KeyboardEvent("keydown", {
      bubbles : true,
      cancelable : true,
      code: 'KeyS',
      keyCode : 83
    }))    
  } else {
    document.body.dispatchEvent(new KeyboardEvent("keyup", {
      bubbles : true,
      cancelable : true,
      code: 'KeyS',
      keyCode : 83
    }))    
  }
})

/**
 * Shoot
 */
let framesSinceLastPew = 0
handsfree.use('shoot', ({hands}) => {
  if (!hands?.gesture) return
  
  if (framesSinceLastPew > 15 && (hands.gesture[0]?.name === 'pew' || hands.gesture[1]?.name === 'pew')) {
    document.body.click()
    framesSinceLastPew = 0
  } else {
    framesSinceLastPew += 1
  }
})


/**
 * Gestures
 */
handsfree.useGesture({
  "name": "pew",
  "algorithm": "fingerpose",
  "models": "hands",
  "confidence": 7.5,
  "description": [
    [
      "addCurl",
      "Thumb",
      "HalfCurl",
      1
    ],
    [
      "addCurl",
      "Thumb",
      "NoCurl",
      0.30434782608695654
    ],
    [
      "addDirection",
      "Thumb",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "DiagonalUpLeft",
      0.034482758620689655
    ],
    [
      "addCurl",
      "Index",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Index",
      "HorizontalLeft",
      1
    ],
    [
      "addCurl",
      "Middle",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Middle",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Middle",
      "DiagonalUpLeft",
      0.07142857142857142
    ],
    [
      "addCurl",
      "Ring",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Ring",
      "HorizontalLeft",
      1
    ],
    [
      "addCurl",
      "Pinky",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "DiagonalUpRight",
      0.034482758620689655
    ],
    [
      "addDirection",
      "Index",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Middle",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Middle",
      "DiagonalUpRight",
      0.07142857142857142
    ],
    [
      "addDirection",
      "Ring",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "HorizontalRight",
      1
    ],
    [
      "setWeight",
      "Thumb",
      2
    ],
    [
      "setWeight",
      "Index",
      2
    ]
  ],
  "enabled": true
})

handsfree.useGesture({
  "name": "notPew",
  "algorithm": "fingerpose",
  "models": "hands",
  "confidence": 7.5,
  "description": [
    [
      "addCurl",
      "Thumb",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "DiagonalUpLeft",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "VerticalUp",
      0.20833333333333334
    ],
    [
      "addCurl",
      "Index",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Index",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Index",
      "DiagonalUpLeft",
      0.03571428571428571
    ],
    [
      "addCurl",
      "Middle",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Middle",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Middle",
      "DiagonalUpLeft",
      0.03571428571428571
    ],
    [
      "addCurl",
      "Ring",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Ring",
      "HorizontalLeft",
      1
    ],
    [
      "addCurl",
      "Pinky",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "HorizontalLeft",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "DiagonalUpRight",
      1
    ],
    [
      "addDirection",
      "Index",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Index",
      "DiagonalUpRight",
      0.03571428571428571
    ],
    [
      "addDirection",
      "Middle",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Middle",
      "DiagonalUpRight",
      0.03571428571428571
    ],
    [
      "addDirection",
      "Ring",
      "HorizontalRight",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "HorizontalRight",
      1
    ],
    [
      "setWeight",
      "Thumb",
      2
    ],
    [
      "setWeight",
      "Index",
      2
    ]
  ],
  "enabled": true
})