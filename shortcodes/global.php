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
  
  $links = get_field('user_meta_links', 'user_' . get_the_author_meta('ID'));

  ob_start(); ?>
    <div class="author-meta">
      <div>
        <?= get_avatar(get_the_author_meta('ID'), 128) ?>
      </div>
      <div>
        <p><?= get_the_author_meta('description') ?></p>
        <?php if ($links): ?>
          <ul class="author-links">
            <?php foreach ($links as $link): ?>
              <li>
                <a href="<?= $link['user_meta_links_link'] ?>" target="_blank"><?= $link['user_meta_links_label'] ?></a>
              </li>
            <?php endforeach ?>      
          </ul>
        <?php endif ?>
      </div>
    </div>
  <?php return ob_get_clean();
});

/**
 * Display an authors username and link
 */
add_shortcode('author-name-link', function () {
  global $post;

  $name = get_the_author_meta('display_name');
  $link = get_author_posts_url(get_the_author_meta('ID'));
  
  return "<a href='$link'>$name</a>";
});