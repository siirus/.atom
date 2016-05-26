(function() {
  var GitStashApply, GitStashDrop, GitStashPop, GitStashSave, git, options, repo;

  repo = require('../fixtures').repo;

  git = require('../../lib/git');

  GitStashApply = require('../../lib/models/git-stash-apply');

  GitStashSave = require('../../lib/models/git-stash-save');

  GitStashPop = require('../../lib/models/git-stash-pop');

  GitStashDrop = require('../../lib/models/git-stash-drop');

  options = {
    cwd: repo.getWorkingDirectory()
  };

  describe("Git Stash commands", function() {
    describe("Apply", function() {
      return it("calls git.cmd with 'stash' and 'apply'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(true));
        GitStashApply(repo);
        return expect(git.cmd).toHaveBeenCalledWith(['stash', 'apply'], options);
      });
    });
    describe("Save", function() {
      return it("calls git.cmd with 'stash' and 'save'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(true));
        GitStashSave(repo);
        return expect(git.cmd).toHaveBeenCalledWith(['stash', 'save'], options);
      });
    });
    describe("Save with message", function() {
      return it("calls git.cmd with 'stash', 'save', and provides message", function() {
        var message;
        message = 'foobar';
        spyOn(git, 'cmd').andReturn(Promise.resolve(true));
        GitStashSave(repo, {
          message: message
        });
        return expect(git.cmd).toHaveBeenCalledWith(['stash', 'save', message], options);
      });
    });
    describe("Pop", function() {
      return it("calls git.cmd with 'stash' and 'pop'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(true));
        GitStashPop(repo);
        return expect(git.cmd).toHaveBeenCalledWith(['stash', 'pop'], options);
      });
    });
    return describe("Drop", function() {
      return it("calls git.cmd with 'stash' and 'drop'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(true));
        GitStashDrop(repo);
        return expect(git.cmd).toHaveBeenCalledWith(['stash', 'drop'], options);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9zcGVjL21vZGVscy9naXQtc3Rhc2gtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEVBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxhQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLGtDQUFSLENBRmhCLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlDQUFSLENBSGYsQ0FBQTs7QUFBQSxFQUlBLFdBQUEsR0FBYyxPQUFBLENBQVEsZ0NBQVIsQ0FKZCxDQUFBOztBQUFBLEVBS0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxpQ0FBUixDQUxmLENBQUE7O0FBQUEsRUFPQSxPQUFBLEdBQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFMO0dBUkYsQ0FBQTs7QUFBQSxFQVVBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7QUFDN0IsSUFBQSxRQUFBLENBQVMsT0FBVCxFQUFrQixTQUFBLEdBQUE7YUFDaEIsRUFBQSxDQUFHLHdDQUFILEVBQTZDLFNBQUEsR0FBQTtBQUMzQyxRQUFBLEtBQUEsQ0FBTSxHQUFOLEVBQVcsS0FBWCxDQUFpQixDQUFDLFNBQWxCLENBQTRCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLElBQWhCLENBQTVCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsYUFBQSxDQUFjLElBQWQsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLEdBQUcsQ0FBQyxHQUFYLENBQWUsQ0FBQyxvQkFBaEIsQ0FBcUMsQ0FBQyxPQUFELEVBQVUs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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/git-plus/spec/models/git-stash-spec.coffee
