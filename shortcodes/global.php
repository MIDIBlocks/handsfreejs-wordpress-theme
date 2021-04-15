<?php
/**
 * [title]
 * 
 * Displays the post title
 */
add_shortcode('title', function ($atts) {
  global $post;
  return $post->post_title;
});

/**
 * [author-meta]
 * 
 * Displays the posts author, name, socials, and more
 */
add_shortcode('author-meta', function () {
  global $post;

  ob_start(); ?>
    <div class="author-meta">
      <?= get_avatar(get_the_author_meta('ID'), 128) ?>
      <div class="author-meta-details">
        <h3><?= get_the_author_meta('display_name') ?></h3>
      </div>
      <p><?= get_the_author_meta('description') ?></p>
    </div>
  <?php return ob_get_clean();
});