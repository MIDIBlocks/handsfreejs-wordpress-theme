<?php
/**
 * [demo-p5-handtracking-draw]
 * 
 * Loads a p5.js sketch that lets you paint with your fingertips
 * @see https://editor.p5js.org/pixelfelt/sketches/oS5CwSbM1
 */
add_shortcode('demo-p5-handtracking-draw', function () {
  wp_enqueue_script('p5', 'https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js', [], null, true);
  wp_enqueue_script('demo-p5-handtracking-draw', get_stylesheet_directory_uri() . '/js/demo/p5-handtracking-draw.js', ['p5'], null, true);

  ob_start(); ?>
    <div class="demo-p5-handtracking-draw"></div>
  <?php return ob_get_clean();
});