<?php
/**
 * @package pataphysics
 * @version 1.0
 */
/*
Author: Henri Bourcereau
Version: 1.0
*/

/*
 * %d : day (ex: 23)
 * %m : month (ex: 5)
 * %y : year (ex: 44)
 * %D : day name (ex: 'Vendredi')
 * %M : month name (ex: 'Gueules')
 * %S : day saint (ex: 'Ste Tabagie, cosmogène')
 * %I : day importance (ex: 'fête suprême quarte')
 * [pataphysics_date] current day
 * [pataphysics_date format="%D %d %M %y - %S (%I)"]
 * [pataphysics_date date="2017-01-28"]
 */
global $pataphysicsDateNo;
$pataphysicsDateNo = 0;

function pataphysicsDateShortcode( $attributes ) {
    global $pataphysicsDateNo;
    $pataphysicsDateNo += 1;

    wp_enqueue_script( 'PataphysicalDate' );

    extract( shortcode_atts([
        "date" => '',
        "format" => '',
    ], $attributes, 'pataphysics-date' ) );

    $date = !empty($date) ? "'".$date."'": '';



    $script = "<span id='pataphysicsDate$pataphysicsDateNo'></span><script>
        function showPataDate$pataphysicsDateNo(){

        var pnow = new PataphysicalDate($date);";
    if (empty($format)){
        $script .= "var output = pnow.toString();";
    } else {
        $script .= " 
            var day = pnow.getDay();
        var month = pnow.getMonth();
        var year = pnow.getFullYear();
        var dayname = pnow.getDayName();
        var monthname = pnow.getMonthName();
        var saint = pnow.getSaintOfDay();
        var importance = pnow.getDayImportance();

        var output = '".addslashes($format)."';
        output = output.replace('%d', day);
        output = output.replace('%m', month);
        output = output.replace('%y', year);
        output = output.replace('%D', dayname);
        output = output.replace('%M', monthname);
        output = output.replace('%S', saint);
        output = output.replace('%I', importance);
    ";
    }
$script .= "
document.getElementById('pataphysicsDate$pataphysicsDateNo').innerHTML = output;
}

window.addEventListener('load', showPataDate$pataphysicsDateNo, false);
         </script>";
    return $script;
}

add_shortcode('pataphysics-date', 'pataphysicsDateShortcode');


?>
