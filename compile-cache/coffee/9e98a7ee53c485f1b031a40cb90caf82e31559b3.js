(function() {
  var $, Config, Files, Fs, SavePrompt;

  $ = require('atom-space-pen-views').$;

  Fs = require('fs');

  Config = require('./config');

  Files = require('./files');

  SavePrompt = require('./save-prompt');

  module.exports = {
    config: {
      restoreOpenFileContents: {
        type: 'boolean',
        "default": true,
        description: 'Restore the contents of files that were unsaved in the last session'
      },
      skipSavePrompt: {
        type: 'boolean',
        "default": true,
        description: 'Disable the save on exit prompt'
      },
      extraDelay: {
        type: 'integer',
        "default": 500,
        description: "Add an extra delay time in ms for auto saving files after typing."
      },
      dataSaveFolder: {
        type: 'string',
        description: 'The folder in which to save project states'
      }
    },
    activate: function(state) {
      if (Config.saveFolder() == null) {
        Config.saveFolderDefault();
      }
      SavePrompt.activate();
      return Files.activate();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9zYXZlLXNlc3Npb24vbGliL3NhdmUtc2Vzc2lvbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0NBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxzQkFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FGVCxDQUFBOztBQUFBLEVBR0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBSFIsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUpiLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLHVCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLHFFQUZiO09BREY7QUFBQSxNQUlBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsaUNBRmI7T0FMRjtBQUFBLE1BUUEsVUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEdBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYSxtRUFGYjtPQVRGO0FBQUEsTUFZQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxXQUFBLEVBQWEsNENBRGI7T0FiRjtLQURGO0FBQUEsSUFpQkEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBRVIsTUFBQSxJQUFPLDJCQUFQO0FBQ0UsUUFBQSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUFBLENBREY7T0FBQTtBQUFBLE1BSUEsVUFBVSxDQUFDLFFBQVgsQ0FBQSxDQUpBLENBQUE7YUFLQSxLQUFLLENBQUMsUUFBTixDQUFBLEVBUFE7SUFBQSxDQWpCVjtHQVJGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/mbulgako/.atom/packages/save-session/lib/save-session.coffee
