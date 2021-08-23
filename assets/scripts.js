$(function () {
    $(window).load(function () {
        $('body').addClass('loaded');
    })

    // Mobile nav open/close
    $('.mobileNav').find('.menuTrigger').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('is-active');
        $('#mainNav').slideToggle();
    });

    // Move topNav items
    $(window).bind('load resize orientationchange', function () {
        if (Modernizr.mq('only screen and (min-width: 992px)')) {
            //desktop
            $("#nav .topNavItem").detach().appendTo("#topNav ul");
        }
        if (Modernizr.mq('only screen and (max-width: 991px)')) {
            //tablet
            $("#topNav .topNavItem").detach().insertAfter("#nav li:nth-last-child(2)");
        }
    })

    /*==========================================================
    SCROLL - STICKY NAV / TUCK
    ==========================================================*/

    var lastScrollTop = 0;
    var deltaDown = 30; // determines when the nav shrinks, when scrolling down
    var deltaUp = 30; // determines when the nav grows back, when scrolling up

    $(window).scroll(function (event) {

        // Detect scroll position
        var st = $(this).scrollTop();

        // If user has scrolled down
        if (st == lastScrollTop) {
            return;
        } else if (st > lastScrollTop && lastScrollTop >= 0) {
            $("html").removeClass("scrollingUp");

            // Ready to shrink nav if user scrolled down far enough
            if (st > deltaDown) {
                $("html").addClass("scrollingDownward").addClass("scrolling"); // 'scrollingDown' class created mobile double click issue - not sure why, but 'scrollingDownward' works
            }

        } else {

            // User has started to scroll up
            $("html").removeClass("scrollingDownward").addClass("scrollingUp").addClass("scrolling");

        }

        lastScrollTop = st;

        // Detect if hit top of page
        if (st <= deltaUp) {
            $("html").removeClass("scrolling").addClass("hitTop").removeClass("scrollingUp");
        } else {
            $("html").removeClass("hitTop");
        }

    });
});


/*==========================================================
BROWSER DETECTION SCRIPT
==========================================================*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function (jQuery) {
    "use strict";

    function uaMatch(ua) {
        if (ua === undefined) {
            ua = window.navigator.userAgent;
        }
        ua = ua.toLowerCase();

        var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(iemobile)[\/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || /(playbook)/.exec(ua) || /(bb)/.exec(ua) || /(blackberry)/.exec(ua) || [];

        var browser = {},
            matched = {
                browser: match[5] || match[3] || match[1] || "",
                version: match[2] || match[4] || "0",
                versionNumber: match[4] || match[2] || "0",
                platform: platform_match[0] || ""
            };

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
            browser.versionNumber = parseInt(matched.versionNumber, 10);
        }

        if (matched.platform) {
            browser[matched.platform] = true;
        }

        if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"]) {
            browser.mobile = true;
        }

        if (browser.cros || browser.mac || browser.linux || browser.win) {
            browser.desktop = true;
        }

        if (browser.chrome || browser.opr || browser.safari) {
            browser.webkit = true;
        }

        if (browser.rv || browser.iemobile) {
            var ie = "msie";
            matched.browser = ie;
            browser[ie] = true;
        }

        if (browser.edge) {
            delete browser.edge;
            var msedge = "msedge";
            matched.browser = msedge;
            browser[msedge] = true;
        }

        if (browser.safari && browser.blackberry) {
            var blackberry = "blackberry";
            matched.browser = blackberry;
            browser[blackberry] = true;
        }

        if (browser.safari && browser.playbook) {
            var playbook = "playbook";
            matched.browser = playbook;
            browser[playbook] = true;
        }

        if (browser.bb) {
            var bb = "blackberry";
            matched.browser = bb;
            browser[bb] = true;
        }

        if (browser.opr) {
            var opera = "opera";
            matched.browser = opera;
            browser[opera] = true;
        }

        if (browser.safari && browser.android) {
            var android = "android";
            matched.browser = android;
            browser[android] = true;
        }

        if (browser.safari && browser.kindle) {
            var kindle = "kindle";
            matched.browser = kindle;
            browser[kindle] = true;
        }

        if (browser.safari && browser.silk) {
            var silk = "silk";
            matched.browser = silk;
            browser[silk] = true;
        }

        browser.name = matched.browser;
        browser.platform = matched.platform;
        return browser;
    }

    window.jQBrowser = uaMatch(window.navigator.userAgent);
    window.jQBrowser.uaMatch = uaMatch;

    if (jQuery) {
        jQuery.browser = window.jQBrowser;
    }

    return window.jQBrowser;
}));


$(function () {
    if ($.browser.name == 'msie') {
        $('html').addClass('ie');
    }
    if ($.browser.name == 'msedge') {
        $('html').addClass('msedge');
    }
    if ($.browser.name == 'opera') {
        $('html').addClass('opera');
    }
    if ($.browser.name == 'mozilla') {
        $('html').addClass('moz');
    }
    if ($.browser.name == 'safari') {
        $('html').addClass('safari');
    }
    if ($.browser.name == 'chrome') {
        $('html').addClass('chrome');
    }
});