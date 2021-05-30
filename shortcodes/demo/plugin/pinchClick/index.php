<?php
/**
 * [demo-pinchClick]
 * - Displays a few form fields for clicking with
 */
add_shortcode('demo-pinchClick', function () {
  wp_enqueue_script('demo-pinchClick', get_stylesheet_directory_uri() . '/shortcodes/demo/plugin/pinchClick/pinchClick.js', ['global'], null, true);

  ob_start(); ?>
    <section>
      <p>
        <label>Buttons:</label> 
        <button class="w-btn us-btn-style_2 confetti-on-click">
          <span class="w-btn-label">Click me with a pinch ✨👌</span>
        </button>
      </p>
      <p>
        <label>Checkboxes:</label> <input type="checkbox" class="big">  <input type="checkbox" class="big">  <input type="checkbox" class="big">  <input type="checkbox" class="big">
      </p>
      <p>
        <label>Radios:</label> <input type="radio" name="pinchClick-demo-radio" class="big">  <input type="radio" name="pinchClick-demo-radio" class="big">  <input type="radio" name="pinchClick-demo-radio" class="big">  <input type="radio" name="pinchClick-demo-radio" class="big">
      </p>
      <p>
        <label>Focus:</label> <input type="text" class="inline"> <input type="text" class="inline"> <input type="text" class="inline"> <input type="text" class="inline">
      </p>
    </section>
    <br>
  <?php return ob_get_clean();
});