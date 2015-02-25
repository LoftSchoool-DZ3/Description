$(document).ready(function(){
	function checkInputs() {
		if (typeof ($('#orig-img').attr('value')) == "undefined") {
			$('#watermark').prop('disabled', true);
			$('#submit').prop('disabled', true);
			$('.label-watermark').addClass('disabled');
			$('.wr-watermark').addClass('disabled');
		} else if (typeof ($('#watermark').attr('value')) == "undefined") {
			$('#watermark').prop('disabled', false);
			$('.label-watermark').removeClass('disabled');
			$('.wr-watermark').removeClass('disabled');
			$('#submit').prop('disabled', true);
		} else {
			$('#watermark').prop('disabled', false);
			$('.label-watermark').removeClass('disabled');
			$('.wr-watermark').removeClass('disabled');
			$('#submit').prop('disabled', false);
		}
	}

	checkInputs();
	$('.field-file').on('change', checkInputs);
});