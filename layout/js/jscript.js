var $ = jQuery;
var mq = window.matchMedia("(max-width: 768px)");
var isMobile = mq.matches;
var isArabic = document.querySelector('body').classList.contains('lang-ar')
// lazy load images
AOS.init({ disable: 'mobile', duration: 1000 });
var marginFromLeft = $('.header .container').css('marginLeft')
var marginSmallContainer = $('.small-container').css('marginLeft')
$(document).ready(function () {
    $('.hidden').removeClass('hidden');

    headerSticky()
    initVideoJS();
    readMoreLines();

    $('[show-more]').click(function () {
        if (isMobile)
            $(this).toggleClass('active').parents('[root]').find('[target]').slideToggle();
    });
    // modal functions
    modalFn()

    // mobile menu
    mobileMenuAnitmation();

    // init mobile number
    initMobileNumber()



    // accordion
    accordionBox()


    // sliders
    sliders()


    // video modal
    initVideoModal()

    fullHalfWidth();

    toggleTabs();


    // custom scripts for the project
    $('.mo-link-item [toggle-submenu]').click(function () {
        $(this).parents('.mo-link-item').toggleClass('active').find('.header-drowdown').slideToggle();
    });
    function paths() {
        if ($('.prog-section .item svg').length > 0) {
            $('.prog-section .item').each(function () {
                var progress = +$(this).find('.prog-num').text().trim();
                var pathsToFill = Math.floor((progress / 100) * 20);

                $(this).find("svg path").each(function (index) {
                    if (index < pathsToFill) {
                        // Fill the path with white
                        $(this).attr("fill", "white");
                    } else {
                        // Fill the path with color
                        $(this).attr("fill", "#7D2B41");
                    }
                });
            })

        }
        if ($('.const-prog-boxx svg').length > 0) {
            var progress = +$('.const-prog-boxx [progress]').text().trim();
            var pathsToFill = Math.floor((progress / 100) * 20);

            $('.const-prog-boxx svg path').each(function (index) {
                if (index < pathsToFill) {
                    // Fill the path with white
                    $(this).attr("fill", "#383838");
                } else {
                    // Fill the path with color
                    $(this).attr("fill", "#D3D3D3");
                }
            });
        }
    };
    paths();


    $('[go-to-step]').click(function () {
        var toStep = +$(this).attr('go-to-step');
        if (toStep == 2) {
            var isValid = true;
            $("[step-form='1'] :input:visible").each(function () {
                if (!this.checkValidity()) {
                    // Handle invalid input
                    $(this).siblings('.req-filed-err').show();
                    isValid = false;
                } else {
                    $(this).siblings('.req-filed-err').hide();
                }
            });
            if (isValid) {
                $("[step-form='1']").removeClass('active');
                $("[step-form='2']").addClass('active');
                $('[modal-step-num]').text(2)
            }
        } else {
            $("[step-form='2']").removeClass('active');
            $("[step-form='1']").addClass('active');
            $('[modal-step-num]').text(1)
        }
    })

});

function modalFn() {
    // close modal
    $('body').on("click", "[close-modal]", function () {
        var modal = $(this).attr('close-modal');
        closeModal(modal)
    });
    // open modal
    $('body').on("click", "[open-modal]", function () {
        $('body').addClass('overflow-h')
        var modal = $(this).attr('open-modal');
        openModal(modal)
    });
    // *********************
    // close modals when click outside
    // *********************
    $('body').on("click", "[modal-body],[open-modal],[to-open]", function (e) {
        e.stopPropagation();
    });
    $(window).click(function (e) {
        var currentModal = $("body[opened-modal]").attr("opened-modal");
        if (currentModal) {
            closeModal(currentModal)
        }
    });
}

