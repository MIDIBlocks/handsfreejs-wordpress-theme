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