<?php
/**
 * Displays the author of the bookmark
 */
add_shortcode('site-bookmark-last-update', function () {
  global $post;
  return get_the_modified_date();
});

/**
 * Lists links to visit
 */
add_shortcode('site-visit-links', function () {
  global $post;

  $links = get_field('site_links_to_try');
  
  ob_start(); ?>

    <ul class="site-visit-links">
      <?php foreach ($links as $link): ?>
        <li>
          <a href="<?= $link['site_link'] ?>" target="_blank"><?= $link['site_link'] ?></a>
        </li>
      <?php endforeach ?>
    </ul>
    
  <?php return ob_get_clean();
});

/**
 * Displays a video from a site
 */
add_shortcode('site-card-media', function ($atts) {
  global $post;

  $atts = shortcode_atts([
    'autoplay' => false
  ], $atts);

  $links = get_field('site_links_to_try');
  $html = '<p><strong>No media found</strong></p>';
  $autoplayAndControls = $atts['autoplay'] ? 'autoplay' : 'controls';

  if (count($links) && $links[0]['site_link_video']):
    ob_start(); ?>
      <video src="<?= $links[0]['site_link_video']['url'] ?>" muted loop <?= $autoplayAndControls ?>></video>
    <?php $html = ob_get_clean();
  endif;

  return $html;
});