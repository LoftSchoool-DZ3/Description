jQuery(document).ready(function($) {
   "use strict";

    var app = {

        initialize: function() {

            this.$incrementXbtn = $('#one-x-up');
            this.$decrementXbtn = $('#one-x-down');
            this.$incrementYbtn = $('#one-y-up');
            this.$decrementYbtn = $('#one-y-down');

            this.$xInput = $('#x-one');
            this.$yInput = $('#y-one');

            this.$watermark = $('.v-watermark');

            this.setUpEventListeners();

        },
        setUpEventListeners: function() {

            // move X
            this.$incrementXbtn.on('click', function() {
                app.moveX(true);
            });
            this.$decrementXbtn.on('click', function() {
                app.moveX(false);
            });

            // move Y
            this.$incrementYbtn.on('click', function() {
               app.moveY(true);
            });

            this.$decrementYbtn.on('click', function() {
                app.moveY(false);
            });

        },
        moveX: function(param) {
            var xPos = parseInt(app.$watermark.css('left'), 10);

            if (param) {
                xPos++;
            } else {
                xPos--;
            }

            app.$watermark.css('left', xPos+'px');
            app.$xInput.val(xPos);
        },
        moveY: function(param) {
            var yPos = parseInt(app.$watermark.css('top'), 10);

            if(param) {
                yPos++;
            } else {
                yPos--
            }

            app.$watermark.css('top', yPos+'px');
            app.$yInput.val(yPos);
        }


    };

    app.initialize();
});