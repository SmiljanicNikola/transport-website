(function($) {

	console.log('hiii');

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Banner.
			var $banner = $('#banner');

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			$('.scrolly').scrolly();

		// Poptrox.
			$window.on('load', function() {

				var $thumbs = $('.thumbnails');

				if ($thumbs.length > 0)
					$thumbs.poptrox({
						onPopupClose: function() { $body.removeClass('is-covered'); },
						onPopupOpen: function() { $body.addClass('is-covered'); },
						baseZIndex: 10001,
						useBodyOverflow: false,
						overlayColor: '#222226',
						overlayOpacity: 0.75,
						popupLoaderText: '',
						fadeSpeed: 500,
						usePopupDefaultStyling: false,
						windowMargin: (skel.breakpoint('small').active ? 5 : 50)
					});

			});

		



		// Initial scroll.
			$window.on('load', function() {
				$window.trigger('scroll');
			});

	});

})(jQuery);
  
  // Function to scroll to a section with a specified ID
  function scrollToSection(sectionId) {
	const section = document.getElementById(sectionId);
	section.scrollIntoView({ behavior: 'smooth' });
  }
  
// navSlide();


  // Function to toggle between English and Serbian navigation links
function toggleLanguage(lang) {
	if (lang === 'en') {
	  document.getElementById('nav-links-en').style.display = 'flex';
	  document.getElementById('nav-links-sr').style.display = 'none';
	  document.getElementById('flag-en').classList.add('active');
	  document.getElementById('flag-sr').classList.remove('active');
	} else if (lang === 'sr') {
	  document.getElementById('nav-links-en').style.display = 'none';
	  document.getElementById('nav-links-sr').style.display = 'flex';
	  document.getElementById('flag-en').classList.remove('active');
	  document.getElementById('flag-sr').classList.add('active');
	}
  }


document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.acc-btn');

    btns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const isOpen = this.classList.contains('is-open');
            
            // Close all buttons and contents
            btns.forEach((otherBtn) => {
                otherBtn.classList.remove('is-open');
                otherBtn.nextElementSibling.style.maxHeight = null;
            });
            
            // If the clicked button was not already open, open it
            if (!isOpen) {
                this.classList.add('is-open');
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
            }
        });
    });
});