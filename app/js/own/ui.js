jQuery(document).ready(function($) {
    "use strict";

    var $slider = $('.slider'),
        $vatermark = $('.v-watermark');

    $slider.slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        min: 0,
        value: 30,
        slide: function(event, ui) {
            console.log($slider.slider('value'));
            var sliderValue = $slider.slider('value');
            $vatermark.css('opacity', sliderValue / 100);
        }
    });





  });
