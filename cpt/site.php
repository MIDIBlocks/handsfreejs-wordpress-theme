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
add_shortcode('site-visit-links', function ($atts) {
  global $post;

  $atts = shortcode_atts([
    'description' => false
  ], $atts);

  $links = get_field('site_links_to_try');
  
  ob_start(); ?>

    <?php if ($links): ?>
      <ul class="site-visit-links">
        <?php foreach ($links as $link): ?>
          <li>
            <a href="<?= $link['site_link'] ?>" target="_blank"><?= $link['site_link'] ?></a>
            <?php if ($atts['description'])  echo '<div class="site-link-description">' . $link['site_link_description'] . '</div>'; ?>
          </li>
        <?php endforeach ?>
      </ul>
    <?php endif ?>
    
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

/**
 * Displays a random link from the site
 */
add_shortcode('site-link', function () {
  global $post;

  $links = get_field('site_links_to_try');
  $html = '<p><strong>No links found</strong></p>';

  if (count($links) && $links[0]['site_link']):
    ob_start(); ?>
      <div><strong>Site link</strong>: <a href="<?= $links[0]['site_link'] ?>"><?= $links[0]['site_link_label'] ?></a>
    <?php $html = ob_get_clean();
  endif;

  return $html;
});

/**
 * Displays a random link with site description
 */
add_shortcode('site-link-description', function () {
  global $post;

  $links = get_field('site_links_to_try');
  $html = '';

  if (count($links) && $links[0]['site_link_description']):
    ob_start(); ?>
      <div><?= $links[0]['site_link_description'] ?></div>
    <?php $html = ob_get_clean();
  endif;

  return do_shortcode($html);
});