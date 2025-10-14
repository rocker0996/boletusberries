(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992",
            meanExpand: ""
        });
        
        // Убираем анимации slideDown/slideUp для мобильного меню
        $(document).ready(function() {
            // Переопределяем метод slideDown для мобильного меню
            var originalSlideDown = $.fn.slideDown;
            var originalSlideUp = $.fn.slideUp;
            
            $.fn.slideDown = function(speed, callback) {
                if (this.hasClass('mean-nav') || this.closest('.mean-nav').length > 0) {
                    // Для мобильного меню показываем без анимации
                    return this.show(callback);
                } else {
                    // Для остальных элементов используем обычную анимацию
                    return originalSlideDown.apply(this, arguments);
                }
            };
            
            $.fn.slideUp = function(speed, callback) {
                if (this.hasClass('mean-nav') || this.closest('.mean-nav').length > 0) {
                    // Для мобильного меню скрываем без анимации
                    return this.hide(callback);
                } else {
                    // Для остальных элементов используем обычную анимацию
                    return originalSlideUp.apply(this, arguments);
                }
            };
        });
        
        // Custom mobile menu submenu handling
        $(document).on('click', '.mean-nav ul li:has(ul) > a:not(.mean-expand)', function(e) {
            e.preventDefault();
            var $li = $(this).parent();
            var $submenu = $li.find('> ul');
            var $expandBtn = $li.find('> a.mean-expand');
            
            if ($submenu.is(':visible')) {
                $submenu.hide(); // Убираем анимацию slideUp
                $expandBtn.removeClass('mean-clicked');
            } else {
                $submenu.show(); // Убираем анимацию slideDown
                $expandBtn.addClass('mean-clicked');
            }
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });

        // Counter animation
        function animateCounters() {
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = $this.attr('data-count');
                
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }

        // Trigger counter animation when section is in view
        $(window).on('scroll', function() {
            var statisticsSection = $('.statistics-section');
            if (statisticsSection.length > 0 && statisticsSection.offset()) {
                var windowTop = $(window).scrollTop();
                var windowBottom = windowTop + $(window).height();
                var sectionTop = statisticsSection.offset().top;
                var sectionBottom = sectionTop + statisticsSection.height();
                
                if (windowBottom > sectionTop && windowTop < sectionBottom) {
                    if (!statisticsSection.hasClass('counters-animated')) {
                        statisticsSection.addClass('counters-animated');
                        animateCounters();
                    }
                }
            }
        });

    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
        
        // Переключение фона header при прокрутке (работает на всех страницах)
        setTimeout(function() {
            $(window).scroll(function() {
                var windowHeight = $(window).height();
                var documentHeight = $(document).height();
                var scrollTop = $(window).scrollTop();
                var isNearBottom = scrollTop + windowHeight >= documentHeight - 200;
                
                // Ищем header в sticky-wrapper (если он есть)
                var stickyHeader = $('.sticky-wrapper .top-header-area');
                
                if (stickyHeader.length > 0) {
                    if (isNearBottom) {
                        stickyHeader.addClass('scroll-bg');
                    } else {
                        stickyHeader.removeClass('scroll-bg');
                    }
                } else {
                    // Если нет sticky-wrapper, работаем с обычным header
                    var topHeader = $('.top-header-area');
                    if (topHeader.length > 0) {
                        if (isNearBottom) {
                            topHeader.addClass('scroll-bg');
                        } else {
                            topHeader.removeClass('scroll-bg');
                        }
                    }
                }
            });
        }, 100);
    });


}(jQuery));