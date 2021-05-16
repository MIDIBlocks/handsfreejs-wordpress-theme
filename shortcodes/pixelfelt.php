<?php
/**
 * Displays a draggable/useable bookmarklet as a button
 */
add_shortcode('pixelfelt-bookmarklet', function ($atts) {
  global $post;
  $js = file_get_contents(get_stylesheet_directory() . '/js/bookmarklet-loader.js');
  wp_enqueue_script('confetti', 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js', [], null, true);

  $atts = shortcode_atts([
    'start' => 'Pixelfelt Bookmarklet 💻',
    'loading' => 'Loading...',
    'stop' => 'Stop Pixelfelt'
  ], $atts);

  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left">
      <a class="w-btn us-btn-style_1 handsfree-show-when-stopped confetti-on-click" href="javascript:<?= esc_attr($js) ?>">
        <span class="w-btn-label"><?= $atts['start'] ?></span>
      </a>
      <a class="w-btn us-btn-style_1 handsfree-show-when-loading" href="javascript:<?= esc_attr($js) ?>">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="w-btn-label"><?= $atts['loading'] ?></span>
      </a>
      <a class="w-btn us-btn-style_1 active handsfree-show-when-started">
        <span class="w-btn-label"><?= $atts['stop'] ?></span>
      </a>
    </div>
  <?php return ob_get_clean();
});