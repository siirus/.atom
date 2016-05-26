(function() {
  var Config;

  Config = require('./config');

  module.exports = {
    activate: function() {
      return this.addListeners();
    },
    enableTemp: function(pane) {
      return pane.promptToSaveItem = function(item) {
        var save;
        save = pane.promptToSaveItem2(item);
        pane.promptToSaveItem = function(item) {
          return true;
        };
        return save;
      };
    },
    addListeners: function() {
      Config.observe('skipSavePrompt', function(val) {
        return atom.workspace.getPanes().map(function(pane) {
          if (val) {
            return pane.promptToSaveItem = function(item) {
              return true;
            };
          } else if (pane.promptToSaveItem2) {
            return pane.promptToSaveItem = function(item) {
              return pane.promptToSaveItem2(item);
            };
          }
        });
      });
      return atom.workspace.observePanes((function(_this) {
        return function(pane) {
          pane.promptToSaveItem2 = pane.promptToSaveItem;
          if (Config.skipSavePrompt()) {
            pane.promptToSaveItem = function(item) {
              return true;
            };
          }
          return pane.onWillDestroyItem(function(event) {
            if (Config.skipSavePrompt()) {
              return _this.enableTemp(pane);
            } else {
              return pane.promptToSaveItem = function(item) {
                return pane.promptToSaveItem2(item);
              };
            }
          });
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9zYXZlLXNlc3Npb24vbGliL3NhdmUtcHJvbXB0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxNQUFBOztBQUFBLEVBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsWUFBRCxDQUFBLEVBRFE7SUFBQSxDQUFWO0FBQUEsSUFHQSxVQUFBLEVBQVksU0FBQyxJQUFELEdBQUE7YUFDVixJQUFJLENBQUMsZ0JBQUwsR0FBd0IsU0FBQyxJQUFELEdBQUE7QUFDdEIsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLGlCQUFMLENBQXVCLElBQXZCLENBQVAsQ0FBQTtBQUFBLFFBQ0EsSUFBSSxDQUFDLGdCQUFMLEdBQXdCLFNBQUMsSUFBRCxHQUFBO2lCQUN0QixLQURzQjtRQUFBLENBRHhCLENBQUE7ZUFHQSxLQUpzQjtNQUFBLEVBRGQ7SUFBQSxDQUhaO0FBQUEsSUFVQSxZQUFBLEVBQWMsU0FBQSxHQUFBO0FBRVosTUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLGdCQUFmLEVBQWlDLFNBQUMsR0FBRCxHQUFBO2VBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBZixDQUFBLENBQXlCLENBQUMsR0FBMUIsQ0FBOEIsU0FBQyxJQUFELEdBQUE7QUFDNUIsVUFBQSxJQUFHLEdBQUg7bUJBQ0UsSUFBSSxDQUFDLGdCQUFMLEdBQXdCLFNBQUMsSUFBRCxHQUFBO3FCQUN0QixLQURzQjtZQUFBLEVBRDFCO1dBQUEsTUFHSyxJQUFHLElBQUksQ0FBQyxpQkFBUjttQkFDSCxJQUFJLENBQUMsZ0JBQUwsR0FBd0IsU0FBQyxJQUFELEdBQUE7cUJBQ3RCLElBQUksQ0FBQyxpQkFBTCxDQUF1QixJQUF2QixFQURzQjtZQUFBLEVBRHJCO1dBSnVCO1FBQUEsQ0FBOUIsRUFEK0I7TUFBQSxDQUFqQyxDQUFBLENBQUE7YUFVQSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxHQUFBO0FBQzFCLFVBQUEsSUFBSSxDQUFDLGlCQUFMLEdBQXlCLElBQUksQ0FBQyxnQkFBOUIsQ0FBQTtBQUVBLFVBQUEsSUFBRyxNQUFNLENBQUMsY0FBUCxDQUFBLENBQUg7QUFDRSxZQUFBLElBQUksQ0FBQyxnQkFBTCxHQUF3QixTQUFDLElBQUQsR0FBQTtxQkFDdEIsS0FEc0I7WUFBQSxDQUF4QixDQURGO1dBRkE7aUJBTUEsSUFBSSxDQUFDLGlCQUFMLENBQXVCLFNBQUMsS0FBRCxHQUFBO0FBQ3JCLFlBQUEsSUFBRyxNQUFNLENBQUMsY0FBUCxDQUFBLENBQUg7cUJBQ0UsS0FBQyxDQUFBLFVBQUQsQ0FBWSxJQUFaLEVBREY7YUFBQSxNQUFBO3FCQUdFLElBQUksQ0FBQyxnQkFBTCxHQUF3QixTQUFDLElBQUQsR0FBQTt1QkFDdEIsSUFBSSxDQUFDLGlCQUFMLENBQXVCLElBQXZCLEVBRHNCO2NBQUEsRUFIMUI7YUFEcUI7VUFBQSxDQUF2QixFQVAwQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLEVBWlk7SUFBQSxDQVZkO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/mbulgako/.atom/packages/save-session/lib/save-prompt.coffee
