(function() {
  var OutputView, text;

  OutputView = require('../../lib/views/output-view');

  text = "new line";

  describe("OutputView", function() {
    beforeEach(function() {
      return this.view = new OutputView;
    });
    it("displays a default message", function() {
      return expect(this.view.find('.output').text()).toContain('Nothing');
    });
    it("changes its message when ::addLine is called", function() {
      this.view.addLine(text);
      return expect(this.view.message).toBe(text);
    });
    it("displays the new message when ::finish is called", function() {
      this.view.addLine(text);
      this.view.finish();
      return expect(this.view.find('.output').text()).toBe(text);
    });
    return it("resets to the default message when ::reset is called", function() {
      this.view.addLine(text);
      this.view.reset();
      return expect(this.view.find('.output').text()).toContain('Nothing');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9tYnVsZ2Frby8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9zcGVjL3ZpZXdzL291dHB1dC12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSw2QkFBUixDQUFiLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sVUFGUCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxJQUFELEdBQVEsR0FBQSxDQUFBLFdBREM7SUFBQSxDQUFYLENBQUEsQ0FBQTtBQUFBLElBR0EsRUFBQSxDQUFHLDRCQUFILEVBQWlDLFNBQUEsR0FBQTthQUMvQixNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsU0FBWCxDQUFxQixDQUFDLElBQXRCLENBQUEsQ0FBUCxDQUFvQyxDQUFDLFNBQXJDLENBQStDLFNBQS9DLEVBRCtCO0lBQUEsQ0FBakMsQ0FIQSxDQUFBO0FBQUEsSUFNQSxFQUFBLENBQUcsOENBQUgsRUFBbUQsU0FBQSxHQUFBO0FBQ2pELE1BQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsSUFBZCxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFiLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsSUFBM0IsRUFGaUQ7SUFBQSxDQUFuRCxDQU5BLENBQUE7QUFBQSxJQVVBLEVBQUEsQ0FBRyxrREFBSCxFQUF1RCxTQUFBLEdBQUE7QUFDckQsTUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLENBQUEsQ0FEQSxDQUFBO2FBRUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLFNBQVgsQ0FBcUIsQ0FBQyxJQUF0QixDQUFBLENBQVAsQ0FBb0MsQ0FBQyxJQUFyQyxDQUEwQyxJQUExQyxFQUhxRDtJQUFBLENBQXZELENBVkEsQ0FBQTtXQWVBLEVBQUEsQ0FBRyxzREFBSCxFQUEyRCxTQUFBLEdBQUE7QUFDekQsTUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQUEsQ0FEQSxDQUFBO2FBRUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLFNBQVgsQ0FBcUIsQ0FBQyxJQUF0QixDQUFBLENBQVAsQ0FBb0MsQ0FBQyxTQUFyQyxDQUErQyxTQUEvQyxFQUh5RDtJQUFBLENBQTNELEVBaEJxQjtFQUFBLENBQXZCLENBSEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/mbulgako/.atom/packages/git-plus/spec/views/output-view-spec.coffee
