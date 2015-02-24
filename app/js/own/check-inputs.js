$(document).ready(function() {
	$('.field-number').on('blur', function() {
		console.log(this.value);
		if (this.value == "") {
			this.value = 0;
		}

		if (this.value == 0) {
			if (this.id == "x-one") {
				$('.layer.v-watermark').css('left', '0');
			}
			if (this.id == "y-one") {
				$('.layer.v-watermark').css('top', '0');
			}
		}
	});

	$('.field-number').on('change keyup input click paste', function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	})
});