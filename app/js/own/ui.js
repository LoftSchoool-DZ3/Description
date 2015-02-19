jQuery(document).ready(function($) {
    "use strict";

    var $slider = $('.slider'),
        $watermark = $('.v-watermark'),
        $opacityInput = $('#opacity');

    $watermark.css('opacity', .3);

    $slider.slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        min: 0,
        value: 30,
        slide: function(event, ui) {
            var sliderValue = $slider.slider('value');
            $watermark.css('opacity', sliderValue / 100);
            $opacityInput.val(sliderValue);
        }
    });



  });
