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

        var nav = $('.main-nav');
        var navClasses = 'bg-white';

        $(window).on('scroll' , function() {

            var scrolled = $(window).scrollTop();
            // navbar transparent to light

            if(scrolled > 100) {
                classy.add(nav, navClasses);
            }else {
                classy.remove(nav, navClasses);
            }


        });

        var mobileMenuToggle = $('.navbar-toggle');
        var menu = $('.navigation')
        var mobileMenuActiveClass = 'navigation--mobile'
        $(mobileMenuToggle).on('click' , function() {
            classy.toggle($(menu), mobileMenuActiveClass)
        });


  }
)();
