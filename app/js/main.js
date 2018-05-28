"use strict";
$( document ).ready(function() {
    // =================================================== progressbar ===================================================
    // on page load...
    moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {;
        var getPercent = ($('.custom__progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.custom__progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2000;

        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.custom__progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }
    // =================================================== progressbar ===================================================

});
