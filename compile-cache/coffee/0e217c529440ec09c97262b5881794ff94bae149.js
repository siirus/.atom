(function() {
  var ExposeView, path;

  path = require('path');

  ExposeView = require('../lib/expose-view');

  describe("ExposeView", function() {
    var exposeView;
    exposeView = null;
    beforeEach(function() {
      exposeView = new ExposeView;
      return atom.project.setPaths([path.join(__dirname, 'fixtures')]);
    });
    describe("update()", function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('sample1.txt');
        });
        return waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
      });
      it("populates list of open tabs", function() {
        expect(exposeView.tabList.children()).toHaveLength(0);
        expect(exposeView.tabs).toHaveLength(0);
        exposeView.update(true);
        expect(exposeView.tabList.children()).toHaveLength(2);
        return expect(exposeView.tabs).toHaveLength(2);
      });
      return it("assign colors to different panes", function() {
        var color1, color2;
        atom.workspace.getActivePane().splitRight({
          copyActiveItem: true
        });
        exposeView.update(true);
        expect(atom.workspace.getPanes()).toHaveLength(2);
        expect(exposeView.tabs).toHaveLength(3);
        color1 = exposeView.getGroupColor(0);
        color2 = exposeView.getGroupColor(1);
        expect(exposeView.tabs[1].color).toEqual(color1);
        expect(exposeView.tabs[2].color).toEqual(color2);
        return expect(color1).not.toEqual(color2);
      });
    });
    describe("activateTab(n)", function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('sample1.txt');
        });
        waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
        return waitsForPromise(function() {
          return atom.workspace.open('sample3.txt');
        });
      });
      it("activates given tab", function() {
        exposeView.update(true);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
        exposeView.activateTab(2);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample2.txt');
        exposeView.activateTab(1);
        return expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
      });
      return it("handles out of range input", function() {
        exposeView.update(true);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
        exposeView.activateTab(2);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample2.txt');
        exposeView.activateTab(9);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
        exposeView.activateTab(0);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
        exposeView.activateTab();
        return expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
      });
    });
    describe("moveTab(from, to)", function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('sample1.txt');
        });
        waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
        return waitsForPromise(function() {
          return atom.workspace.open('sample3.txt');
        });
      });
      it("can move tabs", function() {
        exposeView.update(true);
        expect(exposeView.tabs).toHaveLength(3);
        expect(exposeView.tabs[0].title).toEqual('sample1.txt');
        expect(exposeView.tabs[2].title).toEqual('sample3.txt');
        exposeView.moveTab(2, 0);
        expect(exposeView.tabs[0].title).toEqual('sample3.txt');
        return expect(exposeView.tabs[2].title).toEqual('sample2.txt');
      });
      it("can move tabs between panes", function() {
        var color1, color2, item;
        item = atom.workspace.getActivePaneItem();
        atom.workspace.getActivePane().splitRight({
          copyActiveItem: true
        });
        item.destroy();
        exposeView.update(true);
        color1 = exposeView.getGroupColor(0);
        color2 = exposeView.getGroupColor(1);
        expect(color1).not.toEqual(color2);
        expect(exposeView.tabs).toHaveLength(3);
        expect(exposeView.tabs[0].color).toEqual(color1);
        expect(exposeView.tabs[0].title).toEqual('sample1.txt');
        expect(exposeView.tabs[1].title).toEqual('sample2.txt');
        expect(exposeView.tabs[2].title).toEqual('sample3.txt');
        expect(exposeView.tabs[2].color).toEqual(color2);
        exposeView.moveTab(0, 2);
        expect(exposeView.tabs[1].title).toEqual('sample1.txt');
        expect(exposeView.tabs[1].color).toEqual(color2);
        expect(exposeView.tabs[0].title).toEqual('sample2.txt');
        expect(exposeView.tabs[0].color).toEqual(color1);
        exposeView.moveTab(1, 0);
        expect(exposeView.tabs[0].title).toEqual('sample1.txt');
        return expect(exposeView.tabs[0].color).toEqual(color1);
      });
      it("uses long title when there are multiple items with the same name", function() {
        atom.workspace.getActivePane().splitRight({
          copyActiveItem: true
        });
        exposeView.update(true);
        expect(exposeView.tabs).toHaveLength(4);
        expect(exposeView.tabs[0].title).toEqual('sample1.txt');
        expect(exposeView.tabs[2].title).toEqual('sample3.txt — fixtures');
        return expect(exposeView.tabs[3].title).toEqual('sample3.txt — fixtures');
      });
      it("handles missing long title", function() {
        var item;
        atom.workspace.getActivePane().splitRight({
          copyActiveItem: true
        });
        item = atom.workspace.getActivePaneItem();
        item.getLongTitle = void 0;
        exposeView.update(true);
        expect(exposeView.tabs[2].title).toEqual('sample3.txt — fixtures');
        return expect(exposeView.tabs[3].title).toEqual('sample3.txt');
      });
      return it("handles invalid input", function() {
        exposeView.update(true);
        exposeView.moveTab();
        expect(exposeView.tabs[0].title).toEqual('sample1.txt');
        exposeView.moveTab(9, 9);
        return expect(exposeView.tabs[2].title).toEqual('sample3.txt');
      });
    });
    describe("Cycle around in tabs", function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.workspace.open('sample1.txt');
        });
        waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
        return waitsForPromise(function() {
          return atom.workspace.open('sample3.txt');
        });
      });
      it("marks active tab", function() {
        var item;
        exposeView.visible = true;
        exposeView.update();
        expect(exposeView.tabs[2].isActiveTab()).toBeTruthy();
        expect(exposeView.tabs[0].hasClass('active')).toBeFalsy();
        expect(exposeView.tabs[1].hasClass('active')).toBeFalsy();
        expect(exposeView.tabs[2].hasClass('active')).toBeTruthy();
        item = atom.workspace.getPaneItems()[0];
        atom.workspace.paneForItem(item).activateItem(item);
        expect(exposeView.tabs[0].isActiveTab()).toBeTruthy();
        expect(exposeView.tabs[2].hasClass('active')).toBeFalsy();
        expect(exposeView.tabs[1].hasClass('active')).toBeFalsy();
        return expect(exposeView.tabs[0].hasClass('active')).toBeTruthy();
      });
      it("can go to next tab", function() {
        exposeView.update(true);
        exposeView.activateTab(1);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
        exposeView.nextTab();
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample2.txt');
        exposeView.nextTab();
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
        exposeView.nextTab();
        return expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
      });
      return it("can go to previous tab", function() {
        exposeView.update(true);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
        exposeView.nextTab(-1);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample2.txt');
        exposeView.nextTab(-1);
        expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample1.txt');
        exposeView.nextTab(-1);
        return expect(atom.workspace.getActivePaneItem().getTitle()).toEqual('sample3.txt');
      });
    });
    describe("Hide expose view", function() {
      var activationPromise, workspaceElement, _ref;
      _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
      beforeEach(function() {
        workspaceElement = atom.views.getView(atom.workspace);
        return activationPromise = atom.packages.activatePackage('expose');
      });
      return it("closes expose panel", function() {
        atom.commands.dispatch(workspaceElement, 'expose:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var exposeModule;
          exposeModule = atom.packages.loadedPackages['expose'].mainModule;
          expect(exposeModule.modalPanel.isVisible()).toBe(true);
          exposeView.exposeHide();
          expect(exposeModule.modalPanel.isVisible()).toBe(false);
          exposeView.exposeHide();
          return expect(exposeModule.modalPanel.isVisible()).toBe(false);
        });
      });
    });
    return describe("Stay updated on changes", function() {
      beforeEach(function() {
        return waitsForPromise(function() {
          return atom.workspace.open('sample1.txt');
        });
      });
      it("updates on add/destroy items", function() {
        exposeView.visible = true;
        exposeView.update();
        expect(exposeView.tabs).toHaveLength(1);
        waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
        return runs(function() {
          expect(exposeView.tabs).toHaveLength(2);
          atom.workspace.getActivePaneItem().destroy();
          return expect(exposeView.tabs).toHaveLength(1);
        });
      });
      return it("does not update when not visible", function() {
        exposeView.update(true);
        expect(exposeView.tabs).toHaveLength(1);
        waitsForPromise(function() {
          return atom.workspace.open('sample2.txt');
        });
        return runs(function() {
          return expect(exposeView.tabs).toHaveLength(1);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9leHBvc2Uvc3BlYy9leHBvc2Utdmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUEsR0FBQTtBQUNyQixRQUFBLFVBQUE7QUFBQSxJQUFBLFVBQUEsR0FBYSxJQUFiLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLFVBQUEsR0FBYSxHQUFBLENBQUEsVUFBYixDQUFBO2FBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQXNCLENBQUMsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLFVBQXJCLENBQUQsQ0FBdEIsRUFGUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFNQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsTUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsUUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsYUFBcEIsRUFEYztRQUFBLENBQWhCLENBQUEsQ0FBQTtlQUVBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixhQUFwQixFQURjO1FBQUEsQ0FBaEIsRUFIUztNQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsTUFNQSxFQUFBLENBQUcsNkJBQUgsRUFBa0MsU0FBQSxHQUFBO0FBQ2hD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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/expose/spec/expose-view-spec.coffee
