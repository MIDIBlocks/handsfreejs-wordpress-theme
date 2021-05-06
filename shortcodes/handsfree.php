<?php
/**
 * [handsfree plugin=""]
 * 
 * Displays a Handsfree button
 */
add_shortcode('handsfree-button', function ($atts) {
  $atts = shortcode_atts([
    'start' => 'Try this demo',
    'loading' => 'Loading...',
    'stop' => 'Stop this demo'
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
          <span class="w-btn-label"><?= $atts['loading'] ?></span>
        </a>
      </span>
      <?php # stop ?>
      <span class="handsfree-show-when-started handsfree-hide-when-loading">
        <a class="w-btn us-btn-style_1" onclick="handsfree.stop()">
          <span class="w-btn-label"><?= $atts['stop'] ?></span>
        </a>
      </span>
    </div>
  <?php return ob_get_clean();
});