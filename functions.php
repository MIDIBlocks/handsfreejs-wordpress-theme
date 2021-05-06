<?php
/* Custom functions code goes here. */
include get_stylesheet_directory() . '/cpt/plugin.php';
include get_stylesheet_directory() . '/cpt/site.php';
include get_stylesheet_directory() . '/shortcodes/global.php';
include get_stylesheet_directory() . '/shortcodes/handsfree.php';
include get_stylesheet_directory() . '/shortcodes/pixelfelt.php';

/**
 * Admin styles
 */
add_action('admin_enqueue_scripts', function ($hook) {
  wp_enqueue_style('admin_styles', get_stylesheet_directory_uri() . '/style-admin.css');
});

/**
 * Frontend
 */
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script('global_scripts', get_stylesheet_directory_uri() . '/js/global.js', ['jquery'], null, true);
  wp_enqueue_script('handsfree', get_stylesheet_directory_uri() . '/js/handsfree/handsfree.js', [], null, true);
  wp_enqueue_style('handsfree', get_stylesheet_directory_uri() . '/js/handsfree/assets/handsfree.css');
});