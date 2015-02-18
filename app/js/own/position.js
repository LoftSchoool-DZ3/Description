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

            this.$cells = $('.cell');

            this.$leftTop = $('.left-top');
            this.$centerTop = $('.center-top');
            this.$rightTop = $('.right-top');

            this.$leftCenter = $('.left-center');
            this.$centerCenter = $('.center-center');
            this.$rightCenter = $('.right-center');

            this.$leftBottom = $('.left-bottom');
            this.$centerBottom = $('.center-bottom');
            this.$rightBottom = $('.right-bottom');

            this.setUpEventListeners();
            this.drag();
            this.inputPositioningSetup();

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

            // position cells
            this.$centerTop.on('click', function() {
                app.setPosition(217, 0, $(this))
            });

            this.$leftTop.on('click', function() {
                //app.setPosition(0, 0, $(this));
                app.$watermark.css({
                    left:0,
                    top:0
                })
            });


            this.$rightTop.on('click', function() {
                //app.setPosition(434, 0, $(this));
                app.$watermark.css({
                    left: 'auto',
                    right:0,
                    top:0,
                    bottom: 'auto'
                });
            });

            this.$centerCenter.on('click', function() {
                //app.setPosition(217, 178, $(this));
            });

            this.$leftCenter.on('click', function() {
                app.setPosition(0, 178, $(this))
            });

            this.$rightCenter.on('click', function() {
                app.setPosition(434, 178, $(this))
            });

            this.$centerBottom.on('click', function() {
                app.setPosition(217, 309, $(this))
            });

            this.$leftBottom.on('click', function() {
                app.setPosition(0, 309, $(this))
            });

            this.$rightBottom.on('click', function() {
                app.setPosition(434, 309, $(this))
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
        },
        setActiveCell: function($this) {
            this.$cells.closest('.map').find('.cell').removeClass('active');
            $this.addClass('active');
        },
        setPosition: function(left, top, $this) {

            app.$watermark.css({
                top: top,
                left: left
            });

            app.$xInput.val(left)
            app.$yInput.val(top);

            app.setActiveCell($this);

        },
        drag: function() {

            this.$watermark.draggable({
                containment: "parent",
                cursor: "move",
                drag: function (event, ui) {
                    var top = ui.position.top,
                        left = ui.position.left;

                    app.$xInput.val(left);
                    app.$yInput.val(top);
                }
            });

        },
        inputPositioningSetup: function() {

            this.$xInput.on('keyup', function() {
                var $this = $(this);

                app.$watermark.css('left', $this.val() + 'px');

            });
            
            this.$yInput.on('keyup', function() {
                var $this = $(this);

                app.$watermark.css('top', $this.val() + 'px');

            });
        }


    };

    app.initialize();
});