$(document).ready(function() {
    var app = {
          
        initialize : function () {
            this.setUpListeners();
        },
  
        setUpListeners: function () {
            $('#orig-img').change(function() {
                $('#orig-img-name').html($(this).val());
                $('#orig-img').attr('value', $(this).val());
                if ($(this).val() == '') {
                    $('#orig-img-name').html('Ошибка. Повторите еще раз.');
                }
            });

            $('#watermark').change(function() {
                $('#watermark-name').html($(this).val());
                $('#watermark').attr('value', $(this).val());
                if ($(this).val() == '') {
                    $('#watermark-name').html('Ошибка. Повторите еще раз.');
                }
            });
        }
       
    }
  
    app.initialize();
});

