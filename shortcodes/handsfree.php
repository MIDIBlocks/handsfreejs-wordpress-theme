<?php
/**
 * [handsfree plugin=""]
 * 
 * Displays a Handsfree button
 */
add_shortcode('handsfree-button', function ($atts) {
  $atts = shortcode_atts([
    'start' => 'Enable Hand Tracking ✨👌',
    'loading' => 'Loading...',
    'stop' => 'Stop Hand Tracking'
  ], $atts);
  
  ob_start(); ?>
    <div class="w-btn-wrapper width_auto align_left">
      <?php # start ?>
      <span class="handsfree-show-when-stopped handsfree-hide-when-loading" onclick="handsfree.start()">
        <a class="w-btn us-btn-style_1">
          <span class="w-btn-label"><?= $atts['start'] ?></span>
        </a>
      </span>
      <?php # loading ?>
      <span class="handsfree-show-when-loading">
        <a class="w-btn us-btn-style_1">
          <i class="fas fa-circle-notch fa-spin"></i>
          <span class="w-btn-label"><?= $atts['loading'] ?></span>
        </a>
      </span>
      <?php # stop ?>
      <span class="handsfree-show-when-started handsfree-hide-when-loading">
        <a class="w-btn active us-btn-style_1" onclick="handsfree.stop()">
          <span class="w-btn-label"><?= $atts['stop'] ?></span>
        </a>
      </span>
    </div>
  <?php return ob_get_clean();
});