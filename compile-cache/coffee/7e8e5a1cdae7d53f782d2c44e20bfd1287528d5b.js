(function() {
  var TortoiseSvn;

  TortoiseSvn = require('../lib/tortoise-svn');

  describe("TortoiseSvn", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('tortoise-svn');
    });
    return describe("when the tortoise-svn:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.tortoise-svn')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'tortoise-svn:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var tortoiseSvnElement, tortoiseSvnPanel;
          expect(workspaceElement.querySelector('.tortoise-svn')).toExist();
          tortoiseSvnElement = workspaceElement.querySelector('.tortoise-svn');
          expect(tortoiseSvnElement).toExist();
          tortoiseSvnPanel = atom.workspace.panelForItem(tortoiseSvnElement);
          expect(tortoiseSvnPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'tortoise-svn:toggle');
          return expect(tortoiseSvnPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.tortoise-svn')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'tortoise-svn:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var tortoiseSvnElement;
          tortoiseSvnElement = workspaceElement.querySelector('.tortoise-svn');
          expect(tortoiseSvnElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'tortoise-svn:toggle');
          return expect(tortoiseSvnElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy90b3J0b2lzZS1zdm4vc3BlYy90b3J0b2lzZS1zdm4tc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsV0FBQTs7QUFBQSxFQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEscUJBQVIsQ0FBZCxDQUFBOztBQUFBLEVBT0EsUUFBQSxDQUFTLGFBQVQsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFFBQUEseUNBQUE7QUFBQSxJQUFBLE9BQXdDLEVBQXhDLEVBQUMsMEJBQUQsRUFBbUIsMkJBQW5CLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBbkIsQ0FBQTthQUNBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixjQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsaURBQVQsRUFBNEQsU0FBQSxHQUFBO0FBQzFELE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixlQUEvQixDQUFQLENBQXVELENBQUMsR0FBRyxDQUFDLE9BQTVELENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHFCQUF6QyxDQUpBLENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FOQSxDQUFBO2VBU0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILGNBQUEsb0NBQUE7QUFBQSxVQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixlQUEvQixDQUFQLENBQXVELENBQUMsT0FBeEQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUVBLGtCQUFBLEdBQXFCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGVBQS9CLENBRnJCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyxrQkFBUCxDQUEwQixDQUFDLE9BQTNCLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsa0JBQTVCLENBTG5CLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxTQUFqQixDQUFBLENBQVAsQ0FBb0MsQ0FBQyxJQUFyQyxDQUEwQyxJQUExQyxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMscUJBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsU0FBakIsQ0FBQSxDQUFQLENBQW9DLENBQUMsSUFBckMsQ0FBMEMsS0FBMUMsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixlQUEvQixDQUFQLENBQXVELENBQUMsR0FBRyxDQUFDLE9BQTVELENBQUEsQ0FGQSxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHFCQUF6QyxDQU5BLENBQUE7QUFBQSxRQVFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FSQSxDQUFBO2VBV0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUVILGNBQUEsa0JBQUE7QUFBQSxVQUFBLGtCQUFBLEdBQXFCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGVBQS9CLENBQXJCLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxrQkFBUCxDQUEwQixDQUFDLFdBQTNCLENBQUEsQ0FEQSxDQUFBO0FBQUEsVUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHFCQUF6QyxDQUZBLENBQUE7aUJBR0EsTUFBQSxDQUFPLGtCQUFQLENBQTBCLENBQUMsR0FBRyxDQUFDLFdBQS9CLENBQUEsRUFMRztRQUFBLENBQUwsRUFsQjZCO01BQUEsQ0FBL0IsRUF4QjBEO0lBQUEsQ0FBNUQsRUFQc0I7RUFBQSxDQUF4QixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/mbulgako/.atom/packages/tortoise-svn/spec/tortoise-svn-spec.coffee
