(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/add_to_cart.html",
    "<div class=\"cart-button\" ng-click=\"addToCart(product);\">\n" +
    "  <div ng-show=\"!success\">\n" +
    "    <i class=\"fa fa-cart-plus\"></i>\n" +
    "    Add\n" +
    "  </div>\n" +
    "  <div ng-show=\"success\">\n" +
    "    <i class=\"fa fa-check\"></i>\n" +
    "    Added\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/category_products.html",
    "<div class=\"product-wrapper\">\n" +
    "  <div class=\"sort-arrow\" ng-click=\"handlePriceClick()\">\n" +
    "    Sort by Price\n" +
    "    <span ng-show=\"price === -1\">\n" +
    "      <i class=\"fa fa-arrow-up\"></i>\n" +
    "    </span>\n" +
    "    <span ng-show=\"price === 1 || price === undefined\">\n" +
    "      <i class=\"fa fa-arrow-down\"></i>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <div style=\"clear: both\"></div>\n" +
    "  <div class=\"product\" ng-repeat=\"product in products\">\n" +
    "    <div class=\"product-image\">\n" +
    "      <img ng-src=\"{{product.pictures[0]}}\" />\n" +
    "    </div>\n" +
    "    <div class=\"product-name\">\n" +
    "      <a ng-href=\"#/product/{{product._id}}\">\n" +
    "        {{product.name}}\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"product-cost\">\n" +
    "      {{product.displayPrice}}\n" +
    "    </div>\n" +
    "    <add-to-cart></add-to-cart>\n" +
    "  </div>\n" +
    "  <div style=\"clear: both\"></div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/category_tree.html",
    "<div class=\"category-tree-wrapper\" ng-show=\"category\">\n" +
    "  <div class=\"crumbs\">\n" +
    "    <div class=\"crumb\" ng-repeat=\"ancestor in category.ancestors\">\n" +
    "      <a ng-href=\"#/category/{{ancestor}}\">\n" +
    "        {{ancestor}}\n" +
    "      </a>\n" +
    "      <div class=\"divider\" ng-hide=\"$last\">\n" +
    "        /\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"child-categories\" ng-show=\"children && children.length\">\n" +
    "      <div class=\"divider\">\n" +
    "        /\n" +
    "      </div>\n" +
    "      <div  class=\"child-arrow\"\n" +
    "            ng-init=\"display = false;\"\n" +
    "            ng-click=\"display = !display;\">\n" +
    "        <i class=\"fa fa-chevron-down\"></i>\n" +
    "      </div>\n" +
    "      <div class=\"child-select\" ng-show=\"display\">\n" +
    "        <div ng-repeat=\"child in children\">\n" +
    "          <a ng-href=\"#/category/{{child._id}}\">\n" +
    "            {{child._id}}\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/category_view.html",
    "<category-tree></category-tree>\n" +
    "<category-products></category-products>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/checkout.html",
    "<div class=\"checkout-wrapper\">\n" +
    "  <div  ng-repeat=\"item in user.user.data.cart\"\n" +
    "        class=\"checkout-product\">\n" +
    "    <div class=\"image-left\">\n" +
    "      <img ng-src=\"{{item.product.pictures[0]}}\">\n" +
    "    </div>\n" +
    "    <div class=\"product-details\">\n" +
    "      <div class=\"name\">\n" +
    "        {{item.product.name}}\n" +
    "      </div>\n" +
    "      <div class=\"price\">\n" +
    "        {{item.product.displayPrice}}\n" +
    "      </div>\n" +
    "      <div class=\"quantity\">\n" +
    "        Quantity:\n" +
    "        <input type=\"number\" ng-model=\"item.quantity\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div style=\"clear: both\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"update-cart-button\" ng-click=\"updateCart()\">\n" +
    "    Update Cart\n" +
    "  </div>\n" +
    "  <div class=\"checkout\">\n" +
    "    <h1>\n" +
    "      <i class=\"fa fa-credit-card\"></i>\n" +
    "      Payment\n" +
    "    </h1>\n" +
    "    <div class=\"credit-card-input\">\n" +
    "      Credit Card Number:\n" +
    "      <input type=\"text\" ng-model=\"stripeToken.number\" />\n" +
    "    </div>\n" +
    "    <div class=\"checkout-button\" ng-click=\"checkout()\">\n" +
    "      Check Out\n" +
    "    </div>\n" +
    "    <div class=\"checkout-error\" ng-show=\"error\">\n" +
    "      {{error}}\n" +
    "    </div>\n" +
    "    <div class=\"checkout-success\" ng-show=\"checkedOut\">\n" +
    "      Checked out successfully!\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/nav_bar.html",
    "<div class=\"nav-bar\">\n" +
    "  <div class=\"nav-bar-contents\">\n" +
    "    <div class=\"logo\">\n" +
    "      <img src=\"/mean-retail-logo.png\" />\n" +
    "    </div>\n" +
    "    <div class=\"title\">\n" +
    "      <a href=\"/assessment\">\n" +
    "        MEAN Retail\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"user-info\">\n" +
    "      <div class=\"checkout\" ng-show=\"user.user\">\n" +
    "        <a ng-href=\"#/checkout\">\n" +
    "          <i class=\"fa fa-shopping-cart\"></i>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      <div class=\"user\" ng-show=\"user.user\">\n" +
    "        <img ng-src=\"{{user.user.profile.picture}}\" />\n" +
    "      </div>\n" +
    "      <div class=\"login\" ng-show=\"!user.user\">\n" +
    "        <a href=\"/auth/facebook?redirect=%2Fassessment%2F%23%2F\">\n" +
    "          <img src=\"//i.stack.imgur.com/LKMP7.png\">\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/product_details.html",
    "<div class=\"product-details\">\n" +
    "  <div class=\"crumbs\">\n" +
    "    <div class=\"crumb\" ng-repeat=\"ancestor in product.category.ancestors\">\n" +
    "      <a ng-href=\"#/category/{{ancestor}}\">\n" +
    "        {{ancestor}}\n" +
    "      </a>\n" +
    "      <div class=\"divider\" ng-hide=\"$last\">\n" +
    "        /\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"product-details-content\">\n" +
    "    <div class=\"image-left\">\n" +
    "      <img ng-src=\"{{product.pictures[0]}}\" />\n" +
    "    </div>\n" +
    "    <div class=\"details-right\">\n" +
    "      <h1>{{product.name}}</h1>\n" +
    "      <div>{{product.displayPrice}}</div>\n" +
    "      <add-to-cart></add-to-cart>\n" +
    "    </div>\n" +
    "    <div style=\"clear: both\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search_bar.html",
    "<!--\n" +
    "TODO: this HTML should expose a search bar\n" +
    "!-->\n" +
    "\n" +
    "<div class=\"search-bar-wrapper\">\n" +
    "  <div>\n" +
    "    <input  type=\"text\" class=\"search-bar-input\"\n" +
    "            placeholder=\"Search for Products\"\n" +
    "            ng-model=\"searchText\" ng-change=\"update()\" />\n" +
    "  </div>\n" +
    "  <div class=\"autocomplete-results\" ng-show=\"results.length > 0\">\n" +
    "    <div class=\"autocomplete-result\" ng-repeat=\"result in results\">\n" +
    "      <a ng-href=\"#/product/{{result._id}}\">\n" +
    "        {{result.name}}\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();
