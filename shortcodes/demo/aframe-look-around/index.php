<?php
/**
 * [demo-aframe-look-around]
 */
add_shortcode('demo-aframe-look-around', function () {
  wp_enqueue_script('demo-aframe-look-around', get_stylesheet_directory_uri() . '/shortcodes/demo/aframe-look-around/demo.js', ['global'], null, true);

  ob_start(); ?>
    <iframe class="demo-aframe-look-around" src="<?= get_stylesheet_directory_uri() ?>/shortcodes/demo/aframe-look-around/demo.php" style="width: 100%; height: 400px"></iframe>
  <?php return ob_get_clean();
});