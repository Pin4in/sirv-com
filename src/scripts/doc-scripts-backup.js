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
            initID: '#scrollspy-nav',
            $dropdown: false,
            dropdownIsOpen: false,
            $activeItem: false,
            fakeLinkClass: 'activate-dropdown-toggle',

            init: function() {
                if($(self.initID)) {
                    self.listenScrollspyActivate();
                }
            },

            listenScrollspyActivate: function() {

                $(window).on("activate.bs.scrollspy", function(){
                    self.$activeItem = $(scrollspyNav).find('.active');
                    self.$dropdown = $(self.$activeItem).parent('.dropdown');
                    if(self.$dropdown.length && !self.$dropdown.hasClass('open')) {
                        self.openDropdown();
                    }

                    if(!self.$dropdown.length && self.dropdownIsOpen) {
                        console.log('hello?')
                        self.closeDropdown(false);
                    }

                    $.each(self.$dropdown, function(i, dropdown) {

                        if(!$(dropdown).find('.dropdown-menu .active').length) {
                            self.closeDropdown(dropdown);

                        }
                    });

                    // self.dropdownToggleClassControll();

                });
            },

            openDropdown: function() {
                // $(self.$dropdown).find('.dropdown-menu').dropdown('toggle');
                $(self.$dropdown).addClass('open');
                self.dropdownIsOpen = true;
            },

            closeDropdown: function(dropdown) {
                console.log(dropdown)
                if(dropdown) {
                    $(dropdown).removeClass('open');
                } else {
                    $('.dropdown.open').removeClass('open');
                }
                // $('.dropdown.open').find('.dropdown-menu').dropdown('toggle');
                self.dropdownIsOpen = false;
            },

            // Add(remove) active class on .dropdown-toggle when
            // the scrollspy activate(deactivate) fakelink

            dropdownToggleClassControll: function() {
                if (self.$activeItem.hasClass(self.fakeLinkClass)) {
                    self.addActiveClass();
                }

                if(self.$activeItem.length > 1 && !self.$activeItem.hasClass(self.fakeLinkClass)) {
                    self.removeActiveClass();
                }
            },

            addActiveClass: function () {
                self.$dropdown.children('.dropdown-toggle').addClass('active');
                console.log(self.$dropdown);
                console.log(self.$dropdown.children('.dropdown-toggle'));
            },

            removeActiveClass: function() {
                $('.dropdown-toggle.active').removeClass('active');
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

    })


})();
