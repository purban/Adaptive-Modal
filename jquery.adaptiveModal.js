/* Copyright (c) 2012 Pierre Urban - www.qualiptive.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * ##################
 * PLUGIN INFORMATION
 * ##################
 * Name: Adaptive Modal
 * Description: Adaptive Modal is a jQuery plugin to display multiple modal windows
 * Author: Pierre Urban
 * Licence: MIT (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.1
 * More: based from http://docs.jquery.com/Plugins/Authoring
 */

;(function ($) {

  var pluginName = 'adaptiveModal';

  var methods = {
    init : function (options) {

      // Extend default settings with options parameter
      var settings = $.extend({
            name : 'adaptive-modal',
            duration : 150,
            opacity: 0.8
          }, options),
          overlay = $('<div id="' + settings.name + '-overlay"></div>'),
          modal = $('<div id="' + settings.name + '-window"><div id="' + settings.name + '-content"></div></div>');

      // Append the overlay, set its opacity, hide it, bind to it a click event to close the modal
      $('body').append(
        overlay.css('opacity', settings.opacity)
          .hide()
          .click(function (e) {
            closeModal(modal, overlay, settings);
          })
      );
      // Append the modal and hide it
      $('body').append(
        modal.hide()
      );

      // Return 'this' for chaining
      return this.each(function () {

        var $this = $(this),
            data = $this.data(pluginName);

        // If the plugin hasn't been initialized yet it creates the data
        if (!data) {
          data = $this.data(pluginName, {
            settings : settings,
            overlay : overlay,
            modal : modal
          });
        };
        data = $this.data(pluginName);

        // Bind a click event
        $this.bind('click.' + pluginName, function (e) {
          e.preventDefault();

          // Display overlay
          overlay.fadeIn(150);

          // Insert the corresponding content and display modal: 1) retrieve the modal content div
          var modal_content = modal.find('#' + settings.name + '-content');
          // Empty modal content div
          modal_content.empty();
          // Move the concerned element inside the modal content div
          $('.' + settings.name + '[data-' + settings.name  + '-id="' + $(this).attr('data-' + settings.name + '-id') + '"]').removeClass(settings.name).appendTo(modal_content);
          modal.fadeIn(150);
          $('html, body').animate({scrollTop:0}, 'slow');
          $('.' + settings.name + '-close').click(function (e) {
            e.preventDefault();
            closeModal(modal, overlay, settings);
          });
        });

        // Events management sample:
        $(document).bind('keydown.' + pluginName, { pluginData : data }, keydownManagement);
      });
    },
    destroy : function () {
      return this.each(function (){

        var $this = $(this),
            data = $this.data(pluginName);

        $this.removeData(pluginName);

        $(window).unbind('.' + pluginName);
      })
    }
  };

  var keydownManagement = function (e) {
    // Escape key
    if (e.keyCode == 27) {
      closeModal(e.data.pluginData.modal, e.data.pluginData.overlay, e.data.pluginData.settings);
    };
  },
  closeModal = function (modal, overlay, settings) {
    var modalTmp = modal.find('[data-' + settings.name  + '-id]');

    modal.fadeOut(settings.duration, function () {
      modalTmp.addClass(settings.name);
      $('[data-' + settings.name  + '-id="' + modalTmp.attr('data-' + settings.name + '-id') + '"]').not(modalTmp).after(modalTmp);
    });
    overlay.fadeOut(settings.duration);
  };

  $.fn[pluginName] = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.' + pluginName);
    }
  };
})(jQuery);
