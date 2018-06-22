"use strict";


$(document).ready(function () {

    // =================================================== menu ===================================================

    var contentSections = $('.cd-section'),
        navigationItems = $('#main__nav a');

    updateNavigation();
    $(window).on('scroll', function () {
        updateNavigation();
    });

    //smooth scroll to the section
    navigationItems.on('click', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
        $('#main__nav').removeClass('open');
    });

    //smooth scroll to second section
    // $('.cd-scroll-down').on('click', function(event){
    //     event.preventDefault();
    //     smoothScroll($(this.hash));
    // });

    //open-close navigation on touch devices
    $('.cd-nav-trigger').on('click', function () {
        $('#main__nav').toggleClass('open');

    });
    //close navigation on touch devices when selectin an elemnt from the list
    // $('.touch #main__nav a').on('click', function(){
    //     $('.touch #main__nav').removeClass('open');
    // });

    function updateNavigation() {
        contentSections.each(function () {
            var $this = $(this);
            var activeSection = $('#main__nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
            if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });

    }

    function smoothScroll(target) {
        $('body,html').stop().animate(
            {'scrollTop': target.offset().top - $('header').outerHeight()},
            900
        );
    }

    // =================================================== menu ===================================================


    // =================================================== select language ===================================================

    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element,



            create a new DIV that will act as an option item:*/
            c = document.createElement("a");
            c.setAttribute("href", selElmnt[j].getAttribute('data-url'));
            c.innerHTML = selElmnt.options[j].innerHTML;
            // c.setAttribute("data-language", selElmnt.options[j].innerHTML);
            c.addEventListener("click", function (e) {
                $('.select-selected').css('display','none');
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        h.setAttribute("data-language", i);
                        // this.setAttribute("href", $(i).data('url'));

                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

    // =================================================== select language ===================================================

    // =================================================== progressbar ===================================================
    // on page load...
    moveProgressBar($('.custom__progress-wrap'));
    // on browser resize...
    $(window).resize(function () {
        moveProgressBar($('.custom__progress-wrap'));

        $('.first-block').css('padding-top', $('header').outerHeight());

        $(document).on('click', '.team__item', function (e) {
            if ($(window).width() < 501) {

                $('body,html').stop().animate(
                    {'scrollTop': $('.team__human_all').offset().top - $('header').outerHeight()},
                    400
                );
                500
            }
        });


    });

    // SIGNATURE PROGRESS
    function moveProgressBar(selector) {
        var getPercent = (selector.data('progress-percent') / 100);
        var getProgressWrapWidth = selector.width();
        var progressTotal = getPercent * getProgressWrapWidth;

        var animationLength = 2000;
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        selector.find('.custom__progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }

    // =================================================== progressbar ===================================================

    // =================================================== videoslider ===================================================
    $('.my-flipster').flipster({
        // buttons: true,
        // click: 'false',
        start: 'center',
        touch: true,
        loop: true,
        nav: 'after',
        scrollwheel: false
    });

    // =================================================== videoslider ===================================================


    // =================================================== owl carousel ===================================================


    // tabs + owl and tabs + reps

    // $('.tab-content > .tab-pane.fade').each(function () {
    //
    //     if ($(this).hasClass('active')) {
    //         $(this).addClass('firstt');
    //         $(this).closest('.tab-content').find('.tab-pane').addClass('active');
    //         $('.clubs__slider').owlCarousel({
    //             items: 1,
    //             nav: true,
    //             margin: 0,
    //             navText: ["<img src='../img/ar2.png'>", "<img src='../img/ar.png'>"],
    //             dots: false
    //         });
    //         $(this).closest('.tab-content').find('.tab-pane').removeClass('active');
    //         $(this).closest('.tab-content').find('.tab-pane.firstt').addClass('active in');
    //     }
    // });


// tabs resp end

    $('.stages__slider').owlCarousel({
        items: 5,
        nav: true,
        navText: ["<img src='../img/ar2.png'>", "<img src='../img/ar.png'>"],
        dots: false,
        responsive: {
            320: {
                items: 1
            },
            500: {
                items: 2
            },
            769: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });


    $('.localisation__slider').owlCarousel({
        items: 1,
        nav: true,
        navText: ["<img src='../img/arl.png'>", "<img src='../img/arr.png'>"],
        dots: false,
        margin:0,
        loop: true,
        responsive: {
            320: {
                items: 1
            },
            500: {
                items: 1
            },
            769: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });


    $('.news__slider').owlCarousel({
        items: 3,
        // nav: true,
        // arrows: false,
        margin: 0,
        dotsEach: true,
        dots: true,
        responsive: {
            320: {
                items: 1
            },
            769: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // =================================================== owl carousel ===================================================


    // =================================================== team logic ===================================================

    var human = $('.team__item');

    var humanSingle = $('.team__human');

    for (var i = 0; i < human.length; i++) {
        $(human[i]).attr('data-id', i);
    }
    for (var i = 0; i < humanSingle.length; i++) {
        $(humanSingle[i]).attr('data-id', i);
    }

    $(document).on('click', '.team__item', function (e) {

        var index = $(this).data('id');

        humanSingle.css('display', 'none');

        setTimeout(function () {
            humanSingle.removeClass('active');
        }, 100);

        human.removeClass('active');

        $('.team__human[data-id="' + index + '"]').css('display', 'block');

        setTimeout(function () {
            $('.team__human[data-id="' + index + '"]').addClass('active');
        }, 100);


        $('.team__item[data-id="' + index + '"]').addClass('active');

        if ($(window).width() < 501) {

            $('body,html').stop().animate(
                {'scrollTop': $('.team__human_all').offset().top - $('header').outerHeight()},
                400
            );
            500
        }
    });

    // =================================================== team logic ===================================================


    // =================================================== dropdown logic ===================================================

    $('.faq__item').on('click', function () {
        // alert('najal');
        $('.faq__item').not($(this)).removeClass('active');

        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }

    });

    // =================================================== dropdown logic ===================================================


    // =================================================== form ===================================================


    function removePopup() {

        $('.mail-popup__wrapper').hide(300).removeClass('visible error success');
        $('.mail-popup__error').hide(300);
        $('.mail-popup__success').hide(300);

    }

    // $(document).on('submit', '.mail__form form', function (e) {
    //
    //     e.preventDefault();
    //
    //     var url = $(this).data('url');
    //
    //     var value = $(this).closest('form').find('input').val();
    //
    //     var pattern = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$');
    //
    //     if (pattern.test(value)) {
    //         $.ajax({
    //             url: url,
    //             method: 'GET',
    //             dataType: 'html',
    //             async: false,
    //             success: function (result) {
    //                 $('.mail-popup__wrapper').css('display', 'flex').addClass('visible success');
    //                 $('.mail-popup').show(300);
    //                 $('.mail-popup__success').show(300);
    //                 console.log(this);
    //                 e.prevent
    //             },
    //             error: function (result) {
    //                 $('.mail-popup__wrapper').css('display', 'flex').addClass('visible error');
    //                 $('.mail-popup').show(300);
    //                 $('.mail-popup__error').show(300);
    //             }
    //         });
    //     } else {
    //         $('.mail-popup__wrapper').css('display', 'flex').addClass('visible error');
    //         $('.mail-popup').show(300);
    //         $('.mail-popup__error').show(300);
    //     }
    //
    //     setTimeout(removePopup, 3000);
    //
    //
    // });


    // =================================================== form ===================================================


    // =================================================== header ===================================================


    function stickyHead() {
        if ($(window).scrollTop() > 1) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }
    }

    stickyHead();

    $(window).scroll(function () {
        stickyHead();
    });


    $('.first-block').css('padding-top', $('header').outerHeight());

    // =================================================== header ===================================================


    // =================================================== svg fill ===================================================
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    // ===================================================  product item click @watch@ ===================================================


    $('.product__item .button-invite').on('click', function (e) {

        e.preventDefault();


        $('.product__item').not($(this).closest('.product__item')).removeClass('active').addClass('invisible-block');

        if (!$(this).closest('.product__item').hasClass('active')) {
            $(this).closest('.product__item').removeClass('invisible-block');
            $(this).closest('.product__item').addClass('active');
        } else {
            $(this).closest('.product__item').removeClass('active');
            $('.product__item').removeClass('invisible-block');
        }


    });

    // =================================================== product item click @watch@ ===================================================


    // =================================================== whitelist ===================================================

    $('.whitelist').on('click', function (e) {

        e.preventDefault();
        $('body').addClass('modal-open');
        $('.whitelist__form__wrapper').addClass('active');

    });


    $('.whitelist__cross').on('click', function (e) {

        e.preventDefault();

        $('body').removeClass('modal-open');
        $('.whitelist__form__wrapper').removeClass('active');

    });


    // =================================================== whitelist ===================================================


});

