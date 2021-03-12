<?php
/* Custom functions code goes here. */

include get_stylesheet_directory() . '/cpt/plugin.php';
include get_stylesheet_directory() . '/shortcodes/global.php';


/**
 * Admin styles
 */
add_action('admin_enqueue_scripts', function ($hook) {
  wp_enqueue_style('admin_styles', get_stylesheet_directory_uri() . '/style-admin.css');
});