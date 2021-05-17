<?php
/* Custom functions code goes here. */
include get_stylesheet_directory() . '/cpt/handsfreejs-example.php';
include get_stylesheet_directory() . '/cpt/plugin.php';
include get_stylesheet_directory() . '/cpt/site.php';
include get_stylesheet_directory() . '/shortcodes/global.php';
include get_stylesheet_directory() . '/shortcodes/handsfree.php';
include get_stylesheet_directory() . '/shortcodes/pixelfelt.php';
include get_stylesheet_directory() . '/shortcodes/demo/pinchers.php';
include get_stylesheet_directory() . '/shortcodes/demo/p5-handtracking-draw.php';
include get_stylesheet_directory() . '/shortcodes/demo/aframe-look-around/index.php';

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
  wp_enqueue_script('jsonlite', get_stylesheet_directory_uri() . '/js/jsonlite.js', [], null, true);
  wp_enqueue_script('handsfree', 'https://unpkg.com/handsfree@8.4.3/build/lib/handsfree.js', [], null, true);
  wp_enqueue_style('handsfree', 'https://unpkg.com/handsfree@8.4.3/build/lib/assets/handsfree.css');
  wp_enqueue_script('global', get_stylesheet_directory_uri() . '/js/global.js', ['jquery', 'handsfree'], null, true);
});