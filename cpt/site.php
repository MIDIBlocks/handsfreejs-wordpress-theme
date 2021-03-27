<?php

/**
 * Displays the author of the bookmark
 */
add_shortcode('site-bookmark-last-update', function () {
  global $post;
  return get_the_modified_date();
});