jQuery(document).ready(function($) {
   "use strict";

    var app = {

        initialize: function() {

            this.$incrementXbtn = $('#one-x-up');
            this.$decrementXbtn = $('#one-x-down');
            this.$incrementYbtn = $('#one-y-up');
            this.$decrementYbtn = $('#one-y-down');
            this.$resetBtn = $('#reset');

            this.$xInput = $('#x-one');
            this.$yInput = $('#y-one');

            this.$opacityValue = $('#opacity');

            this.$watermark = $('.v-watermark');
            this.$watermarkLayer = $(".v-orig-img");
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
            // reset button
            this.$resetBtn.on('click', function() {

                app.$xInput.val(0);
                app.$yInput.val(0);

                app.$watermark.css({
                    left:0,
                    top:0,
                    opacity:30
                });

                $('.map').find('.cell').removeClass('active');
                app.$leftTop.addClass('active');

                $( ".slider" ).slider( "option", "value", 30);
                app.$opacityValue.val(30);

            });

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
                app.setPosition(33, 0, $(this));
            });

            this.$leftTop.on('click', function() {
                app.setPosition(0, 0, $(this));
            });

            this.$rightTop.on('click', function() {
                app.setPosition(100, 0, $(this));
            });

            this.$centerCenter.on('click', function() {
                //app.setPosition(33, 33, $(this));
            });

            this.$leftCenter.on('click', function() {
                app.setPosition(0, 33, $(this));
            });

            this.$rightCenter.on('click', function() {
                app.setPosition(100, 33, $(this));
            });

            this.$centerBottom.on('click', function() {
                app.setPosition(33, 100, $(this));
            });

            this.$leftBottom.on('click', function() {
                app.setPosition(0, 100, $(this));
            });

            this.$rightBottom.on('click', function() {
                app.setPosition(100, 100, $(this));
            });

        },
        moveX: function(param) {

            var xPos = parseInt(app.$watermark.css('left'), 10),
                borderPoint = app.$watermarkLayer.width() - app.$watermark.width();

            if (param) {
                if (xPos < borderPoint) {
                    xPos++;
                }

            } else {
                if (xPos > 0) {
                    xPos--;
                }
            }

            app.$watermark.css('left', xPos+'px');
            app.$xInput.val(xPos);


        },
        moveY: function(param) {

            var yPos = parseInt(app.$watermark.css('top'), 10),
                borderPoint = app.$watermarkLayer.height() - app.$watermark.height();

            if(param) {
                if (yPos < borderPoint) {
                    yPos++;
                }
            } else {
                if (yPos > 0) {
                    yPos--
                }

            }

            app.$watermark.css('top', yPos+'px');
            app.$yInput.val(yPos);

        },
        setActiveCell: function($this) {
            this.$cells.closest('.map').find('.cell').removeClass('active');
            $this.addClass('active');
        },
        setPosition: function(left, top, $this) {
            // position in %
            // will translate it in px
            var layerWidth = app.$watermarkLayer.width(),
                layerHeight = app.$watermarkLayer.height(),
                watermarkWidth = app.$watermark.width(),
                watermarkHeight = app.$watermark.height();

            var l = (layerWidth * left) / 100,
                t = (layerHeight * top) / 100;

            if (left === 100) {
                l -= watermarkWidth;
            }
            if (top === 100) {
                t -= watermarkHeight;
            }

            var position = {
                left: l + 'px',
                top: t + 'px'
            };

            app.$watermark.css(position);

            this.$xInput.val(l);
            this.$yInput.val(t);
            //sets active cell
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
            var borderPointY = app.$watermarkLayer.height() - app.$watermark.height(),
                borderPointX = app.$watermarkLayer.width() - app.$watermark.width();

            this.$xInput.on('keyup', function() {
                var $this = $(this);

                if ($this.val() < borderPointX && $this.val() > 0) {
                    app.$watermark.css('left', $this.val() + 'px');
                }

            });
            
            this.$yInput.on('keyup', function() {
                var $this = $(this);

                if ($this.val() < borderPointY && $this.val() > 0) {
                    app.$watermark.css('top', $this.val() + 'px');
                }

            });
        }


    };

    app.initialize();
});