(function() {
  var CompositeDisposable, ExposeTabView, ExposeView, Sortable, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  CompositeDisposable = require('atom').CompositeDisposable;

  Sortable = require('sortablejs');

  ExposeTabView = require('./expose-tab-view');

  module.exports = ExposeView = (function(_super) {
    __extends(ExposeView, _super);

    function ExposeView() {
      return ExposeView.__super__.constructor.apply(this, arguments);
    }

    ExposeView.prototype.tabs = [];

    ExposeView.content = function() {
      return this.div({
        "class": 'expose-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'expose-top'
          }, function() {
            _this.a({
              outlet: 'exposeSettings',
              "class": 'icon-gear'
            });
            return _this.a({
              "class": 'icon-x close-icon'
            });
          });
          return _this.div({
            outlet: 'tabList',
            "class": 'tab-list'
          });
        };
      })(this));
    };

    ExposeView.prototype.initialize = function() {
      this.disposables = new CompositeDisposable;
      this.handleEvents();
      return this.handleDrag();
    };

    ExposeView.prototype.destroy = function() {
      var _ref;
      this.remove();
      return (_ref = this.disposables) != null ? _ref.dispose() : void 0;
    };

    ExposeView.prototype.handleEvents = function() {
      this.exposeSettings.on('click', function() {
        return atom.workspace.open('atom://config/packages/expose');
      });
      this.on('click', (function(_this) {
        return function(event) {
          event.stopPropagation();
          return _this.exposeHide();
        };
      })(this));
      this.disposables.add(atom.config.observe('expose.useAnimations', (function(_this) {
        return function(value) {
          return _this.element.classList.toggle('animate', value);
        };
      })(this)));
      this.disposables.add(atom.commands.add(this.element, {
        'core:confirm': (function(_this) {
          return function() {
            return _this.exposeHide();
          };
        })(this),
        'core:cancel': (function(_this) {
          return function() {
            return _this.exposeHide();
          };
        })(this),
        'core:move-right': (function(_this) {
          return function() {
            return _this.nextTab();
          };
        })(this),
        'core:move-left': (function(_this) {
          return function() {
            return _this.nextTab(-1);
          };
        })(this),
        'expose:close': (function(_this) {
          return function() {
            return _this.exposeHide();
          };
        })(this),
        'expose:activate-1': (function(_this) {
          return function() {
            return _this.activateTab(1);
          };
        })(this),
        'expose:activate-2': (function(_this) {
          return function() {
            return _this.activateTab(2);
          };
        })(this),
        'expose:activate-3': (function(_this) {
          return function() {
            return _this.activateTab(3);
          };
        })(this),
        'expose:activate-4': (function(_this) {
          return function() {
            return _this.activateTab(4);
          };
        })(this),
        'expose:activate-5': (function(_this) {
          return function() {
            return _this.activateTab(5);
          };
        })(this),
        'expose:activate-6': (function(_this) {
          return function() {
            return _this.activateTab(6);
          };
        })(this),
        'expose:activate-7': (function(_this) {
          return function() {
            return _this.activateTab(7);
          };
        })(this),
        'expose:activate-8': (function(_this) {
          return function() {
            return _this.activateTab(8);
          };
        })(this),
        'expose:activate-9': (function(_this) {
          return function() {
            return _this.activateTab(9);
          };
        })(this)
      }));
      this.disposables.add(atom.workspace.onDidAddPaneItem((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)));
      return this.disposables.add(atom.workspace.onDidDestroyPaneItem((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)));
    };

    ExposeView.prototype.handleDrag = function() {
      return Sortable.create(this.tabList.context, {
        ghostClass: 'ghost',
        onEnd: (function(_this) {
          return function(evt) {
            return _this.moveTab(evt.oldIndex, evt.newIndex);
          };
        })(this)
      });
    };

    ExposeView.prototype.moveTab = function(from, to) {
      var fromItem, fromPane, i, item, toItem, toPane, toPaneIndex, _i, _len, _ref, _ref1, _ref2;
      if (!(fromItem = (_ref = this.tabs[from]) != null ? _ref.item : void 0)) {
        return;
      }
      if (!(toItem = (_ref1 = this.tabs[to]) != null ? _ref1.item : void 0)) {
        return;
      }
      fromPane = atom.workspace.paneForItem(fromItem);
      toPane = atom.workspace.paneForItem(toItem);
      toPaneIndex = 0;
      _ref2 = toPane.getItems();
      for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
        item = _ref2[i];
        if (item === toItem) {
          toPaneIndex = i;
        }
      }
      fromPane.moveItemToPane(fromItem, toPane, toPaneIndex);
      return this.update(true);
    };

    ExposeView.prototype.didChangeVisible = function(visible) {
      this.visible = visible;
      if (visible) {
        this.update();
        this.focus();
      } else {
        atom.workspace.getActivePane().activate();
      }
      return setTimeout(((function(_this) {
        return function() {
          return _this.element.classList.toggle('visible', visible);
        };
      })(this)), 0);
    };

    ExposeView.prototype.getGroupColor = function(n) {
      var colors;
      colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6'];
      return colors[n % colors.length];
    };

    ExposeView.prototype.update = function(force) {
      var color, exposeTabView, i, item, pane, _i, _j, _len, _len1, _ref, _ref1;
      if (!(this.visible || force)) {
        return;
      }
      this.removeTabs();
      _ref = atom.workspace.getPanes();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        pane = _ref[i];
        color = this.getGroupColor(i);
        _ref1 = pane.getItems();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          exposeTabView = new ExposeTabView(item, color);
          this.tabs.push(exposeTabView);
          this.tabList.append(exposeTabView);
        }
      }
      return this.focus();
    };

    ExposeView.prototype.removeTabs = function() {
      var tab, _i, _len, _ref;
      this.tabList.empty();
      _ref = this.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        tab.destroy();
      }
      return this.tabs = [];
    };

    ExposeView.prototype.activateTab = function(n) {
      var _ref;
      if (n == null) {
        n = 1;
      }
      if (n < 1) {
        n = 1;
      }
      if (n > 9 || n > this.tabs.length) {
        n = this.tabs.length;
      }
      if ((_ref = this.tabs[n - 1]) != null) {
        _ref.activateTab();
      }
      return this.exposeHide();
    };

    ExposeView.prototype.nextTab = function(n) {
      var i, nextTabView, tabView, _i, _len, _ref;
      if (n == null) {
        n = 1;
      }
      _ref = this.tabs;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        tabView = _ref[i];
        if (tabView.isActiveTab()) {
          if (i + n < 0) {
            n = this.tabs.length - 1;
          }
          if (nextTabView = this.tabs[(i + n) % this.tabs.length]) {
            nextTabView.activateTab();
          }
          return this.focus();
        }
      }
    };

    ExposeView.prototype.exposeHide = function() {
      var panel, _i, _len, _ref, _results;
      _ref = atom.workspace.getModalPanels();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        panel = _ref[_i];
        if (panel.className === 'expose-panel') {
          _results.push(panel.hide());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return ExposeView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9leHBvc2UvbGliL2V4cG9zZS12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw4REFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQUZYLENBQUE7O0FBQUEsRUFJQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxtQkFBUixDQUpoQixDQUFBOztBQUFBLEVBTUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSx5QkFBQSxJQUFBLEdBQU0sRUFBTixDQUFBOztBQUFBLElBRUEsVUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sYUFBUDtBQUFBLFFBQXNCLFFBQUEsRUFBVSxDQUFBLENBQWhDO09BQUwsRUFBeUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN2QyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxZQUFQO1dBQUwsRUFBMEIsU0FBQSxHQUFBO0FBQ3hCLFlBQUEsS0FBQyxDQUFBLENBQUQsQ0FBRztBQUFBLGNBQUEsTUFBQSxFQUFRLGdCQUFSO0FBQUEsY0FBMEIsT0FBQSxFQUFPLFdBQWpDO2FBQUgsQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxDQUFELENBQUc7QUFBQSxjQUFBLE9BQUEsRUFBTyxtQkFBUDthQUFILEVBRndCO1VB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LEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSmhCO0FBQUEsUUFLQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTHJCO0FBQUEsUUFNQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTnJCO0FBQUEsUUFPQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBUHJCO0FBQUEsUUFRQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBUnJCO0FBQUEsUUFTQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBVHJCO0FBQUEsUUFVQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBVnJCO0FBQUEsUUFXQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEs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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/expose/lib/expose-view.coffee
