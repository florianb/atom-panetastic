(function() {
  var $, Panetastic, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), View = _ref.View, $ = _ref.$;

  Panetastic = (function(_super) {
    __extends(Panetastic, _super);

    function Panetastic() {
      this.destroy = __bind(this.destroy, this);
      this.toggle = __bind(this.toggle, this);
      this.isVisible = __bind(this.isVisible, this);
      this.resizeView = __bind(this.resizeView, this);
      this.resizeStopped = __bind(this.resizeStopped, this);
      this.resizeStarted = __bind(this.resizeStarted, this);
      return Panetastic.__super__.constructor.apply(this, arguments);
    }

    Panetastic.content = function(params) {
      return this.div({
        "class": 'panetastic'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'resize-handle',
            style: "text-align: center; background: -webkit-linear-gradient(top, rgb(67, 72, 77), rgb(43, 47, 50))",
            outlet: 'resizeHandle'
          }, function() {
            return _this.span({
              "class": 'icon icon-primitive-dot'
            });
          });
          return _this.subview('subview', new params.view(params.params));
        };
      })(this));
    };

    Panetastic.prototype.initialize = function(params) {
      if (params.active == null) {
        params.active = true;
      }
      this.active = params.active;
      this.size = params.size;
      this.resized = false;
      return this.on('mousedown', '.resize-handle', (function(_this) {
        return function(e) {
          return _this.resizeStarted(e);
        };
      })(this));
    };

    Panetastic.prototype.resizeStarted = function() {
      if (!this.resized) {
        this.resized = true;
      }
      $(document.body).on('mousemove', this.resizeView);
      return $(document.body).on('mouseup', this.resizeStopped);
    };

    Panetastic.prototype.resizeStopped = function() {
      $(document.body).off('mousemove', this.resizeView);
      return $(document.body).off('mouseup', this.resizeStopped);
    };

    Panetastic.prototype.resizeView = function(_arg) {
      var pageY;
      pageY = _arg.pageY;
      this.height($(document.body).height() - pageY);
      if (this.resizeHandle.height() > this.height()) {
        return this.height(this.resizeHandle.height());
      }
    };

    Panetastic.prototype.isVisible = function() {
      return this.hasParent();
    };

    Panetastic.prototype.toggle = function() {
      var newSize;
      if (this.isVisible()) {
        return this.detach();
      } else {
        if (this.active) {
          atom.workspace.addBottomPanel({
            item: this,
            visible: true
          });
          newSize = this.size || ($(document.body).height() / 3);
          if (!this.resized) {
            return this.height(newSize);
          }
        }
      }
    };

    Panetastic.prototype.destroy = function() {
      try {
        this.subview.destroy();
      } catch (_error) {}
      return this.remove();
    };

    return Panetastic;

  })(View);

  module.exports = Panetastic;

}).call(this);
