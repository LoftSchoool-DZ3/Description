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

            this.borderPointHorizontal = app.$layout.width() - app.$watermark.width();
            this.borderPointVertical = app.$layout.height() - app.$watermark.height();

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

            // move horizontal
            this.$incrementXbtn.on('click', function() {
                app.moveWatermark('horizontal', true);
            });
            this.$decrementXbtn.on('click', function() {
                app.moveWatermark('horizontal', false);
            });

            // move vertical
            this.$incrementYbtn.on('click', function() {
               app.moveWatermark('vertical', true);
            });
            this.$decrementYbtn.on('click', function() {
                app.moveWatermark('vertical', false);
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
        moveWatermark: function(direction, increase) {
            // increase - bool; if true - increasing, if false - decreasing positions
            // direction - string; options: 'horizontal', 'vertical'

            var horizontalPosition = parseInt(app.$watermark.css('left'), 10),
                verticalPosition = parseInt(app.$watermark.css('top'), 10);

            if ( direction === 'horizontal' ) {
                if ( increase && horizontalPosition < app.borderPointHorizontal ) {
                    
                    horizontalPosition++;

                } else if ( !increase && horizontalPosition > 0 ){
                    
                    horizontalPosition--;
                }
                app.$watermark.css('left', horizontalPosition+'px');
                app.$xInput.val(horizontalPosition);
            }

            if ( direction === 'vertical' ) {
                if ( increase && verticalPosition < app.borderPointVertical ) {

                    verticalPosition++;

                } else if ( !increase && verticalPosition > 0 ) {
                    
                    verticalPosition--;

                }

                app.$watermark.css('top', verticalPosition+'px');
                app.$yInput.val(verticalPosition);

            }

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

                var elem = $(elem);

                if (direction === 'left' && elem.val() < app.borderPointHorizontal && elem.val() >= 0) {
				
                    app.$watermark.css(direction, elem.val() + 'px');

                }

                if (direction === 'top' && elem.val() < app.borderPointVertical && elem.val() >= 0) {

                    app.$watermark.css(direction, elem.val() + 'px');

                }

            };

            var inputsArray = [
                this.$xInput,
                this.$yInput
            ];

            for (var index in inputsArray) {

                inputsArray[index].on('blur', function() {

                    var $this = $(this);

                    if ($this.val() === '' && app.beforeClickValue === 0) {

                        $this.val(0);

                    } else if (app.beforeClickValue){

                        $this.val(app.beforeClickValue);

                    }

                });

                inputsArray[index].on('click', function() {

                    var $this = $(this);

                    app.beforeClickValue = parseInt( $this.val(), 10 );

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

        }


    };

    app.initialize();
});