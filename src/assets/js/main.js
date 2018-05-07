/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($) {

    skel.breakpoints({
        xxlarge: '(max-width: 1920px)',
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 1000px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
    });

    $(function () {
        var $window = $(window),
            $body = $('body'),
            $header = $('#header');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            window.setTimeout(function () {
                $body.removeClass('is-loading');
            }, 100);
        });

        $window.scroll(function () {
            if ($(this).scrollTop() > window.innerHeight) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top').on('click', function (e) {
            e.preventDefault();

            $('html, body').animate({scrollTop: 0}, 400);
        });

        // Touch mode.
        skel.on('change', function () {

            if (skel.vars.mobile || skel.breakpoint('small').active)
                $body.addClass('is-touch');
            else
                $body.removeClass('is-touch');

        });


        // Fix: IE flexbox fix.
        if (skel.vars.IEVersion <= 11
            && skel.vars.IEVersion >= 10) {

            var $main = $('.main.fullscreen'),
                IEResizeTimeout;

            $window
                .on('resize.ie-flexbox-fix', function () {
                    clearTimeout(IEResizeTimeout);

                    IEResizeTimeout = setTimeout(function () {
                        var wh = $window.height();

                        $main.each(function () {
                            var $this = $(this);

                            $this.css('height', '');
                            if ($this.height() <= wh)
                                $this.css('height', (wh - 50) + 'px');

                        });
                    });
                })
                .triggerHandler('resize.ie-flexbox-fix');
        }

        // Prioritize "important" elements on small.
        skel.on('+small -small', function () {
            $.prioritize(
                '.important\\28 small\\29',
                skel.breakpoint('small').active
            );
        });

        // Gallery.
        $window.on('load', function () {
            var $gallery = $('.gallery');

            $gallery.poptrox({
                baseZIndex: 10001,
                useBodyOverflow: false,
                usePopupEasyClose: false,
                overlayColor: '#1f2328',
                overlayOpacity: 0.65,
                usePopupDefaultStyling: false,
                usePopupCaption: false,
                popupLoaderText: '',
                windowMargin: 50,
                usePopupNav: true
            });

            // Hack: Adjust margins when 'small' activates.
            skel
                .on('-small', function () {
                    $gallery.each(function () {
                        $(this)[0]._poptrox.windowMargin = 50;
                    });
                })
                .on('+small', function () {
                    $gallery.each(function () {
                        $(this)[0]._poptrox.windowMargin = 5;
                    });
                });

        });

        // Section transitions.
        if (skel.canUse('transition')) {
            var on = function () {

                // Galleries.
                $('.gallery').scrollex({
                    top: '30vh',
                    bottom: '30vh',
                    delay: 0,
                    initialize: function () {
                        $(this).addClass('inactive');
                    },
                    terminate: function () {
                        $(this).removeClass('inactive');
                    },
                    enter: function () {
                        $(this).removeClass('inactive');
                    }
                });

                // Generic sections.
                $('.main.style1').scrollex({
                    mode: 'middle',
                    delay: 0,
                    initialize: function () {
                        $(this).addClass('inactive');
                    },
                    terminate: function () {
                        $(this).removeClass('inactive');
                    },
                    enter: function () {
                        $(this).removeClass('inactive');
                    }
                });

                $('.main.style2').scrollex({
                    mode: 'middle',
                    delay: 0,
                    initialize: function () {
                        $(this).addClass('inactive');
                    },
                    terminate: function () {
                        $(this).removeClass('inactive');
                    },
                    enter: function () {
                        $(this).removeClass('inactive');
                    }
                });

            };
            skel.on('change', function () {
                (on)();
            });

        }

        $('a[href^="#"]').scrolly({
            speed: 1000,
            offset: $header.outerHeight() - 1
        });

        // // Events.
        // 	var resizeTimeout, resizeScrollTimeout;
        //
        // 	$window
        // 		.resize(function() {
        //
        // 			// Disable animations/transitions.
        // 				$body.addClass('is-resizing');
        //
        // 			window.clearTimeout(resizeTimeout);
        //
        // 			resizeTimeout = window.setTimeout(function() {
        //
        // 				// Update scrolly links.
        // 					$('a[href^="#"]').scrolly({
        // 						speed: 1500,
        // 						offset: $header.outerHeight() - 1
        // 					});
        //
        // 				// Re-enable animations/transitions.
        // 					window.setTimeout(function() {
        // 						$body.removeClass('is-resizing');
        // 						$window.trigger('scroll');
        // 					}, 0);
        //
        // 			}, 100);
        //
        // 		})
        // 		.load(function() {
        // 			$window.trigger('resize');
        // 		});

        var snsInfo = {
            title: '[모바일 초대장] ',
            content: '조성훈&허진 결혼식에 초대합니다.',
            link: 'http://www.hunylovejiny.com',
            imgSrc: 'http://hunylovejiny.com.s3-website.ap-northeast-2.amazonaws.com/assets/images/main.jpg',
            kakao: {
                id: '#kakao-share-btn',
                key: 'e0a3da945d985a84682babc289bbc413'
            },
            line: {
                id: '#line-share-btn'
            },
            copy: {
                id: '#url-copy-btn'
            }
        };

        new SnsShare(snsInfo);
    });

})(jQuery);
