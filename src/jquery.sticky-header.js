/*
 *  Project: Auto-Hide Sticky Header
 *  Description: This creates a header that will automaticly appear and disappear
 *  Author: Jasper Boeijenga
 *  License: MIT
 */

;(function ( $, window, undefined ) {

	// Create the defaults once
	var pluginName = 'stickyHeader',
		document = window.document,
		defaults = {
			scrollClass : 'scroll',
			hiddenClass : 'hidden'
		};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.$element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		if(this.options.scrollHeight !== undefined){
			this.options.height = this.$element.height();
		}
		

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function(){
		var position = 0;
		var _this = this;

		$(window).scroll(function(e) {
			var scrollTop = $(window).scrollTop();
			if( scrollTop <= 0 ) { 
				_this.show();
				_this.removeScroll();
			} else if( scrollTop < position ) {
				_this.show();
			} else if( scrollTop > position ) {
				_this.setScroll();
				if( scrollTop + $(window).height() >= $(document).height() - _this.$element.height() ){
					_this.show();
				} else {
					_this.hide();
				}
			}
			position = scrollTop;
		});
	};

	Plugin.prototype.setScroll = function(){
		return this.$element.addClass(this.options.scrollClass);
	};

	Plugin.prototype.removeScroll = function(){
		return this.$element.removeClass(this.options.scrollClass);
	};

	Plugin.prototype.hide = function(){
		return this.$element.addClass(this.options.hiddenClass);
	};

	Plugin.prototype.show = function(){
		return this.$element.removeClass(this.options.hiddenClass);
	};

	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, new Plugin( this, options ));
			}
		});
	};

}(jQuery, window));