function openModal(modal) {
    $('[modal-name="' + modal + '"]').addClass('active').removeClass('out')
    $('body').addClass('overflow-hidden')
    if ($('body').attr('opened-modal') == undefined || $('body').attr('opened-modal') == '')
        $('body').attr('opened-modal', modal)
    else if ($('body').attr('opened-modal').includes(modal)) {

    } else
        $('body').attr('opened-modal', $('body').attr('opened-modal') + ',' + modal)

}
function closeModal(modal) {

    $('[modal-name="' + modal + '"]').removeClass('active');
    if (document.querySelector('[modal-name="' + modal + '"]').hasAttribute('has-video')) {
        $('[modal-name="' + modal + '"] [target]').html('')
    }
    $('body').removeClass('overflow-hidden')
    var openedModals = $('body').attr('opened-modal').split(',')
    openedModals = openedModals.slice(0, openedModals.length - 1)

    $('body').attr('opened-modal', openedModals.join())

}


function mobileMenuAnitmation() {
    $('[open-mobile-menu]').click(function () {
        $(this).toggleClass('active')
        $('.mobile-menu-box').toggleClass('active')
        $('body').toggleClass('overflow-hidden')
    })
    $('[close-mobile-menu]').click(function () {
        $('.mobile-menu-box').removeClass('active')
        $('body').removeClass('overflow-hidden')
    })

}

$(document).ready(function () {
    let all_dial_codes = document.querySelectorAll('.iti__selected-dial-code');
    all_dial_codes.forEach(element => {
        element.classList.add('my-d-none');
    });

    let all_phone_inputs = document.querySelectorAll('input[name="phone"]');
    all_phone_inputs.forEach(element => {
        $(element).val('+971').trigger('input');
        element.style.setProperty('padding-left', '53px', 'important');
    })
});

$(document).on('click', '.iti__country-list li', function () {
    getFullNum($(this));
});

$(document).on('focusout', 'input[name="phone"]', function () {
    getFullNum($(this), true);
})

function getFullNum($this, input = false) {
    if (input) {
        let element_val = $($this).val();
        let dial_code = $($this).parent().find('.iti__selected-dial-code');
        if (!element_val.includes(dial_code.text())) {
            $($this).val(dial_code.text() + element_val);
        }
    } else {
        let dial_code = $($this).parents('.iti__flag-container').find('.iti__selected-dial-code');
        let num = $($this).parents('form').find('input[name="phone"]');
        if (num) {
            return '+' + $($this).data('dial-code') + num.val();
        } else {
            return '+' + $($this).data('dial-code');
        }
    }
}

