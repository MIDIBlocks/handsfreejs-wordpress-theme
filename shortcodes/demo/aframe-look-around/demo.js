(function () {
  $('.demo-aframe-look-around').each(function () {
    let $rig
    let tween = {
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
      pitch: 0,
      roll: 0
    }
  
    /**
     * Listen to the aframe initialize event
     */
    window.addEventListener('message', (ev) => {
      if (ev.data === 'aframeReady') {
        $rig = this.contentDocument.querySelector('#rig')
      }
    })
    
    // Create the plugin
    handsfree.use('demoAframeLookaround', ({weboji}) => {
      if (!weboji.isDetected) return
  
      // Calculate rotation
      const rot = weboji.degree
      rot[0] -= 15
      
      // Calculate position
      const pos = {
        x: (weboji.translation[0] - .5) * 10,
        y: (weboji.translation[1] - .5) * 5,
        z: 5 - weboji.translation[2] * 30
      }
  
      // Tween this values
      window.handsfree.TweenMax.to(tween, 1, {
        yaw: -rot[0] * 1.5,
        pitch: -rot[1] * 1.5,
        roll: rot[2] * 1.5,
        x: pos.x,
        y: pos.y,
        z: pos.z
      })
      
      // Use the tweened values instead of the actual current values from webcam
      $rig.setAttribute('rotation', `${tween.yaw} ${tween.pitch} ${tween.roll}`)
      $rig.setAttribute('position', `${tween.x} ${tween.y} ${tween.z}`)
    })
  })
})()