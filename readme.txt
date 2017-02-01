=== Pataphysics ===
Contributors: @rhumbs
Tags: shortcode, widget
Requires at least: 2.5
Tested up to: 4.7
Stable tag: master

Enable a shortcode which displays dates according to the Pataphysical Calendar

== Description ==

Enable a widget and a shortcode to display dates according to the Pataphysical Calendar

You can customize the way the date is displayed by specifying a format with these elements : 

 * %d : day (ex: 23)
 * %m : month (ex: 5)
 * %y : year (ex: 44)
 * %D : day name (ex: 'Vendredi')
 * %M : month name (ex: 'Gueules')
 * %S : day saint (ex: 'Ste Tabagie, cosmogène')
 * %I : day importance (ex: 'fête suprême quarte')

Shortcode syntax : 
`[pataphysics-date]` : display the current day with the default format `%D %d %M %y`

`[pataphysics-date date="2017-01-28"]` : convert a grégorian calendar date to the Pataphysical calendar. 

`[pataphysics-date format="%D %d %M %y - %S (%I)"]` : display the date with a given format

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/pataphysics` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Changelog ==

= 1.1 =
*Release Date - 29 January 2017*

* Add a Pataphysical date widget

= 1.0 =
*Release Date - 28 January 2017*

* Initial release : pataphysical date shortcode
