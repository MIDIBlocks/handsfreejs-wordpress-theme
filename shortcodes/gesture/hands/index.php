<?php
/**
 * [gesture-mapper-hands-record]
 * 
 * Adds a record button along, and displays recorded frames
 */
add_shortcode('gesture-mapper-hands-record', function () {
  wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.6.12', [], null, true);
  wp_enqueue_script('mediapipe-hands', 'https://unpkg.com/handsfree@8.4.4/build/lib/assets/@mediapipe/hands/hands.js', ['vue'], null, true);
  wp_enqueue_script('mediapipe-drawing-utils', 'https://unpkg.com/handsfree@8.4.4/build/lib/assets/@mediapipe/drawing_utils.js', ['vue'], null, true);
  wp_enqueue_script('gesture-mapper-hands', get_stylesheet_directory_uri() . '/shortcodes/gesture/hands/index.js', ['mediapipe-hands'], null, true);
  wp_enqueue_style('gesture-mapper-hands', get_stylesheet_directory_uri() . '/shortcodes/gesture/hands/index.css');
  
  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left ">
      <button ref="recordLandmarks" class="w-btn active us-btn-style_1 handsfree-hide-when-loading full-width" @click="startRecordingShapes">Record landmarks</button>
      <button disabled class="w-btn active us-btn-style_1 handsfree-show-when-loading"><Fa-Spinner spin /> Loading...</button>
    </div>

    <div id="recordingCanvasContainer" class="row align-top"></div>

    <div class="row align-top">
      <div class="col-6">
        <div>
          <div><strong>Confidence:</strong> <span v-html="currentGesture.confidence"></span></div>
        </div>
      </div>
      <div class="col-6">
        <div>
          <button @click="reset" class="full-width">Start a new gesture</button>
        </div>
      </div>
    </div>
  <?php return ob_get_clean();
});

/**
 * Display finger pose
 * [gesture-mapper-hands-finger-pose]
 */
add_shortcode('gesture-mapper-hands-finger-pose', function () {
  ob_start() ?>
    <!-- @fixme use textarea -->
    <ul id="currentShapeBox" class="mt-0 mb-0 tree-view" style="min-height: 220px;">
      <li>Thumb | No Curl | </li>
      <li>Index | No Curl | </li>
      <li>Middle | No Curl | </li>
      <li>Ring | No Curl | </li>
      <li>Pinky | No Curl | </li>
      <li>------</li>
    </ul>
  <?php return ob_get_clean();
});

/**
 * [gesture-mapper=hands-description]
 * Displays a textarea containing the fingerpose.js gesture description
 */
add_shortcode('gesture-mapper-hands-description', function () {
  ob_start(); ?>
    <textarea readonly style="width: 100%" rows=20 :value="gesture | prettyPrintJSON"></textarea>
  <?php return ob_get_clean();
});

/**
 * [gesture-mapper-hands-settings]
 */
add_shortcode('gesture-mapper-hands-settings', function () {
  ob_start(); ?>
    <div class="field-row-stacked">
      <label for="input-gesture-name"><strong>Gesture Name (no spaces):</strong></label>
      <input id="input-gesture-name" type="text" v-model="gesture.name" @input="onGestureNameUpdate" />
    </div>
    <br>
    <fieldset>
      <legend>Emphasize Fingers</legend>
      <div class="field-row">
        <input id="finger-weight-thumb" type="checkbox" name="radio-number-hands" v-model="fingerWeights.Thumb" @change="generateGestureDescription">
        <label for="finger-weight-thumb">Thumb</label>
      </div>
      <div class="field-row">
        <input id="finger-weight-index" type="checkbox" name="radio-number-hands" v-model="fingerWeights.Index" @change="generateGestureDescription">
        <label for="finger-weight-index">Index</label>
      </div>
      <div class="field-row">
        <input id="finger-weight-middle" type="checkbox" name="radio-number-hands" v-model="fingerWeights.Middle" @change="generateGestureDescription">
        <label for="finger-weight-middle">Middle</label>
      </div>
      <div class="field-row">
        <input id="finger-weight-ring" type="checkbox" name="radio-number-hands" v-model="fingerWeights.Ring" @change="generateGestureDescription">
        <label for="finger-weight-ring">Ring</label>
      </div>
      <div class="field-row">
        <input id="finger-weight-pinky" type="checkbox" name="radio-number-hands" v-model="fingerWeights.Pinky" @change="generateGestureDescription">
        <label for="finger-weight-pinky">Pinky</label>
      </div>
    </fieldset>
    <br>
    <fieldset>
      <legend>Confidence: <span v-html="gesture.confidence"></span></legend>
      <div class="field-row">
        <label for="range-confidence">0</label>
        <input id="range-confidence" type="range" step="0.25" min="0" max="10" value="7.5" @change="generateGestureDescription" v-model="gesture.confidence" />
        <label for="range-confidence">10</label>
      </div>
    </fieldset>
    <br>
    <fieldset>
      <legend>Mirroring</legend>
      <div class="field-row">
        <input id="mirror-horiz" type="checkbox" @change="generateGestureDescription" v-model="mirror.horiz" />
        <label for="mirror-horiz">Mirror horizontally</label>
      </div>
      <div class="field-row">
        <input id="mirror-vert" type="checkbox" @change="generateGestureDescription" v-model="mirror.vert" />
        <label for="mirror-vert">Mirror vertically</label>
      </div>
    </fieldset>
  <?php return ob_get_clean();
});