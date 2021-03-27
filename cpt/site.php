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
          <a href="<?= $link['site_link'] ?>"><?= $link['site_link'] ?></a>
        </li>
      <?php endforeach ?>
    </ul>
    
  <?php return ob_get_clean();
});

/**
 * Displays a bookmarklet as a button
 */
add_shortcode('site-bookmark', function () {
  global $post;

  ob_start(); ?>
    <p>
      <strong>Drag this to your bookmarks 👇</strong>
    </p>
    <div class="w-btn-wrapper width_auto align_left">
      <a class="w-btn us-btn-style_1" href="#">
        <span class="w-btn-label"><?= $post->post_title ?> 🖐👀🖐</span>
      </a>
    </div>
  <?php return ob_get_clean();
});