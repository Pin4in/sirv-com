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

        $(window).on('scroll' , function() {

            var scrolled = $(window).scrollTop();
            // navbar transparent to light

            if(scrolled > 100) {
                classy.add(nav, fixedHeaderClass);
            }else {
                classy.remove(nav, fixedHeaderClass);
            }


        });

        var mobileMenuToggle = $('.mobile-menu-toggle');
        var menu = $('.header__nav-wrapper');
        var mobileMenuActiveClass = 'open';
        var overflow = $('.overflow');

        $(mobileMenuToggle).on('click' , function() {
            classy.toggle($(menu), mobileMenuActiveClass);
            $(overflow).toggleClass('show');
        });


        var sidebaToggle = $('.sidebar-toggle');
        var offcanvasSidebar = $('.page-wrapper--has-sidebar');

        $(sidebaToggle).on('click' , function() {
            classy.toggle($(offcanvasSidebar), 'on');
            // $(overflow).toggleClass('show');
        });


        $(overflow).on('click', function () {
            classy.toggle($(menu), mobileMenuActiveClass);
            $(this).toggleClass('show');
        });

  }
)();
