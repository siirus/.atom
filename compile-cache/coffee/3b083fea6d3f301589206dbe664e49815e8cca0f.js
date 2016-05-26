(function() {
  var Expose;

  Expose = require('../lib/expose');

  describe("Expose", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('expose');
    });
    return describe("when the expose:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.expose-view')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'expose:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var exposeModule;
          expect(workspaceElement.querySelector('.expose-view')).toExist();
          exposeModule = atom.packages.loadedPackages['expose'].mainModule;
          expect(exposeModule.modalPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'expose:toggle');
          return expect(exposeModule.modalPanel.isVisible()).toBe(false);
        });
      });
      it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.expose-view')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'expose:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var exposeElement;
          exposeElement = workspaceElement.querySelector('.expose-view');
          expect(exposeElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'expose:toggle');
          return expect(exposeElement).not.toBeVisible();
        });
      });
      return it("disables animations with config", function() {
        atom.commands.dispatch(workspaceElement, 'expose:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var exposeElement;
          exposeElement = workspaceElement.querySelector('.expose-view');
          expect(exposeElement.classList.toString()).toContain('animate');
          atom.commands.dispatch(workspaceElement, 'expose:toggle');
          atom.config.set('expose.useAnimations', false);
          atom.commands.dispatch(workspaceElement, 'expose:toggle');
          return expect(exposeElement.classList.toString()).not.toContain('animate');
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9leHBvc2Uvc3BlYy9leHBvc2Utc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsTUFBQTs7QUFBQSxFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsZUFBUixDQUFULENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFBLEdBQUE7QUFDakIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFFBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUywyQ0FBVCxFQUFzRCxTQUFBLEdBQUE7QUFDcEQsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBQ3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGNBQS9CLENBQVAsQ0FBc0QsQ0FBQyxHQUFHLENBQUMsT0FBM0QsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsZUFBekMsQ0FGQSxDQUFBO0FBQUEsUUFJQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBSkEsQ0FBQTtlQU9BLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLFlBQUE7QUFB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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/expose/spec/expose-spec.coffee
