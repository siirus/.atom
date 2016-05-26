(function() {
  var CompositeDisposable, CursorModel, Emitter, RulerManager, RulerView, _ref;

  _ref = require('atom'), Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable;

  CursorModel = require('./cursor-model.coffee');

  RulerView = require('./ruler-view.coffee');

  module.exports = RulerManager = (function() {
    RulerManager.prototype.subscriptions = null;

    RulerManager.prototype.emitter = null;

    function RulerManager() {
      this.subscriptions = new CompositeDisposable;
      this.emitter = new Emitter;
      this.models = [];
      this.initialize();
      this.handleEvents();
    }

    RulerManager.prototype.initialize = function() {
      return atom.views.addViewProvider(CursorModel, function(model) {
        return new RulerView().initialize(model);
      });
    };

    RulerManager.prototype.handleEvents = function() {
      return this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this.subscriptions.add(editor.observeCursors(function(cursor) {
            return new CursorModel(_this, cursor);
          }));
        };
      })(this)));
    };

    RulerManager.prototype.onDidDestroy = function(fn) {
      return this.emitter.on('did-destroy', fn);
    };

    RulerManager.prototype.destroy = function() {
      this.subscriptions.dispose();
      this.subscriptions = null;
      this.emitter.emit('did-destroy');
      this.emitter.dispose();
      return this.emitter = null;
    };

    return RulerManager;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9ydWxlcnovbGliL3J1bGVyLW1hbmFnZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdFQUFBOztBQUFBLEVBQUEsT0FBaUMsT0FBQSxDQUFRLE1BQVIsQ0FBakMsRUFBQyxlQUFBLE9BQUQsRUFBVSwyQkFBQSxtQkFBVixDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFpQyxPQUFBLENBQVEsdUJBQVIsQ0FEakMsQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBaUMsT0FBQSxDQUFRLHFCQUFSLENBRmpDLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMkJBQUEsYUFBQSxHQUFlLElBQWYsQ0FBQTs7QUFBQSwyQkFDQSxPQUFBLEdBQVMsSUFEVCxDQUFBOztBQUdhLElBQUEsc0JBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFpQixHQUFBLENBQUEsT0FEakIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQUQsR0FBaUIsRUFGakIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUhBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FKQSxDQURXO0lBQUEsQ0FIYjs7QUFBQSwyQkFVQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBRVYsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFYLENBQTJCLFdBQTNCLEVBQXdDLFNBQUMsS0FBRCxHQUFBO2VBQ2xDLElBQUEsU0FBQSxDQUFBLENBQVcsQ0FBQyxVQUFaLENBQXVCLEtBQXZCLEVBRGtDO01BQUEsQ0FBeEMsRUFGVTtJQUFBLENBVlosQ0FBQTs7QUFBQSwyQkFnQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUNaLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFmLENBQWtDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtpQkFDbkQsS0FBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLE1BQU0sQ0FBQyxjQUFQLENBQXNCLFNBQUMsTUFBRCxHQUFBO21CQUNuQyxJQUFBLFdBQUEsQ0FBWSxLQUFaLEVBQWUsTUFBZixFQURtQztVQUFBLENBQXRCLENBQW5CLEVBRG1EO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsQ0FBbkIsRUFEWTtJQUFBLENBaEJkLENBQUE7O0FBQUEsMkJBcUJBLFlBQUEsR0FBYyxTQUFDLEVBQUQsR0FBQTthQUNaLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLGFBQVosRUFBMkIsRUFBM0IsRUFEWTtJQUFBLENBckJkLENBQUE7O0FBQUEsMkJBeUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFEakIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsYUFBZCxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUFBLENBSEEsQ0FBQTthQUlBLElBQUMsQ0FBQSxPQUFELEdBQVcsS0FMSjtJQUFBLENBekJULENBQUE7O3dCQUFBOztNQU5GLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/mbulgako/.atom/packages/rulerz/lib/ruler-manager.coffee
