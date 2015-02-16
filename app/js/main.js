$(document).on("submit", "form.settings-after", function (e) {
    $.fileDownload($(this).prop('action'), {
        preparingMessageHtml: "We are preparing your report, please wait...",
        failMessageHtml: "There was a problem generating your report, please try again.",
        httpMethod: "POST",
        data: $(this).serialize()
    });
    e.preventDefault(); //otherwise a normal form submit would occur
});