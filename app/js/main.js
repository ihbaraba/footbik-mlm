"use strict";
$(document).ready(function () {
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

    $('.tab-content > .tab-pane.fade').each(function () {
        if ($(this).hasClass('active')) {
            $(this).addClass('firstt');
            $('.tab-content > .tab-pane.fade').addClass('active');
            $('.clubs__slider').owlCarousel({
                items: 1,
                nav: true,
                margin: 0,
                navText: ["<img src='../img/ar2.png'>", "<img src='../img/ar.png'>"],
                dots: false
            });
            $(this).closest('.tab-content').find('.tab-pane').removeClass('active');
            $(this).closest('.tab-content').find('.tab-pane.firstt').addClass('active in');
        }
    });

    $('.stages__slider').owlCarousel({
        items: 5,
        nav: true,
        navText: ["<img src='../img/ar2.png'>", "<img src='../img/ar.png'>"],
        dots: false
    });

    $('.news__slider').owlCarousel({
        items: 3,
        // nav: true,
        // arrows: false,
        margin: 0,
        dotsEach: true,
        dots: true
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

        humanSingle.removeClass('active');
        human.removeClass('active');

        $('.team__human[data-id="' + index + '"]').addClass('active');
        $('.team__item[data-id="' + index + '"]').addClass('active');

    });

    // =================================================== team logic ===================================================


    // =================================================== dropdown logic ===================================================

    $(document).on('click', '.faq__item', function (e) {

        $('.faq__item').not($(this)).removeClass('active');

        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }

    });

    // =================================================== dropdown logic ===================================================


    // =================================================== form ===================================================

    $(document).on('click', '.contact__form button', function (e) {
        e.preventDefault();
        console.log('test');
    });


    // =================================================== form ===================================================


});
