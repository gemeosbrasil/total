$(function() {
	'use strict';

	// ============================ STEP 1 → STEP 2 ============================
	// Click a quantity option → select it (highlight + check radio)
	$('.quantity .option').on('click', function() {
		$('.quantity .option').removeClass('active');
		$(this).addClass('active');
		$(this).find('input[type=radio]').prop('checked', true);
	});

	// Hovering pricing arrow shouldn't redirect — wrapped in label so fine
	// Next button → propagate selection to final step + reveal it
	$('.quantity .cta').on('click', function() {
		var $sel = $('.quantity input[name=product-option]:checked');
		if (!$sel.length) return;

		var img = $sel.data('img');
		var otpPrice = $sel.data('otp-price');
		var otpJarText = $sel.data('otp-jar-text');
		var linkOtp = $sel.data('link-otp');

		// Stash the one-time link for the final checkout
		$('#checkout-link').data('link-otp', linkOtp);
		$('#checkout-link').attr('href', linkOtp);

		// Image switcher (final step)
		var $finalImgs = $('.final .col.img img').not('.guarantee-overlay');
		$finalImgs.hide();
		$('.final .col.img img.' + img).show();

		// One-time block
		var currency = window.mvCurrency || 'GBP';
		if (currency === 'USD') {
			$('#otp-price').text($sel.data('otp-price-usd'));
			$('#otp-per-jar').text($sel.data('otp-jar-text-usd'));
		} else {
			$('#otp-price').text(otpPrice);
			$('#otp-per-jar').text(otpJarText);
		}

		// Reset to one-time purchase by default
		$('.final .option').removeClass('active');
		$('.final .option[data-mv-type="otp"]').addClass('active');
		$('#otp-exit').prop('checked', true);

		// Swap views
		$('.quantity').hide();
		$('.final').css('display', 'flex');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// ============================ FINAL STEP ============================
	// No need to handle option switching since only OTP is available

	// Back button → return to step 1
	$('.back').on('click', function() {
		$('.final').hide();
		$('.quantity').css('display', 'flex');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// Sync image on step 1 in case default-option is something other than pack3
	(function syncStep1Image() {
		var $sel = $('.quantity input[name=product-option]:checked');
		if (!$sel.length) return;
		var img = $sel.data('img');
		var $imgs = $('.quantity .col.img img').not('.guarantee-overlay');
		$imgs.hide();
		$('.quantity .col.img img.' + img).show();
	})();

	// Update step 1 image when quantity changes (preview)
	$('.quantity .option').on('click', function() {
		var img = $(this).find('input[type=radio]').data('img');
		if (!img) return;
		var $imgs = $('.quantity .col.img img').not('.guarantee-overlay');
		$imgs.hide();
		$('.quantity .col.img img.' + img).show();
	});

	// Sync active class and image when page is restored from bfcache (back button)
	window.addEventListener('pageshow', function(e) {
		if (!e.persisted) return;
		var $checked = $('.quantity input[name=product-option]:checked');
		if ($checked.length) {
			$('.quantity .option').removeClass('active');
			$checked.closest('.option').addClass('active');
			var img = $checked.data('img');
			if (img) {
				$('.quantity .col.img img').not('.guarantee-overlay').hide();
				$('.quantity .col.img img.' + img).show();
			}
		}
		// Ensure we're on step 1
		$('.final').hide();
		$('.quantity').css('display', 'flex');
	});
});
