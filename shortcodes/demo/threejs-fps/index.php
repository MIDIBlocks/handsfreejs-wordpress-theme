<?php

/**
 * [demo-threejs-fps]
 */
add_shortcode('demo-threejs-fps', function () {
  wp_enqueue_script('demo-aframe-look-around', get_stylesheet_directory_uri() . '/shortcodes/demo/threejs-fps/handsfree.js', ['global'], null, true);

  ob_start(); ?>
    <iframe class="demo-threejs-fps" src="<?= get_stylesheet_directory_uri() ?>/shortcodes/demo/threejs-fps/demo.php" style="width: 100%; height: 400px"></iframe>
  <?php return ob_get_clean();
});