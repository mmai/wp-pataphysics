<?php
class WP_Pataphysics_Date_Widget extends WP_Widget {
    private $defaultFormat = '<div>%D %d %M %y</div>
<div><em>%S</em></div>';

	// constructor
	function WP_Pataphysics_Date_Widget () {
        parent::WP_Widget(false, $name = __('Pataphysical date', 'pataphysics') );
	}

    // widget form creation
    function form($instance) {

        // Check values
        if( $instance) {
            $format = $instance['format'];
        } else {
            $format = $this->defaultFormat;
        }
?>
<p>
<label for="<?php echo $this->get_field_id('format'); ?>"><?php _e('Format:', 'pataphysics'); ?></label>
<textarea class="widefat" id="<?php echo $this->get_field_id('format'); ?>" name="<?php echo $this->get_field_name('format'); ?>"><?php echo $format; ?></textarea>
</p>
<?php
    }


	// widget update
	function update($new_instance, $old_instance) {
        $instance = $old_instance;
        // Fields
        var_dump($old_instance);
        var_dump($new_instance);
        $instance['format'] = $new_instance['format'];
        return $instance;
    }

    // widget display
    function widget($args, $instance) {
        wp_enqueue_script( 'PataphysicalDate' );
        extract( $args );
        $format = $instance['format'];
        if (empty($format)){
            $format = $this->defaultFormat;
        } 
        $format = str_replace(["\n", "\r"], "", $format);

        $widget = "<div id='pataphysicsDateWidget'></div><script>
            function showPataDateWidget(){

                var pnow = new PataphysicalDate();";
$widget .= " 
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

document.getElementById('pataphysicsDateWidget').innerHTML = output;
    }

    window.addEventListener('load', showPataDateWidget, false);
         </script>";
        echo $before_widget;
        echo $widget;
        echo $after_widget;
    }
}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("WP_Pataphysics_Date_Widget");'));
