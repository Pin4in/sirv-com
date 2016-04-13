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

        var sidebaToggle = $('.sidebar-toggle');
        var offcanvasSidebar = $('.off-canvas-sidebar');
        var overflow = $('.overflow');

        $(sidebaToggle).on('click' , function() {
            classy.toggle($(offcanvasSidebar), 'on');
            $(overflow).toggleClass('show');
        });


        $(overflow).on('click', function () {
            classy.toggle($(offcanvasSidebar), 'on');
            $(this).toggleClass('show');
        });

  }
)();
