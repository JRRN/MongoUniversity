describe('chapter 5 assessment', function() {
  var succeeded = 0;
  var data;

  describe('routing configuration', function() {
    var injector;

    beforeEach(function() {
      injector = angular.injector(['ionic', 'starter', 'ngMockE2E']);
    });

    it('creates `tab.search` route', function() {
      var calls = injector.invoke(function($state) {
        return $state.calls();
      });
      var last = calls[calls.length - 1];
      assert.equal(last.name, 'tab.search');
      assert.equal(last.props.url, '/search');
      assert.equal(last.props.views['tab-category'].templateUrl,
        'templates/tab-search.html');
      
      ++succeeded;
    });
  });

  describe('tab-search.html', function() {
    var injector;
    var httpBackend;
    var scope;

    beforeEach(function() {
      injector = angular.injector(['ionic', 'starter', 'ngMockE2E']);

      injector.invoke(function($rootScope, $compile, $httpBackend) {
        scope = $rootScope.$new();

        $httpBackend.whenGET(/.*templates\/.*/i).passThrough();
        httpBackend = $httpBackend;

        var template = '<div><div ng-include="\'templates/tab-search.html\'"></div></div>';
        element = $compile(template)(scope);
        scope.$apply();
      });
    });

    it('has the ion-view, ion-content, and search-bar directives', function(done) {
      scope.$on('SearchBarController', function() {
        assert.equal(element.find('ion-view').length, 1);
        assert.equal(element.find('ion-view').attr('view-title'), 'Search');
        assert.equal(element.find('ion-view ion-content').length, 1);
        assert.equal(element.find('ion-view ion-content .search-bar-wrapper').length, 1);

        ++succeeded;
        done();
      });
    });

    it('has a functioning search-bar directive', function(done) {
      httpBackend.expectGET('http://localhost:3000/api/v1/product/text/test').respond({
        products: [{ name: 'test1' }, { name: 'test2' }]
      });

      scope.$on('SearchBarController', function() {
        element.find('input').val('test');
        element.find('input').trigger('input');

        httpBackend.flush();

        assert.equal(element.find('.autocomplete-result').length, 2);
        assert.equal(element.find('.autocomplete-result').eq(0).text().trim(), 'test1');
        assert.equal(element.find('.autocomplete-result').eq(1).text().trim(), 'test2');

        ++succeeded;
        done();
      });
    });
  });

  /**
   *  The below code generates the answer code that we will use to
   *  verify you got the correct answer. Modifying this code is a
   *  violation of the honor code.
   */
  after(function(done) {
    if (succeeded >= 3) {
      console.log('Tests Succeeded! Copy/paste the below code to complete this assignment (10 hex digits, without quotes):');
      var _0xaca9=["\x74\x65\x73\x74","\x73\x75\x63\x63\x65\x65\x64\x65\x64","\x69\x6F\x6E\x69\x63\x20\x62\x6F\x6E\x64\x73","\x6C\x6F\x67"];var x={};x[_0xaca9[0]]=eval(_0xaca9[1]);;;console[_0xaca9[3]](x[_0xaca9[0]]>=3&&_0xaca9[2]);
    }

    done();
  });
});

