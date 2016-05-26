(function() {
  var $, Config, Fs, Mkdirp;

  $ = require('atom-space-pen-views').$;

  Fs = require('fs');

  Mkdirp = require('mkdirp');

  Config = require('./config');

  module.exports = {
    activate: function(buffers) {
      var saveFilePath;
      saveFilePath = Config.saveFile();
      Fs.exists(saveFilePath, (function(_this) {
        return function(exists) {
          if (exists) {
            return Fs.readFile(saveFilePath, {
              encoding: 'utf8'
            }, function(err, str) {
              buffers = JSON.parse(str);
              if (Config.restoreOpenFileContents()) {
                return _this.restore(buffers);
              }
            });
          }
        };
      })(this));
      return this.addListeners();
    },
    save: function() {
      var buffers, file, folder;
      buffers = [];
      atom.workspace.getTextEditors().map((function(_this) {
        return function(editor) {
          var buffer;
          buffer = {};
          if (editor.getBuffer().isModified()) {
            buffer.text = editor.getBuffer().cachedText;
            buffer.diskText = Config.hashMyStr(editor.getBuffer().cachedDiskContents);
          }
          buffer.path = editor.getPath();
          return buffers.push(buffer);
        };
      })(this));
      file = Config.saveFile();
      folder = file.substring(0, file.lastIndexOf(Config.pathSeparator()));
      return Mkdirp(folder, (function(_this) {
        return function(err) {
          return Fs.writeFile(file, JSON.stringify(buffers));
        };
      })(this));
    },
    restore: function(buffers) {
      var buffer, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = buffers.length; _i < _len; _i++) {
        buffer = buffers[_i];
        _results.push(this.restoreText(buffer));
      }
      return _results;
    },
    restoreText: function(buffer) {
      var buf, editors;
      if (buffer.path === void 0) {
        editors = atom.workspace.getTextEditors().filter((function(_this) {
          return function(editor) {
            return editor.buffer.file === null && editor.buffer.cachedText === '';
          };
        })(this));
        if (editors.length > 0) {
          buf = editors[0].getBuffer();
        }
      } else {
        editors = atom.workspace.getTextEditors().filter((function(_this) {
          return function(editor) {
            var _ref;
            return ((_ref = editor.buffer.file) != null ? _ref.path : void 0) === buffer.path;
          };
        })(this));
        if (editors.length > 0) {
          buf = editors[0].getBuffer();
        }
      }
      if (Config.restoreOpenFileContents() && (buffer.text != null) && (buf != null) && buf.getText() !== buffer.text && Config.hashMyStr(buf.cachedDiskContents) === buffer.diskText) {
        return buf.setText(buffer.text);
      }
    },
    addListeners: function() {
      atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          editor.onDidStopChanging(function() {
            return setTimeout((function() {
              return _this.save();
            }), Config.extraDelay());
          });
          return editor.onDidSave(function() {
            return _this.save();
          });
        };
      })(this));
      return window.onbeforeunload = (function(_this) {
        return function() {
          return _this.save();
        };
      })(this);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9zYXZlLXNlc3Npb24vbGliL2ZpbGVzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxxQkFBQTs7QUFBQSxFQUFDLElBQUssT0FBQSxDQUFRLHNCQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUZULENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FIVCxDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsT0FBRCxHQUFBO0FBQ1IsVUFBQSxZQUFBO0FBQUEsTUFBQSxZQUFBLEdBQWUsTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUFmLENBQUE7QUFBQSxNQUVBLEVBQUUsQ0FBQyxNQUFILENBQVUsWUFBVixFQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFDdEIsVUFBQSxJQUFHLE1BQUg7bUJBQ0UsRUFBRSxDQUFDLFFBQUgsQ0FBWSxZQUFaLEVBQTBCO0FBQUEsY0FBQSxRQUFBLEVBQVUsTUFBVjthQUExQixFQUE0QyxTQUFDLEdBQUQsRUFBTSxHQUFOLEdBQUE7QUFDMUMsY0FBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQVYsQ0FBQTtBQUNBLGNBQUEsSUFBRyxNQUFNLENBQUMsdUJBQVAsQ0FBQSxDQUFIO3VCQUNFLEtBQUMsQ0FBQSxPQUFELENBQVMsT0FBVCxFQURGO2VBRjBDO1lBQUEsQ0FBNUMsRUFERjtXQURzQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENB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

//# sourceURL=/C:/Users/mbulgako/.atom/packages/save-session/lib/files.coffee
