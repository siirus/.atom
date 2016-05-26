'use babel';
'use strict';

var _this = this;

describe('AMU tabs options', function () {
    beforeEach(function () {
        _this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(_this.workspace);

        waitsForPromise('Theme Activation', function () {
            return atom.packages.activatePackage('atom-material-ui');
        });
    });

    it('should be able to toggle tab-bar size', function () {
        atom.config.set('atom-material-ui.tabs.compactTabs', false);
        expect(_this.workspace.classList.contains('compact-tab-bar')).toBe(false);

        atom.config.set('atom-material-ui.tabs.compactTabs', true);
        expect(_this.workspace.classList.contains('compact-tab-bar')).toBe(true);
    });

    it('should be able to toggle tab-bar size', function () {
        atom.config.set('atom-material-ui.tabs.tintedTabBar', false);
        expect(_this.workspace.classList.contains('tinted-tab-bar')).toBe(false);

        atom.config.set('atom-material-ui.tabs.tintedTabBar', true);
        expect(_this.workspace.classList.contains('tinted-tab-bar')).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL21idWxnYWtvLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvc3BlYy9zZXR0aW5ncy10YWJzLXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOzs7O0FBRWIsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDL0IsY0FBVSxDQUFDLFlBQU07QUFDYixjQUFLLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEQsZUFBTyxDQUFDLFdBQVcsQ0FBQyxNQUFLLFNBQVMsQ0FBQyxDQUFDOztBQUVwQyx1QkFBZSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDdEMsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RCxDQUFDLENBQUM7S0FDTixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHVDQUF1QyxFQUFFLFlBQU07QUFDOUMsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUQsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFekUsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0QsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzRSxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHVDQUF1QyxFQUFFLFlBQU07QUFDOUMsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0QsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFeEUsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxRSxDQUFDLENBQUM7Q0FDTixDQUFDLENBQUMiLCJmaWxlIjoiQzovVXNlcnMvbWJ1bGdha28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9zcGVjL3NldHRpbmdzLXRhYnMtc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuJ3VzZSBzdHJpY3QnO1xuXG5kZXNjcmliZSgnQU1VIHRhYnMgb3B0aW9ucycsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2UgPSBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpO1xuICAgICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKHRoaXMud29ya3NwYWNlKTtcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UoJ1RoZW1lIEFjdGl2YXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2F0b20tbWF0ZXJpYWwtdWknKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdG9nZ2xlIHRhYi1iYXIgc2l6ZScsICgpID0+IHtcbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMuY29tcGFjdFRhYnMnLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdCh0aGlzLndvcmtzcGFjZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBhY3QtdGFiLWJhcicpKS50b0JlKGZhbHNlKTtcblxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy5jb21wYWN0VGFicycsIHRydWUpO1xuICAgICAgICBleHBlY3QodGhpcy53b3Jrc3BhY2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wYWN0LXRhYi1iYXInKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB0b2dnbGUgdGFiLWJhciBzaXplJywgKCkgPT4ge1xuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy50aW50ZWRUYWJCYXInLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdCh0aGlzLndvcmtzcGFjZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RpbnRlZC10YWItYmFyJykpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS50YWJzLnRpbnRlZFRhYkJhcicsIHRydWUpO1xuICAgICAgICBleHBlY3QodGhpcy53b3Jrc3BhY2UuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aW50ZWQtdGFiLWJhcicpKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG4iXX0=
//# sourceURL=/C:/Users/mbulgako/.atom/packages/atom-material-ui/spec/settings-tabs-spec.js