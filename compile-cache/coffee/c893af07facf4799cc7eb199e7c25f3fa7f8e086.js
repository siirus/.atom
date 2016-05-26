(function() {
  var CompositeDisposable, Expose, ExposeView;

  CompositeDisposable = require('atom').CompositeDisposable;

  ExposeView = require('./expose-view');

  module.exports = Expose = {
    exposeView: null,
    modalPanel: null,
    config: {
      useAnimations: {
        type: 'boolean',
        "default": true
      }
    },
    activate: function() {
      this.exposeView = new ExposeView;
      this.modalPanel = atom.workspace.addModalPanel({
        item: this.exposeView,
        visible: false,
        className: 'expose-panel'
      });
      this.disposables = new CompositeDisposable;
      this.disposables.add(this.modalPanel.onDidChangeVisible((function(_this) {
        return function(visible) {
          var workspaceElement, workspaceView;
          _this.exposeView.didChangeVisible(visible);
          workspaceView = atom.views.getView(atom.workspace);
          workspaceElement = workspaceView.getElementsByTagName('atom-workspace-axis')[0];
          if (!atom.config.get('expose.useAnimations')) {
            visible = false;
          }
          return workspaceElement.classList.toggle('expose-blur', visible);
        };
      })(this)));
      return this.disposables.add(atom.commands.add('atom-workspace', {
        'expose:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.exposeView.destroy();
      this.modalPanel.destroy();
      return this.disposables.dispose();
    },
    toggle: function() {
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
        return this.modalPanel.show();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9leHBvc2UvbGliL2V4cG9zZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUZiLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQUFBLEdBQ2Y7QUFBQSxJQUFBLFVBQUEsRUFBWSxJQUFaO0FBQUEsSUFDQSxVQUFBLEVBQVksSUFEWjtBQUFBLElBR0EsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQURGO0tBSkY7QUFBQSxJQVFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsR0FBQSxDQUFBLFVBQWQsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsVUFBUDtBQUFBLFFBQW1CLE9BQUEsRUFBUyxLQUE1QjtBQUFBLFFBQW1DLFNBQUEsRUFBVyxjQUE5QztPQUE3QixDQURkLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBQSxDQUFBLG1CQUhmLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixJQUFDLENBQUEsVUFBVSxDQUFDLGtCQUFaLENBQStCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE9BQUQsR0FBQTtBQUM5QyxjQUFBLCtCQUFBO0FBQUEsVUFBQSxLQUFDLENBQUEsVUFBVSxDQUFDLGdCQUFaLENBQTZCLE9BQTdCLENBQUEsQ0FBQTtBQUFBLFVBS0EsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBTGhCLENBQUE7QUFBQSxVQU1BLGdCQUFBLEdBQW1CLGFBQWEsQ0FBQyxvQkFBZCxDQUFtQyxxQkFBbkMsQ0FBMEQsQ0FBQSxDQUFBLENBTjdFLENBQUE7QUFPQSxVQUFBLElBQUEsQ0FBQSxJQUEyQixDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHNCQUFoQixDQUF2QjtBQUFBLFlBQUEsT0FBQSxHQUFVLEtBQVYsQ0FBQTtXQVBBO2lCQVFBLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUEzQixDQUFrQyxhQUFsQyxFQUFpRCxPQUFqRCxFQVQ4QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9CLENBQWpCLENBTEEsQ0FBQTthQWdCQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUNmO0FBQUEsUUFBQSxlQUFBLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCO09BRGUsQ0FBakIsRUFqQlE7SUFBQSxDQVJWO0FBQUEsSUE0QkEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBQSxDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQUhVO0lBQUEsQ0E1Qlo7QUFBQSxJQWlDQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFHLElBQUMsQ0FBQSxVQUFVLENBQUMsU0FBWixDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFBLEVBSEY7T0FETTtJQUFBLENBakNSO0dBTEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/mbulgako/.atom/packages/expose/lib/expose.coffee
