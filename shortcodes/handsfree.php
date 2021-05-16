<?php
/**
 * [handsfree plugin=""]
 * 
 * Displays a Handsfree button
 */
add_shortcode('handsfree-button', function ($atts) {
  wp_enqueue_script('confetti', 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js', [], null, true);
  
  $atts = shortcode_atts([
    'start' => 'Enable Hand Tracking ✨👌',
    'loading' => 'Loading...',
    'stop' => 'Stop Hand Tracking'
  ], $atts);
  
  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left">
      <button class="w-btn us-btn-style_1 handsfree-show-when-stopped confetti-on-click" onclick="handsfree.start()">
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