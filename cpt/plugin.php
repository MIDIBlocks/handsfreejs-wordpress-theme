<?php

/**
 * [pluginImage]
 * 
 * Create an <img> using the `thumbnail` custom field
 */
add_shortcode('pluginImage', function () {
  global $post;

  $src = get_field('thumbnail', $post->ID);
  $permalink = get_permalink();

  $html = "<a href='$permalink'><img src='$src' alt='$alt'></a>";
  
  return $html;
});

/**
 * [pluginCode]
 * 
 * Displays the code with syntax highlighting
 */
add_shortcode('pluginCode', function () {
  global $post;

  $code = get_field('code', $post->ID);
	
  return do_shortcode('[js]' . $code);
});