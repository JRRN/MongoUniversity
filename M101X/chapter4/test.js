describe('Nav Bar', function() {
  var injector;
  var element;
  var scope;
  var intercepts;
  var httpBackend;
  var succeeded = 0;

  beforeEach(function() {
    injector = angular.injector(['mean-retail.components', 'ngMockE2E']);
    intercepts = {};

    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();

      $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
      httpBackend = $httpBackend;

      element = $compile('<search-bar></search-bar>')(scope);
      scope.$apply();
    });
  });

  it('displays an input field', function(done) {
    scope.$on('SearchBarController', function() {
      assert.equal(element.find('input').length, 1);
      assert.ok(element.find('input').hasClass('search-bar-input'));

      ++succeeded;
      done();
    });
  });

  it('binds the input field to the `scope.searchText` variable', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({});
    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      ++succeeded;
      done();
    });
  });

  it('makes an HTTP request to `/api/v1/product/text/test` and exposes results to scope', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({
      products: [{ name: 'test1' }, { name: 'test2' }]
    });

    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      httpBackend.flush();
      assert.equal(scope.results.length, 2);
      assert.equal(scope.results[0].name, 'test1');
      assert.equal(scope.results[1].name, 'test2');

      ++succeeded;
      done();
    });
  });

  it('displays autocomplete results in HTML', function(done) {
    httpBackend.expectGET('/api/v1/product/text/test').respond({
      products: [{ name: 'test1' }, { name: 'test2' }]
    });

    scope.$on('SearchBarController', function() {
      element.find('input').val('test');
      element.find('input').trigger('input');
      assert.equal(scope.searchText, 'test');

      httpBackend.flush();

      assert.equal(element.find('.autocomplete-result').length, 2);
      assert.equal(element.find('.autocomplete-result').eq(0).text().trim(), 'test1');
      assert.equal(element.find('.autocomplete-result').eq(1).text().trim(), 'test2');

      ++succeeded;
      done();
    });
  });

  /**
   *  The below code generates the answer code that we will use to
   *  verify you got the correct answer. Modifying this code is a
   *  violation of the honor code.
   */
  after(function(done) {
    if (succeeded >= 4) {
      console.log('Tests Succeeded! Copy/paste the below code to complete this assignment:');
      var _0x323b=["\x74\x65\x73\x74","\x72\x65\x73\x75\x6C\x74\x73","\x6E\x61\x6D\x65","\x74\x65\x73\x74\x31","\x61\x6E\x67\x75\x6C\x61\x72\x20\x6D\x6F\x6D\x65\x6E\x74\x75\x6D","\x6C\x6F\x67"];var x={};x[_0x323b[0]]=scope[_0x323b[1]];console[_0x323b[5]](x[_0x323b[0]][0][_0x323b[2]]===_0x323b[3]&&_0x323b[4]);
      done();
    }
  });
});
