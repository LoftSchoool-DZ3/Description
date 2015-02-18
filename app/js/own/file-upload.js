$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/';
    $('.fileupload').fileupload({
        url: url,
        dataType: 'json',
        disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent),
        imageMaxWidth: 651,
        imageMaxHeight: 534,
        done: function () {},
        progressall: function () {}
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});


