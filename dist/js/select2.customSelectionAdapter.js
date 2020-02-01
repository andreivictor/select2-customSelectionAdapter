/*!
 * select2-customselectionadapter v1.0.0 - An implementation of a custom selection adapter for the Select2 plugin (multiple mode). Displays the selected tags into a separate section, leaving the search box empty.
 * Copyright (c) 2020 Andrei Victor Bulearca - https://github.com/andreivictor/select2-customSelectionAdapter#readme
 * License: MIT
 */

$.fn.select2.amd.define('select2/selection/customSelectionAdapter',
  [
    'jquery',
    'select2/selection/base',
    'select2/selection/eventRelay',
    'select2/utils',
  ], function ($, BaseSelection, EventRelay, Utils) {

    function CustomSelection ($element, options) {
      CustomSelection.__super__.constructor.apply(this, arguments);

      this.options = options;
    }

    Utils.Extend(CustomSelection, BaseSelection);

    CustomSelection.prototype.render = function () {
      var $selection = CustomSelection.__super__.render.call(this);

      $selection.addClass('select2-selection--multiple select2-selection--multiple--custom');

      $selection.html(
        '<ul class="select2-selection__rendered"></ul>'
      );

      // define the container for the tags
      this.$selectionTagsContainer = $(
        '<div class="select2-container"></div>'
      );

      this.$selectionTagsContainer.addClass('select2-container--custom-selection select2-container--' + this.options.get('theme'));

      this.$selectionTags = $selection.clone().addClass('select2-selection--custom');

      this.$selectionTagsContainer.html(this.$selectionTags);

      this.$selectionTagsContainer.addClass('select2-container--empty');

      if (this.options.get('selectionContainer')) {
        this.$selectionTagsContainer.appendTo(this.options.get('selectionContainer'));
      } else {
        this.$selectionTagsContainer.insertAfter(this.$element.next('.select2'));
      }

      return $selection;
    };

    CustomSelection.prototype.bind = function (container, $container) {
      var self = this;

      CustomSelection.__super__.bind.apply(this, arguments);

      this.$selection.on('click', function (evt) {
        self.trigger('toggle', {
          originalEvent: evt
        });
      });

      this.$selectionTags.on(
        'click',
        '.select2-selection__choice__remove',
        function (evt) {
          // Ignore the event if it is disabled
          if (self.options.get('disabled')) {
            return;
          }

          var $remove = $(this);
          var $selection = $remove.parent();

          var data = $selection.data('data');

          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        }
      );

      container.on('enable', function () {
        self.$selectionTagsContainer.removeClass('select2-container--disabled');
      });

      container.on('disable', function () {
        self.$selectionTagsContainer.addClass('select2-container--disabled');
      });
    };

    CustomSelection.prototype.clear = function () {
      this.$selectionTagsContainer.addClass('select2-container--empty');
      // we need this line to remove the existing .select2-selection__clear button
      this.$selection.find('.select2-selection__rendered').empty();
      this.$selectionTags.find('.select2-selection__rendered').empty();
    };

    CustomSelection.prototype.display = function (data, container) {
      var template = this.options.get('templateSelection');
      var escapeMarkup = this.options.get('escapeMarkup');

      return escapeMarkup(template(data, container));
    };

    CustomSelection.prototype.selectionContainer = function () {
      var $container = $(
        '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
        '&times;' +
        '</span>' +
        '</li>'
      );

      return $container;
    };

    CustomSelection.prototype.update = function (data) {
      this.clear();

      if (data.length === 0) {
        return;
      }
      
      this.$selectionTagsContainer.removeClass('select2-container--empty');

      var $selections = [];

      for (var d = 0; d < data.length; d++) {
        var selection = data[d];

        var $selection = this.selectionContainer();
        var formatted = this.display(selection, $selection);

        $selection.append(formatted);
        $selection.prop('title', selection.title || selection.text);

        $selection.data('data', selection);

        $selections.push($selection);
      }

      var $rendered = this.$selectionTags.find('.select2-selection__rendered');

      Utils.appendMany($rendered, $selections);

      // Re-append placeholder
      if (this.placeholder && this.placeholder.text) {
        this.$search.attr('placeholder', this.placeholder.text);
      }
    };

    // Decorate after the adapter is built
    return Utils.Decorate(CustomSelection, EventRelay);
  }
);

// Extend 'select2/defaults'
//
(function() {

  var Defaults = $.fn.select2.amd.require('select2/defaults');
  var Placeholder = $.fn.select2.amd.require('select2/selection/placeholder');
  var AllowClear = $.fn.select2.amd.require('select2/selection/allowClear');
  var SelectionSearch = $.fn.select2.amd.require('select2/selection/search');
  var Utils = $.fn.select2.amd.require('select2/utils');

  // parent method - apply
  var _defaultApply = Defaults.apply;

  Defaults.apply = function (options) {

    if (options.selectionAdapter) {
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }
      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        SelectionSearch
      );
      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }
    }

    // invoke parent method
    return _defaultApply.apply(this, arguments);
  }

})();
