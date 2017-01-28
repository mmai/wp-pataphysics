# Pataphysics - a Wordpress plugin

Enable a shortcode which displays dates according to the Pataphysical Calendar

`[pataphysics-date]` : display the current day with the default format `%D %d %M %y`

`[pataphysics-date date="2017-01-28"]` : convert a grégorian calendar date to the Pataphysical calendar. 

`[pataphysics-date format="%D %d %M %y - %S (%I)"]` : display the date with a given format, with the following syntax : 

 * %d : day (ex: 23)
 * %m : month (ex: 5)
 * %y : year (ex: 44)
 * %D : day name (ex: 'Vendredi')
 * %M : month name (ex: 'Gueules')
 * %S : day saint (ex: 'Ste Tabagie, cosmogène')
 * %I : day importance (ex: 'fête suprême quarte')
