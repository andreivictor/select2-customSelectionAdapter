// Extend 'select2/defaults'
//
(function() {

  var Defaults = $.fn.select2.amd.require('select2/defaults');
  var Placeholder = $.fn.select2.amd.require('select2/selection/placeholder');
  var AllowClear = $.fn.select2.amd.require('select2/selection/allowClear');
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
