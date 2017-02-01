<?php
/**
 * @package pataphysics
 * @version 1.1
 */
/*
Plugin Name: Pataphysics
Author: Henri Bourcereau
Version: 1.1
*/
define( 'PATAPHYSICS__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
require_once( PATAPHYSICS__PLUGIN_DIR . 'pataphysics-shortcodes.php' );
require_once( PATAPHYSICS__PLUGIN_DIR . 'widget-date.php' );

add_action( 'wp_enqueue_scripts', 'pataphysics_wp_enqueue_scripts' );
function pataphysics_wp_enqueue_scripts() {
    wp_register_script( 'PataphysicalDate', plugins_url( '/js/PataphysicalDate.min.js', __FILE__ ), array(), '1.0.0', all );
}

add_action('plugins_loaded', 'wan_load_textdomain');
function wan_load_textdomain() {
	load_plugin_textdomain( 'pataphysics', false, dirname( plugin_basename(__FILE__) ) . '/lang/' );
}
?>
