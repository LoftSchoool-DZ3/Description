$(document).ready(function() {
	$('.field-number').on('focusout', function() {
		if (this.value == "") {
			this.value = 0;
		}
	});

	$('.field-number').on('change keyup input click paste', function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	})
});