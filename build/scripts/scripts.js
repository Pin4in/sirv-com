"use strict";!function(){var o={add:function(o,e){$(o).addClass(e)},remove:function(o,e){$(o).removeClass(e)},toggle:function(o,e){$(o).toggleClass(e)}},e=$(".header"),n="header--fixed";$(window).on("scroll",function(){var l=$(window).scrollTop();console.log(l),l>100?o.add(e,n):o.remove(e,n)});var l=$(".off-canvas-wrapper"),s=($(".off-canvas-menu"),$(".mobile-menu-toggle")),a="on",c=$(".overflow");$(s).on("click",function(){o.toggle($(l),a),$(c).toggleClass("show")}),$(c).on("click",function(){o.toggle($(l),a),$(this).toggleClass("show")})}();