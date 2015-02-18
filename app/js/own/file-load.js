$(document).ready(function() {
    var fileup = {

        initialize: function() {
            this.$inputFile = $('.fileupload')

            $('.close').on('click', function(event) {
                $('.alert-mask').hide();
            });
            this.setUpListeners();
            this.fileUploading();
            $('form').on('submit', fileup.submitForm);
        },

        setUpListeners: function() {
            this.$inputFile.on('change', function() {
                var changedInput = $('#' + this.id);
                fileup.pasteFileName(changedInput);

            });
        },

        // Подстановка имени файла в инпут:
        pasteFileName: function(fn) {
            var inputFileId = $(fn),
                fileNameSpan = $(inputFileId).prevAll('#' + inputFileId.attr('id') + '-name'),
                inputFileVal = inputFileId.val().replace("C:\\fakepath\\", '');


            fileNameSpan.html(inputFileVal);
            inputFileId.attr('value', inputFileVal);

        },

        //Загрузка файлов через плагин JQuery-File-Upload
        fileUploading: function() {
            'use strict';
            // Change this to the location of your server-side upload handler:
            var url = 'server/';
            $('.fileupload').fileupload({
                url: url,
                dataType: 'json',
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator && navigator.userAgent),
                imageMaxWidth: 651,
                imageMaxHeight: 534,
                done: function() {
                    var currentInputId = this.id;

                    fileup.showFile(currentInputId);
                },
                progressall: function() {}

            });

        },

        //Отображение загруженного файла в области просмотра
        showFile: function(n) {
            var value = $('#' + n + '-name').text(),
                viewImgClass = '.v-' + n,
                path = 'server\/files\/' + value;
            hiddenInputId = $('#' + n + '-srvpath');

            $(viewImgClass).children().attr('src', path);
            $(hiddenInputId).attr('value', value);


        },

        //Обработка сабмита формы
        submitForm: function(f) {
            f.preventDefault();

            var form = $(this),
                str = form.serialize();

            console.log(form);
            console.log(str);
            $.ajax({
                        url: 'server/generator.php',
                        type: 'POST',
                        dataType:'json',
                        data: str
                    })
                    .done(function(data) {
                        $('#message').html(data);
                        $('.alert-mask').show();
                        
                    })
                    .fail(function() {
                        $('#message').html('FAILED!!!');
                    })
        }

    }

    fileup.initialize();
});
