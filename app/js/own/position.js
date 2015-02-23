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

            this.$opacityValue = $('#opacity_value');

            this.$watermark = $('.v-watermark');
            this.$layout = $('.v-orig-img ').find('img');
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

            this.beforeClickValue;

            this.setUpEventListeners();
            this.drag();
            this.inputPositioningSetup();

        },
        setUpEventListeners: function() {
            // reset button
            this.$resetBtn.on('click', function() {

                app.setPosition('left', 'top');
                app.setActiveCell('.left-top');

                $( ".slider" ).slider( "option", "value", 30);
                app.$watermark.css('opacity',.3);
                app.$opacityValue.val(.3);

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
                app.setPosition('center', 'top');
                app.setActiveCell(this);
            });

            this.$leftTop.on('click', function() {
                app.setPosition('left', 'top');
                app.setActiveCell(this);
            });

            this.$rightTop.on('click', function() {
                app.setPosition('right', 'top');
                app.setActiveCell(this);
            });

            this.$centerCenter.on('click', function() {
                app.setPosition('center', 'center');
                app.setActiveCell(this);
            });

            this.$leftCenter.on('click', function() {
                app.setPosition('left', 'center');
                app.setActiveCell(this);
            });

            this.$rightCenter.on('click', function() {
                app.setPosition('right', 'center');
                app.setActiveCell(this);
            });

            this.$centerBottom.on('click', function() {
                app.setPosition('center', 'bottom');
                app.setActiveCell(this);
            });

            this.$leftBottom.on('click', function() {
                app.setPosition('left', 'bottom');
                app.setActiveCell(this);
            });

            this.$rightBottom.on('click', function() {
                app.setPosition('right', 'bottom');
                app.setActiveCell(this);
            });

        },
        moveX: function(param) {

            var xPos = parseInt(app.$watermark.css('left'), 10),
                borderPoint = app.$layout.width() - app.$watermark.width();

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
            app.$watermark.css({
                marginTop: 0
            });

            var yPos = parseInt(app.$watermark.css('top'), 10),
                borderPoint = app.$layout.height() - app.$watermark.height();

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
        setActiveCell: function(elem) {
            elem = $(elem);
            this.$cells.closest('.map').find('.cell').removeClass('active');
            elem.addClass('active');
        },
        setPosition: function(horizontal, vertical) {

            var position;

            // horizontal position
            switch (horizontal) {
                case 'left':
                    horizontal = 0;
                    break;
                case 'center':
                    horizontal = ( app.$layout.width() / 2 ) - ( app.$watermark.width() / 2 );
                    break;
                case 'right':
                    horizontal = ( app.$layout.width() ) - ( app.$watermark.width() );
                    break;
            }

            // vertical position
            switch (vertical) {
                case 'top':
                    vertical = 0;
                    break;
                case 'center':
                    vertical = ( app.$layout.height() / 2 ) - ( app.$watermark.height() / 2 );
                    break;
                case 'bottom':
                    vertical = ( app.$layout.height() ) - ( app.$watermark.height() );
            }

            horizontal = parseInt(horizontal, 10);
            vertical = parseInt(vertical, 10);

            position = {
                left: horizontal + 'px',
                top: vertical + 'px'
            };

            app.$watermark.css(position);

            app.$xInput.val(horizontal);
            app.$yInput.val(vertical);


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

            var borderValues = function (direction, elem) {

                var borderPointX = app.$layout.width() - app.$watermark.width(),
                    borderPointY = app.$layout.height() - app.$watermark.height(),
                    elem = $(elem);

                if (direction === 'left' && elem.val() < borderPointX && elem.val() >= 0) {
                    app.$watermark.css(direction, elem.val() + 'px');
                }

                if (direction === 'top' && elem.val() < borderPointY && elem.val() >= 0) {
                    app.$watermark.css(direction, elem.val() + 'px');
                }

            };

            var inputsArray = [
                this.$xInput,
                this.$yInput
            ];

            console.log(app.beforeClickValue);

            for (var index in inputsArray) {
                inputsArray[index].on('blur', function() {
                    var $this = $(this);

                    if ($this.val() === '' && app.beforeClickValue === 0) {
                        $this.val(0);
                    } else if (app.beforeClickValue){
                        $this.val(app.beforeClickValue);
                    }
                    console.log(app.beforeClickValue);

                });

                inputsArray[index].on('click', function() {
                    var $this = $(this);
                        //oldValue = parseInt( $this.val(), 10 );
                    app.beforeClickValue = parseInt( $this.val(), 10 );
                    console.log($this);

                    $this.val('');

                });

            }

            this.$xInput.on('keyup', function() {
                var $this = $(this);

                borderValues('left', this);
                app.beforeClickValue = $this.val();
            });

            this.$yInput.on('keyup', function() {
                var $this = $(this);

                borderValues('top', this);
                app.beforeClickValue = $this.val();
            });

            //this.$xInput.on('blur', function() {
            //
            //    var $this = $(this);
            //
            //    if ($this.val() === '') {
            //        $this.val(0);
            //    }
            //});
            //
            //this.$yInput.on('blur', function() {
            //
            //    var $this = $(this);
            //
            //    if ($this.val() === '') {
            //        $this.val(0);
            //    }
            //});

        }


    };

    app.initialize();
});