(function() {
  var CompositeDisposable, RulerView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  RulerView = (function(_super) {
    __extends(RulerView, _super);

    function RulerView() {
      return RulerView.__super__.constructor.apply(this, arguments);
    }

    RulerView.prototype.subscriptions = null;

    RulerView.prototype.model = null;

    RulerView.prototype.editor = null;

    RulerView.prototype.lines = null;

    RulerView.prototype.createdCallback = function() {
      return this.classList.add('rulerz');
    };

    RulerView.prototype.initialize = function(model) {
      this.subscriptions = new CompositeDisposable;
      this.model = model;
      this.insert();
      this.subscribe();
      return this.update(this.model.getCursor().getScreenPosition());
    };

    RulerView.prototype.getEditor = function() {
      var root, _ref;
      this.editor = atom.views.getView(this.model.getCursor().editor);
      root = (_ref = this.editor.shadowRoot) != null ? _ref : this.editor;
      this.lines = root.querySelector('.scroll-view .lines');
      return this.editor;
    };

    RulerView.prototype.insert = function() {
      if (!this.lines) {
        this.getEditor();
      }
      if (!this.lines) {
        return;
      }
      return this.lines.appendChild(this);
    };

    RulerView.prototype.subscribe = function() {
      this.subscriptions.add(this.model.onDidChange(this.update.bind(this)));
      return this.subscriptions.add(this.model.onDidDestroy(this.destroy.bind(this)));
    };

    RulerView.prototype.update = function(point) {
      var position, view;
      view = this.getEditor();
      position = view.pixelPositionForScreenPosition(point);
      return this.style.left = position.left + 'px';
    };

    RulerView.prototype.destroy = function() {
      this.subscriptions.dispose();
      return this.remove();
    };

    return RulerView;

  })(HTMLElement);

  module.exports = RulerView = document.registerElement('ruler-view', {
    prototype: RulerView.prototype
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9ydWxlcnovbGliL3J1bGVyLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVNO0FBQ0osZ0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHdCQUFBLGFBQUEsR0FBZSxJQUFmLENBQUE7O0FBQUEsd0JBQ0EsS0FBQSxHQUFlLElBRGYsQ0FBQTs7QUFBQSx3QkFFQSxNQUFBLEdBQWUsSUFGZixDQUFBOztBQUFBLHdCQUdBLEtBQUEsR0FBZSxJQUhmLENBQUE7O0FBQUEsd0JBS0EsZUFBQSxHQUFpQixTQUFBLEdBQUE7YUFDZixJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsQ0FBZSxRQUFmLEVBRGU7SUFBQSxDQUxqQixDQUFBOztBQUFBLHdCQVFBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBRFQsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FIQSxDQUFBO2FBS0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxJQUFDLENBQUEsS0FBSyxDQUFDLFNBQVAsQ0FBQSxDQUFrQixDQUFDLGlCQUFuQixDQUFBLENBQVIsRUFOVTtJQUFBLENBUlosQ0FBQTs7QUFBQSx3QkFnQkEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsVUFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxTQUFQLENBQUEsQ0FBa0IsQ0FBQyxNQUF0QyxDQUFWLENBQUE7QUFBQSxNQUNBLElBQUEsb0RBQStCLElBQUMsQ0FBQSxNQURoQyxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsS0FBRCxHQUFVLElBQUksQ0FBQyxhQUFMLENBQW1CLHFCQUFuQixDQUZWLENBQUE7YUFHQSxJQUFDLENBQUEsT0FKUTtJQUFBLENBaEJYLENBQUE7O0FBQUEsd0JBdUJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUEsQ0FBQSxJQUFxQixDQUFBLEtBQXJCO0FBQUEsUUFBQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsQ0FBQTtPQUFBO0FBQ0EsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLEtBQWY7QUFBQSxjQUFBLENBQUE7T0FEQTthQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixJQUFuQixFQUhNO0lBQUEsQ0F2QlIsQ0FBQTs7QUFBQSx3QkE0QkEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUVULE1BQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQW5CLENBQW5CLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBZCxDQUFwQixDQUFuQixFQUhTO0lBQUEsQ0E1QlgsQ0FBQTs7QUFBQSx3QkFrQ0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxHQUFBO0FBQ04sVUFBQSxjQUFBO0FBQUEsTUFBQSxJQUFBLEdBQWMsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFkLENBQUE7QUFBQSxNQUNBLFFBQUEsR0FBYyxJQUFJLENBQUMsOEJBQUwsQ0FBb0MsS0FBcEMsQ0FEZCxDQUFBO2FBRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLEdBQWMsUUFBUSxDQUFDLElBQVQsR0FBZ0IsS0FIeEI7SUFBQSxDQWxDUixDQUFBOztBQUFBLHdCQXdDQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRk87SUFBQSxDQXhDVCxDQUFBOztxQkFBQTs7S0FEc0IsWUFGeEIsQ0FBQTs7QUFBQSxFQStDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFBLEdBQVksUUFBUSxDQUFDLGVBQVQsQ0FBeUIsWUFBekIsRUFBdUM7QUFBQSxJQUFDLFNBQUEsRUFBVyxTQUFTLENBQUMsU0FBdEI7R0FBdkMsQ0EvQzdCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/mbulgako/.atom/packages/rulerz/lib/ruler-view.coffee