function initMobileNumber() {
    if ($("[mobile]").length > 0) {
        $("[mobile]").each(function () {
            $(this).intlTelInput({
                initialCountry: "ae",
                separateDialCode: true,
                geoIpLookup: function (callback) {
                    $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                },
                // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
            });
        });
        $("#mobile_number").intlTelInput({
            initialCountry: "ae",
            separateDialCode: true,
            geoIpLookup: function (callback) {
                $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
        });
    }
    if ($('.register-section [name="phone"]').length > 0) {
        $('.register-section [name="phone"]').intlTelInput({
            initialCountry: "ae",
            separateDialCode: true,
            geoIpLookup: function (callback) {
                $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
        });
        $('.register-section [name="phone"]').attr('placeholder', 'xx xxx xxxx');
    }
}
function formValidation() {
    $('[modal-form]').validate();
    // form in contact page
    if (document.querySelector('[contact-form]'))
        $('[contact-form]').validate();
}




function showAlert(status, msg) {
    var id = generateID()
    var alertTemplate = '<aside alert-id="' + id + '" class="custom-alert">' + msg + '</aside>';
    $('body').append(alertTemplate);
    setTimeout(function () {
        $('.custom-alert[alert-id="' + id + '"]').addClass('active')
        setTimeout(function () {
            $('.custom-alert[alert-id="' + id + '"]').removeClass('active')
            setTimeout(function () {
                $('.custom-alert[alert-id="' + id + '"]').remove()
            }, 400)
        }, 2000)
    }, 100)
}

function generateID() {
    return "id" + Math.random().toString(16).slice(2)
}
function toggleTabs() {
    $('[toggle]').click(function () {
        var eSelector = $(this).attr('toggle');
        var allTabs = eSelector.substr(0, 3);

        if (eSelector.includes('all')) {
            // Show all tabs when the "All" button is clicked
            $('[data-toggle-tab^=' + allTabs + ']').addClass('active');

            var allBtns = $('[toggle^=' + allTabs + ']');
            $(allBtns).removeClass('active');

            var btn = $('[toggle=' + eSelector + ']');
            $(btn).addClass('active').siblings().removeClass('active');

        } else {
            var allBtns = $('[toggle^=' + allTabs + ']');
            $(allBtns).removeClass('active');

            var btn = $('[toggle=' + eSelector + ']');
            $(btn).addClass('active').siblings().removeClass('active');

            var elList = $('[data-toggle-tab^=' + allTabs + ']');
            $(elList).removeClass('active');

            var element = $('[data-toggle-tab=' + eSelector + ']');
            $(element).addClass('active');
        }
    });


    $('[toggle-fade]').click(function () {
        var eSelector = $(this).attr('toggle-fade');
        var btn = $('[toggle-fade="' + eSelector + '"]');
        $(btn).addClass('active').siblings().removeClass('active');

        var allTabs = eSelector.substr(0, 3);
        var elList = $('[data-toggle-fade^="' + allTabs + '"]');
        $(elList).hide().removeClass('active');

        var element = $('[data-toggle-fade="' + eSelector + '"]');
        $(element).fadeIn().addClass('active');
    })


}





function accordionBox() {
    $('.acc-head').click(function () {

        if ($(this).parents('[is-multiple]').attr('is-multiple') == 'true') {
            $(this).toggleClass('active').siblings('.acc-body').slideToggle()
        } else {
            if (!$(this).hasClass('active')) {
                $(this).parents('[accordion-root]').find('.acc-head').removeClass('active');
                $(this).parents('[accordion-root]').find('.acc-body').slideUp();
                $(this).addClass('active').siblings('.acc-body').slideDown();
            } else {
                $(this).parents('[accordion-root]').find('.acc-head').removeClass('active');
                $(this).parents('[accordion-root]').find('.acc-body').slideUp();
            }
        }
    })
}

function sliders() {


    if ($('.landing-slider').length > 0) {
        var swiper = new Swiper(".landing-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".landing-section .swiper-custom-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".landing-section .right-arrow",
                prevEl: ".landing-section .left-arrow",
            },
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });
    }
    if ($('.property-slider').length > 0) {
        var swiper = new Swiper(".property-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".property-section .swiper-custom-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".property-section .right-arrow",
                prevEl: ".property-section .left-arrow",
            },
            loop: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });
    }
    if ($('.unit-slider').length > 0) {
        $('.unit-section .tab').each(function () {
            var id = generateID();
            $(this).find('.unit-slider').attr('id', id);
            // $("#"+id+".unit-slider").parents('.just-wrap').attr('id','wrap'+id);
            $("#" + id + ".unit-slider").parents('.just-wrap').find('.left-arrow').attr('id', 'arr-left' + id);
            $("#" + id + ".unit-slider").parents('.just-wrap').find('.right-arrow').attr('id', 'arr-right' + id);
            var swiper = new Swiper("#" + id + ".unit-slider", {
                slidesPerView: 1,
                spaceBetween: 15,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                loop: true,
                navigation: {
                    nextEl: '#arr-right' + id,
                    prevEl: '#arr-left' + id,
                },
            });
        });
        if (!isMobile) {
            $('.unit-section .unit-slider, .unit-section .tab-box .swiper-slide').css({ 'maxWidth': $('.header .container').width() - 264 });
        } else {
            $('.unit-section .unit-slider, .unit-section .tab-box .swiper-slide').css({ 'maxWidth': $('.header .container').width() });
        }

        // $('.unit-section .tab-box .swiper-slide').css({'maxWidth': $('.header .container').width() - 264})
    }
    if ($('.const-slider').length > 0) {
        var swiper = new Swiper(".const-slider", {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".const-section .right-arrow",
                prevEl: ".const-section .left-arrow",
            },
        });
    }
    if ($('.inter-slider').length > 0) {
        var thumbs = new Swiper('.int-ext-section .left .gallery-thumbs', {
            slidesPerView: 4,
            spaceBetween: 8,
            // loop:true,
            // centeredSlides: true,
            // loop: true,
            slideToClickedSlide: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 2,
                },
                1100: {
                    slidesPerView: 4,
                },
            },
        });
        var slider = new Swiper(".inter-slider", {
            slidesPerView: 1,
            //   loop:true,
            loopedSlides: 1,
            navigation: {
                nextEl: ".int-ext-section .left .right-arrow",
                prevEl: ".int-ext-section .left .left-arrow",
            },
            pagination: {
                el: ".int-ext-section .left .swiper-custom-pagination",
                clickable: true,
            },
            thumbs: {
                swiper: thumbs,
            },
        });

        slider.controller.control = thumbs;

    }

    if ($('.ext-slider').length > 0) {
        var thumbs = new Swiper('.int-ext-section .right .gallery-thumbs', {
            slidesPerView: 4,
            // loop:true,
            spaceBetween: 8,
            // centeredSlides: true,
            // loop: true,
            slideToClickedSlide: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 2,
                },
                1100: {
                    slidesPerView: 4,
                },
            },
        });
        var slider = new Swiper(".ext-slider", {
            slidesPerView: 1,
            //   loop:true,
            loopedSlides: 1,
            navigation: {
                nextEl: ".int-ext-section .right .right-arrow",
                prevEl: ".int-ext-section .right .left-arrow",
            },
            pagination: {
                el: ".int-ext-section .right .swiper-custom-pagination",
                clickable: true,
            },
            thumbs: {
                swiper: thumbs,
            },
        });

        slider.controller.control = thumbs;

    }

    if ($('.news-details-slider').length > 0) {
        var swiper = new Swiper(".news-details-slider", {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            spaceBetween: 15,
            pagination: {
                el: ".wrapper-news-details-slider .swiper-custom-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".wrapper-news-details-slider .right-arrow",
                prevEl: ".wrapper-news-details-slider .left-arrow",
            },
        });
    }

    if (document.querySelector('.news-slider')) {
        var swiper = new Swiper(".news-slider", {
            slidesPerView: 3,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            // centeredSlides: true,
            spaceBetween: 27,
            navigation: {
                nextEl: ".news-section .arrow-right",
                prevEl: ".news-section .arrow-left",
            },
            pagination: {
                el: ".news-section .swiper-custom-pagination",
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.partners-slider')) {
        var swiper = new Swiper(".partners-slider", {
            slidesPerView: 4,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".partners-section arrow.right",
                prevEl: ".partners-section arrow.left",
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                800: {
                    slidesPerView: 3,
                },
                1100: {
                    slidesPerView: 4,
                },
            },
            loop: true
        });
    }
    if (document.querySelector('.expertise-slider')) {
        var swiper = new Swiper(".expertise-slider", {
            slidesPerView: 3,
            loop: true,
            // centeredSlides: true,
            spaceBetween: 50,
            navigation: {
                nextEl: ".expertise-section .right-arrow",
                prevEl: ".expertise-section .left-arrow",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                800: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.other-exp-slider')) {
        var swiper = new Swiper(".other-exp-slider", {
            slidesPerView: 3,
            // centeredSlides: true,
            spaceBetween: 40,
            loop: true,
            navigation: {
                nextEl: ".other-exp-section .right-arrow",
                prevEl: ".other-exp-section .left-arrow",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                800: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.rel-vac-slider')) {
        var swiper = new Swiper(".rel-vac-slider", {
            slidesPerView: 3,
            loop: true,
            // centeredSlides: true,
            spaceBetween: 57,
            navigation: {
                nextEl: ".rel-vac-section .right-arrow",
                prevEl: ".rel-vac-section .left-arrow",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                800: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 57,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.team-slider')) {
        var swiper = new Swiper(".team-slider", {
            slidesPerView: 5,
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".team-section .right-arrow",
                prevEl: ".team-section .left-arrow",
            },
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                800: {
                    slidesPerView: 3,
                },
                1100: {
                    slidesPerView: 5,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.acc-slider')) {
        var swiper = new Swiper(".acc-slider", {
            slidesPerView: 4,
            // centeredSlides: true,
            spaceBetween: 15,
            navigation: {
                nextEl: ".acc-section arrow.right",
                prevEl: ".acc-section arrow.left",
            },
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                800: {
                    slidesPerView: 3,
                },
                1100: {
                    slidesPerView: 4,
                },
            },
            // loop:true
        });
    }

    if (document.querySelector('.car-details-slider')) {
        var swiper = new Swiper(".car-details-slider", {
            slidesPerView: 4,
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".photoswipe--gallery .right",
                prevEl: ".photoswipe--gallery .left",
            },
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                },
                1100: {
                    slidesPerView: 4,
                },
            },
            // loop:true
        });
        previewSlide();
    }
    if (document.querySelector('.hire-slider')) {
        var swiper = new Swiper(".hire-slider", {
            slidesPerView: 3,
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".hire-slider-1-box .right",
                prevEl: ".hire-slider-1-box .left",
            },
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.hire-slider-2')) {
        var swiper = new Swiper(".hire-slider-2", {
            slidesPerView: 3,
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".hire-slider-2-box .right",
                prevEl: ".hire-slider-2-box .left",
            },
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.reviews-slider')) {
        var swiper = new Swiper(".reviews-slider", {
            slidesPerView: 3,
            // centeredSlides: true,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".reviews-section .swiper-custom-pagination",
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.brands-slider')) {
        var swiper = new Swiper(".brands-slider", {
            slidesPerView: 7,
            // centeredSlides: true,
            spaceBetween: 5,
            loop: true,
            // pagination: {
            //   el: ".reviews-section .swiper-custom-pagination",
            //   clickable: true,
            // },
            navigation: {
                nextEl: ".brands-section .right",
                prevEl: ".brands-section .left",
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 7,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.deals-slider')) {
        var swiper = new Swiper(".deals-slider", {
            slidesPerView: 3,
            // centeredSlides: true,
            spaceBetween: 25,
            navigation: {
                nextEl: ".deals-section .right",
                prevEl: ".deals-section .left",
            },
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
            // loop:true
        });
    }
    if (document.querySelector('.clients-slider')) {
        var swiper = new Swiper(".clients-slider", {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 10,
            navigation: {
                nextEl: ".clients-section .left-arrow",
                prevEl: ".clients-section .right-arrow",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 5,
                },
            }

        });
    }
    if ($('[equal-slides]').length > 0) {

        $('[equal-slides]').each(function () {
            var tallestSlideHeight = 0;
            var self = $(this);

            // Loop through each slide and find the tallest one
            $(self).find('.swiper-slide').each(function () {
                var slideHeight = $(this).height();

                if (slideHeight > tallestSlideHeight) {
                    tallestSlideHeight = slideHeight;
                }
            });

            // Set the same height for all slides
            $(self).find('.swiper-slide').css('height', tallestSlideHeight + 'px');
        });

    }
}

function initVideoModal() {
    $('[play-video-modal]').click(function () {
        var modalName = $(this).attr('open-modal');
        var videoID = $('[play-video-modal]');
        var videoSrc = $('[video-id=' + videoID + '][video-modal-src="' + modalName + '"]').html();
        $('[modal-name="' + modalName + '"] [target]').html(videoSrc)
        $('[modal-name="' + modalName + '"]').attr('has-video', '')
    })
}



$('[read-more-root]').click(function () {
    var text = $(this).find('[target]').html();
    $('.read-more-modal [target]').html(text)
});


$('[video-play]').click(function () {
    var video = $(this).get(0)
    if ($(this).attr('is-init') != '') {
        $(this).parents('.play-icon-box').removeClass('play-icon-box');
    }
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
})

function fullHalfWidth() {

    if (marginFromLeft) {
        $('[full-half]').css('width', 'calc(100% + ' + marginFromLeft + ')')
        marginNum = +(marginFromLeft.replace('px', ''))
        $('[pull-left]').css('marginRight', (-marginNum) + 'px');
        $('[pull-right]').css('marginLeft', (marginNum) + 'px');
        $('[pull-left-inner]').css('marginRight', (marginNum) + 'px');
        if (isArabic) {
            $('[padding-right]').css('paddingLeft', (marginNum) + 'px');
        } else {
            $('[padding-right]').css('paddingLeft', (marginNum) + 'px');
        }

        $('[full-half-container]').css({ 'paddingLeft': marginNum / 2, 'paddingRight': marginNum })
        $('[full-half-container-padding]').css({ 'paddingLeft': marginNum })

        if (isMobile) {
            $('[full-mobile-right]').css('width', 'calc(105% + ' + ((marginNum * 2) + 10) + 'px)')
        }
    }
}



function previewSlide() {
    if ($('[preview-slide]').length > 0) {
        $('[show-slide]').click(function () {
            var target = $(this).attr('show-slide');
            var src = $(this).find('img').attr('src');

            $('[show-slide="' + target + '"]').removeClass('active').find('img').removeClass('active')
            $('[preview-slide="' + target + '"]').attr('src', src);
            $(this).addClass('active').find('img').addClass('active');

        })
    }
}

function headerSticky() {
    var header = document.querySelector("header.header");
    if (header) {
        var lastScrollTop = 0;
        var headerHeight = $("header.header").innerHeight()
        window.onscroll = function () { scrollHide() };
        // $('.mobile-menu-box').css({'top':headerHeight});
        // $('.mobile-menu > ul').css({'height':'calc(96% - '+headerHeight+'px)'})
        function scrollHide() {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > headerHeight) {
                header.classList.add('scrolling');
            } else {
                header.classList.remove('scrolling');
            }
        }
        scrollHide();
    }
}


$.fn.isInViewport = function () {
    if ($(this) && $(this).offset()) {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
};



function initVideoJS() {
    if ($('.video-el').length > 0) {
        // <video id="my-video" class="video-js video-el object-fit vjs-default-skin w-100" poster="layout/image/video-img.jpeg" controls preload="auto" width="640" height="360">
        //    <source src="layout/image/article-vid.mp4" type="video/mp4">
        // </video>
        $('.video-el').each(function () {
            var ID = $(this).attr('id');
            var player = videojs(ID);
        })
    }
}

function readMoreLines() {
    // <div read-root>
    //   <p class="three-line" read-lines="3">original text</p>
    //   <button read-more-btn >Read More</button>
    // </div>
    if ($('[read-lines]').length > 0) {
        $('[read-lines]').each(function () {
            var lines = $(this).attr('read-lines');
            $(this).attr('data-height', $(this).css('height'));
            var lineHeight = parseFloat($(this).css('line-height')); // Get the line height in pixels

            $(this).css({
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'display': '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': 'unset',
                'transition': 'max-height 0.3s ease-in-out',
                'max-height': (lineHeight * lines) + 'px', // Set max-height based on line count
            });
        });

        $('[read-more-btn]').click(function () {
            var targetText = $(this).parents('[read-root]').find('[read-lines]');
            var originalHeight = $(targetText).attr('data-height');

            $(targetText).css({
                'max-height': originalHeight, // Remove the max height to expand
            });

            $(this).hide();
        });

    }
}
