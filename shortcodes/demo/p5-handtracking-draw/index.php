<?php
/**
 * [demo-p5-handtracking-draw]
 * 
 * Loads a p5.js sketch that lets you paint with your fingertips
 * @see https://editor.p5js.org/pixelfelt/sketches/oS5CwSbM1
 */
add_shortcode('demo-p5-handtracking-draw', function () {
  wp_enqueue_script('p5', get_stylesheet_directory_uri() . '/lib/p5.js', [], null, true);
  wp_enqueue_script('demo-p5-handtracking-draw', get_stylesheet_directory_uri() . '/shortcodes/demo/p5-handtracking-draw/index.js', ['p5'], null, true);

  ob_start(); ?>
    <div class="demo-p5-handtracking-draw handsfree-dont-scroll"></div>
    <p class="clear-demo-p5-handtracking-draw-wrap"><button class="w-btn us-btn-style_2">Clear</button></p>
  <?php return ob_get_clean();
});