(function() {
  var $$, CompositeDisposable, ExposeView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), View = _ref.View, $$ = _ref.$$;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = ExposeView = (function(_super) {
    __extends(ExposeView, _super);

    ExposeView.content = function(title, color) {
      return this.div({
        click: 'activateTab',
        "class": 'expose-tab'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'tab-header'
          }, function() {
            _this.div({
              "class": 'title icon-file-text',
              'data-name': title
            }, title);
            return _this.div({
              click: 'closeTab',
              "class": 'close-icon icon-x'
            });
          });
          return _this.div({
            outlet: 'tabBody',
            "class": 'tab-body',
            style: "border-color: " + color
          });
        };
      })(this));
    };

    function ExposeView(item, color) {
      this.item = item != null ? item : {};
      this.color = color != null ? color : '#000';
      this.toggleActive = __bind(this.toggleActive, this);
      this.refreshTab = __bind(this.refreshTab, this);
      ExposeView.__super__.constructor.call(this, this.title = this.getItemTitle(item), this.color);
    }

    ExposeView.prototype.initialize = function() {
      this.disposables = new CompositeDisposable;
      this.handleEvents();
      return this.populateTabBody();
    };

    ExposeView.prototype.handleEvents = function() {
      this.on('click', '.icon-sync', this.refreshTab);
      this.disposables.add(atom.commands.add(this.element, {
        'expose:close-tab': (function(_this) {
          return function(e) {
            return _this.closeTab(e);
          };
        })(this)
      }));
      return atom.workspace.observeActivePaneItem(this.toggleActive);
    };

    ExposeView.prototype.destroy = function() {
      var _ref1;
      this.destroyed = true;
      this.remove();
      return (_ref1 = this.disposables) != null ? _ref1.dispose() : void 0;
    };

    ExposeView.prototype.populateTabBody = function() {
      if (this.drawImage()) {
        return;
      }
      if (this.drawMinimap()) {
        return;
      }
      return this.drawFallback();
    };

    ExposeView.prototype.drawFallback = function() {
      var iconClass, objectClass;
      objectClass = this.item.constructor.name;
      if (this.item.getIconName) {
        iconClass = 'icon-' + this.item.getIconName();
      }
      return this.tabBody.html($$(function() {
        return this.a({
          "class": iconClass || (function() {
            switch (objectClass) {
              case 'TextEditor':
                return 'icon-file-code';
              case 'ArchiveEditor':
                return 'icon-file-zip';
              default:
                return 'icon-file-text';
            }
          })()
        });
      }));
    };

    ExposeView.prototype.drawImage = function() {
      var filePath;
      if (this.item.constructor.name !== 'ImageEditor') {
        return;
      }
      filePath = this.item.file.path;
      return this.tabBody.html($$(function() {
        return this.img({
          src: filePath
        });
      }));
    };

    ExposeView.prototype.drawMinimap = function() {
      if (this.item.constructor.name !== 'TextEditor') {
        return;
      }
      if (!atom.packages.loadedPackages.minimap) {
        return;
      }
      return atom.packages.serviceHub.consume('minimap', '1.0.0', (function(_this) {
        return function(minimapAPI) {
          var minimap, minimapElement, _ref1;
          if (minimapAPI.standAloneMinimapForEditor != null) {
            minimap = minimapAPI.standAloneMinimapForEditor(_this.item);
            minimapElement = atom.views.getView(minimap);
            if ((_ref1 = minimapElement.controls) != null) {
              _ref1.remove();
            }
            minimapElement.style.cssText = 'width: 190px;\nheight: 130px;\nleft: 10px;\npointer-events: none;\n// transform: scale3d(1.5, 1.5, 1) translate(-20px, 15px);';
            minimap.setCharWidth(2);
            minimap.setCharHeight(4);
            minimap.setInterline(2);
            return _this.tabBody.html(minimapElement);
          } else {
            return _this.tabBody.html($$(function() {
              return this.a({
                "class": 'icon-sync'
              });
            }));
          }
        };
      })(this));
    };

    ExposeView.prototype.refreshTab = function(event) {
      event.stopPropagation();
      event.target.className += ' animate';
      atom.workspace.paneForItem(this.item).activateItem(this.item);
      return setTimeout(((function(_this) {
        return function() {
          return _this.populateTabBody();
        };
      })(this)), 1000);
    };

    ExposeView.prototype.activateTab = function() {
      var pane;
      pane = atom.workspace.paneForItem(this.item);
      pane.activate();
      return pane.activateItem(this.item);
    };

    ExposeView.prototype.toggleActive = function(item) {
      return this.toggleClass('active', item === this.item);
    };

    ExposeView.prototype.isActiveTab = function() {
      return atom.workspace.getActivePaneItem() === this.item;
    };

    ExposeView.prototype.closeTab = function(event) {
      if (event != null) {
        event.stopPropagation();
      }
      atom.workspace.paneForItem(this.item).destroyItem(this.item);
      return this.destroy();
    };

    ExposeView.prototype.getItemTitle = function(item) {
      var paneItem, title, _i, _len, _ref1;
      if (!(title = item != null ? item.getTitle() : void 0)) {
        return 'untitled';
      }
      _ref1 = atom.workspace.getPaneItems();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        paneItem = _ref1[_i];
        if (paneItem !== item) {
          if (paneItem.getTitle() === title && (item.getLongTitle != null)) {
            title = item.getLongTitle();
          }
        }
      }
      return title;
    };

    return ExposeView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9leHBvc2UvbGliL2V4cG9zZS10YWItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsK0NBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxPQUFhLE9BQUEsQ0FBUSxzQkFBUixDQUFiLEVBQUMsWUFBQSxJQUFELEVBQU8sVUFBQSxFQUFQLENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixpQ0FBQSxDQUFBOztBQUFBLElBQUEsVUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsRUFBUSxLQUFSLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxLQUFBLEVBQU8sYUFBUDtBQUFBLFFBQXNCLE9BQUEsRUFBTyxZQUE3QjtPQUFMLEVBQWdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDOUMsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sWUFBUDtXQUFMLEVBQTBCLFNBQUEsR0FBQTtBQUN4QixZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxzQkFBUDtBQUFBLGNBQStCLFdBQUEsRUFBYSxLQUE1QzthQUFMLEVBQXdELEtBQXhELENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxLQUFBLEVBQU8sVUFBUDtBQUFBLGNBQW1CLE9BQUEsRUFBTyxtQkFBMUI7YUFBTCxFQUZ3QjtVQUFBLENBQTFCLENBQUEsQ0FBQTtpQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxN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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/expose/lib/expose-tab-view.coffee
