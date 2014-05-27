(function() {
  var $, Panetastic, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), View = _ref.View, $ = _ref.$;

  Panetastic = (function(_super) {
    __extends(Panetastic, _super);

    function Panetastic() {
      this.toggle = __bind(this.toggle, this);
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
            "class": 'resize-handle'
          }, {
            style: 'text-align: center;\nbackground:\n-webkit-linear-gradient(top, rgb(67, 72, 77), rgb(43, 47, 50));'
          }, function() {}, _this.span({
            "class": 'icon icon-primitive-dot'
          }));
          return _this.subview('contentView', params.contentView);
        };
      })(this));
    };

    Panetastic.prototype.initialize = function(params) {
      this.active = true;
      this.resized = false;
      this.visible = false;
      this.size = params.size || ($(document.body).height() / 3);
      this.on('mousedown', '.resize-handle', (function(_this) {
        return function(e) {
          return _this.resizeStarted(e);
        };
      })(this));
      return atom.themes.requireStyleSheet();
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
      return this.height($(document.body).height() - pageY);
    };

    Panetastic.prototype.toggle = function() {
      if (this.hasParent()) {
        this.visible = false;
        return this.detach();
      } else {
        if (this.active) {
          this.visible = true;
          atom.workspaceView.appendToBottom(this);
          if (!this.resized) {
            return this.height(this.size);
          }
        }
      }
    };

    return Panetastic;

  })(View);

  module.exports = Panetastic;

}).call(this);
