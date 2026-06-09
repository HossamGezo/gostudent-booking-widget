<?php
/**
 * Plugin Name: GoStudent Interactive Booking Widget
 * Plugin URI:  https://github.com/HossamGezo/gostudent-booking-widget
 * Description: A high-performance, dynamic checkout and registration form cloned from GoStudent, built with React, TypeScript, and Tailwind CSS. Features advanced validation, multi-currency support, and full RTL translation.
 * Version:     1.0.0
 * Author:      Hossam Gouda
 * Author URI:  https://github.com/HossamGezo
 * License:     MIT
 * Text Domain: gostudent-booking-widget
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; 
}

function gostudent_booking_render_widget() {
    
    wp_enqueue_style(
        'gostudent-booking-style',
        plugin_dir_url( __FILE__ ) . 'dist/assets/index.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'gostudent-booking-script',
        plugin_dir_url( __FILE__ ) . 'dist/assets/index.js',
        array(),
        '1.0.0',
        true
    );

    return '<div id="root"></div>';
}

add_shortcode( 'gostudent_booking', 'gostudent_booking_render_widget' );