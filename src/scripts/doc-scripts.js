'use strict';

(function main() {

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

    // setup ScrollSpy
    var scrollspy = '#articles-scrollspy';
    var scrollspyNav = '#scrollspy-nav';

    $(scrollspy).scrollspy({ target: scrollspyNav, offset: 100 });


    // Open dropdown when an active element inside of it
    // add or remove .active class on dropdown toggler to highlight correct
    // element
    var sidebarDropdownControl = function() {
        var self = {
            scrollSpyNav: '#scrollspy-nav',
            dropdown: '.dropdown',
            dropdownToggler: '.dropdown-toggle',
            dropdownIsOpen: false,
            fakeLinkClass: 'activate-dropdown-toggle',

            init: function() {
                if($(self.scrollSpyNav).length) {
                    self.listenScrollspyActivate();

                    self.preventCloseParentMenu();
                }
            },

            listenScrollspyActivate: function() {

                var $dropdownArray;

                $(window).on("activate.bs.scrollspy", function(){
                    $dropdownArray = $(self.scrollSpyNav + ' ' + self.dropdown);

                    $.each($dropdownArray, function(i, dropdown) {

                        // open correct droppdown only if it has active child
                        if($(dropdown).find('.dropdown-menu .active').length) {
                            self.openDropdown(dropdown);
                        } else {
                            self.closeDropdown(dropdown);
                        }

                        // remove Highlight from dropdown toggler if it is not
                        // current scrollspy
                        if(!$(dropdown).find('.activate-dropdown-toggle.active').length) {
                            self.removeTogglerHightlight(dropdown);
                        }
                    });

                });
            },

            openDropdown: function(dropdown) {
                $(dropdown).addClass('open');
            },

            closeDropdown: function(dropdown) {
                $(dropdown).removeClass('open');
            },

            // remove active class on .dropdown-toggle when
            removeTogglerHightlight: function(elem) {
                $(elem).find(self.dropdownToggler).removeClass('active');
            },

            preventCloseParentMenu: function() {
                $(self.scrollSpyNav + ' .dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
                    // Avoid following the href location when clicking
                    event.preventDefault();
                    // Avoid having the menu to close when clicking
                    event.stopPropagation();
                    // Re-add .open to parent sub-menu item
                    $(this).parent().toggleClass('open');
                });
            },

        }

        return self;
    }

    sidebarDropdownControl().init();

    // keep dropdown open
    $('.sidebar-nav .dropdown-item').click(function(e) {
        e.stopPropagation();
    });


    // folow the link on dropdown toggle click
    $('.sidebar-nav .dropdown-toggle').click(function() {

        var path = window.location.pathname;
        var hash = $(this).attr('data-link');

        window.location.href = path + hash;

    });

})();
