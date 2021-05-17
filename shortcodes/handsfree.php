<?php
/**
 * [handsfree plugin=""]
 * 
 * Displays a Handsfree button
 */
add_shortcode('handsfree-button', function ($atts) {
  wp_enqueue_script('confetti', get_stylesheet_directory_uri() . '/lib/confetti.js', [], null, true);
  
  $atts = shortcode_atts([
    'start' => 'Enable Hand Tracking ✨👌',
    'loading' => 'Loading...',
    'stop' => 'Stop Hand Tracking',
    'update' => '',
    'class' => ''
  ], $atts);
  
  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left <?= $atts['class'] ?>">
      <button class="w-btn us-btn-style_1 handsfree-show-when-stopped confetti-on-click" data-update="<?= htmlspecialchars($atts['update']) ?>" onclick="handsfree.update(jsonlite.parse(this.getAttribute('data-update'))); handsfree.start()">
        <span class="w-btn-label"><?= $atts['start'] ?></span>
      </button>
      <button class="w-btn us-btn-style_1 handsfree-show-when-loading">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="w-btn-label"><?= $atts['loading'] ?></span>
      </button>
      <button class="w-btn active us-btn-style_1 handsfree-show-when-started handsfree-hide-when-loading" onclick="handsfree.stop()">
        <span class="w-btn-label"><?= $atts['stop'] ?></span>
      </button>
    </div>
  <?php return ob_get_clean();
});