(function() {
  var CompositeDisposable, CursorModel, Emitter, _ref;

  _ref = require('atom'), Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable;

  module.exports = CursorModel = (function() {
    CursorModel.prototype.subscriptions = null;

    CursorModel.prototype.emitter = null;

    CursorModel.prototype.manager = null;

    CursorModel.prototype.cursor = null;

    function CursorModel(manager, cursor) {
      this.subscriptions = new CompositeDisposable;
      this.emitter = new Emitter;
      this.manager = manager;
      this.cursor = cursor;
      this.initialize();
      this.subscribe();
    }

    CursorModel.prototype.initialize = function() {
      return atom.views.getView(this);
    };

    CursorModel.prototype.getCursor = function() {
      return this.cursor;
    };

    CursorModel.prototype.subscribe = function() {
      this.subscriptions.add(this.manager.onDidDestroy(this.destroy.bind(this)));
      this.subscriptions.add(this.cursor.onDidDestroy(this.destroy.bind(this)));
      return this.subscriptions.add(this.cursor.onDidChangePosition(this.change.bind(this)));
    };

    CursorModel.prototype.onDidChange = function(fn) {
      return this.emitter.on('did-change', fn);
    };

    CursorModel.prototype.onDidDestroy = function(fn) {
      return this.emitter.on('did-destroy', fn);
    };

    CursorModel.prototype.change = function(event) {
      return this.emitter.emit('did-change', event.newScreenPosition);
    };

    CursorModel.prototype.destroy = function() {
      this.subscriptions.dispose();
      this.emitter.emit('did-destroy');
      return this.emitter.dispose();
    };

    return CursorModel;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9ydWxlcnovbGliL2N1cnNvci1tb2RlbC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsK0NBQUE7O0FBQUEsRUFBQSxPQUFpQyxPQUFBLENBQVEsTUFBUixDQUFqQyxFQUFDLGVBQUEsT0FBRCxFQUFVLDJCQUFBLG1CQUFWLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMEJBQUEsYUFBQSxHQUFlLElBQWYsQ0FBQTs7QUFBQSwwQkFDQSxPQUFBLEdBQVMsSUFEVCxDQUFBOztBQUFBLDBCQUVBLE9BQUEsR0FBUyxJQUZULENBQUE7O0FBQUEsMEJBR0EsTUFBQSxHQUFRLElBSFIsQ0FBQTs7QUFLYSxJQUFBLHFCQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBaUIsR0FBQSxDQUFBLE9BRGpCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxPQUFELEdBQWlCLE9BRmpCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxNQUFELEdBQWlCLE1BSGpCLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FKQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBTEEsQ0FEVztJQUFBLENBTGI7O0FBQUEsMEJBYUEsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUVWLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFuQixFQUZVO0lBQUEsQ0FiWixDQUFBOztBQUFBLDBCQWtCQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBQyxDQUFBLE9BRFE7SUFBQSxDQWxCWCxDQUFBOztBQUFBLDBCQXNCQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQWQsQ0FBdEIsQ0FBbkIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQWQsQ0FBckIsQ0FBbkIsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxNQUFNLENBQUMsbUJBQVIsQ0FBNEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUE1QixDQUFuQixFQUhTO0lBQUEsQ0F0QlgsQ0FBQTs7QUFBQSwwQkEyQkEsV0FBQSxHQUFhLFNBQUMsRUFBRCxHQUFBO2FBQ1gsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksWUFBWixFQUEwQixFQUExQixFQURXO0lBQUEsQ0EzQmIsQ0FBQTs7QUFBQSwwQkE4QkEsWUFBQSxHQUFjLFNBQUMsRUFBRCxHQUFBO2FBQ1osSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksYUFBWixFQUEyQixFQUEzQixFQURZO0lBQUEsQ0E5QmQsQ0FBQTs7QUFBQSwwQkFrQ0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxHQUFBO2FBQ04sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsWUFBZCxFQUE0QixLQUFLLENBQUMsaUJBQWxDLEVBRE07SUFBQSxDQWxDUixDQUFBOztBQUFBLDBCQXNDQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLGFBQWQsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQUEsRUFITztJQUFBLENBdENULENBQUE7O3VCQUFBOztNQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/mbulgako/.atom/packages/rulerz/lib/cursor-model.coffee
