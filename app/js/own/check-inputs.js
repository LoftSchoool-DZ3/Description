$(document).ready(function() {
	$('.field-number').on('blur', function() {
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

		var origWidth = $('.layer.v-orig-img').width();
		var watermarkWidth = $('.layer.v-watermark').width();
		var maxWatermarkLeft = origWidth - watermarkWidth;
		

		var origHeight = $('.layer.v-orig-img').height();
		var watermarkHeight = $('.layer.v-watermark').height();
		var maxWatermarkTop = origHeight - watermarkHeight;
	

		if (this.value > maxWatermarkLeft && this.id == "x-one") {
			this.value = maxWatermarkLeft;
			$('.layer.v-watermark').css('left', maxWatermarkLeft);
		}

		if (this.value > maxWatermarkTop && this.id == "y-one") {
			this.value = maxWatermarkTop;
			$('.layer.v-watermark').css('top', maxWatermarkTop);
		}
		
	})
});