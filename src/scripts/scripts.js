'use strict';

(
    function main() {

        var classy = {
            add: function(target, classes) {
                $(target).addClass(classes);
            },
            remove: function(target, classes) {
                $(target).removeClass(classes);
            },
            toggle: function(target, classes) {
                $(target).toggleClass(classes);
            }
        }

        var nav = $('.header');
        var fixedHeaderClass = 'header--fixed';
        // var offCanvasContent = '.off-canvas-content'
        $(window).on('scroll' , function() {

            var scrolled = $(window).scrollTop();
            console.log(scrolled);
            // navbar transparent to light
            if(scrolled > 100) {
                classy.add(nav, fixedHeaderClass);
            }else {
                classy.remove(nav, fixedHeaderClass);
            }


        });

        var offCanvasWrapper = $('.off-canvas-wrapper');
        var offCanvasMenu = $('.off-canvas-menu');
        var mobileMenuToggle =$('.mobile-menu-toggle');
        var toggleMenuClass = 'on';
        var overflow = $('.overflow');

        $(mobileMenuToggle).on('click' , function() {
            classy.toggle($(offCanvasWrapper), toggleMenuClass);
            $(overflow).toggleClass('show');
        });

        $(overflow).on('click', function () {
            classy.toggle($(offCanvasWrapper), toggleMenuClass);
            $(this).toggleClass('show');
        });

  }
)();
