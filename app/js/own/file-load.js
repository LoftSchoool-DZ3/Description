$(document).ready(function() {
    var app = {
          
        initialize : function () {
            this.setUpListeners();
        },
  
        setUpListeners: function () {
            $('#orig-img').change(function() {
                $('#orig-img-name').html($(this).val().replace( "C:\\fakepath\\", '' ));
                $('#orig-img').attr('value', $(this).val().replace( "C:\\fakepath\\", '' ));
                if ($(this).val() == '') {
                    $('#orig-img-name').html('Ошибка. Повторите еще раз.');
                }
            });

            $('#watermark').change(function() {
                $('#watermark-name').html($(this).val().replace( "C:\\fakepath\\", '' ));
                $('#watermark').attr('value', $(this).val().replace( "C:\\fakepath\\", '' ));
                if ($(this).val() == '') {
                    $('#watermark-name').html('Ошибка. Повторите еще раз.');
                }
            });
        }
       
    }
  
    app.initialize();
});

