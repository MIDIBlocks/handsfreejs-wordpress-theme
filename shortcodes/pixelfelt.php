<?php
/**
 * Displays a draggable/useable bookmarklet as a button
 */
add_shortcode('pixelfelt-bookmarklet', function () {
  global $post;
  $js = file_get_contents(get_stylesheet_directory() . '/js/bookmarklet-loader.js');

  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left">
      <a class="w-btn us-btn-style_1 handsfree-show-when-stopped" href="javascript:<?= esc_attr($js) ?>">
        <span class="w-btn-label">Pixelfelt 🖐👀🖐</span>
      </a>
      <a class="w-btn us-btn-style_1 handsfree-show-when-loading" href="javascript:<?= esc_attr($js) ?>">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="w-btn-label">Loading</span>
      </a>
      <a class="w-btn us-btn-style_1 active handsfree-show-when-started">
        <span class="w-btn-label">Stop Pixelfelt</span>
      </a>
    </div>
  <?php return ob_get_clean();
});