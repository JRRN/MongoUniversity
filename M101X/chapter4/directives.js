exports.addToCart = function() {
  return {
    controller: 'AddToCartController',
    templateUrl: '/assessment/templates/add_to_cart.html'
  };
};

exports.categoryProducts = function() {
  return {
    controller: 'CategoryProductsController',
    templateUrl: '/assessment/templates/category_products.html'
  }
};

exports.categoryTree = function() {
  return {
    controller: 'CategoryTreeController',
    templateUrl: '/assessment/templates/category_tree.html'
  }
};

exports.checkout = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/assessment/templates/checkout.html'
  };
};

exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/assessment/templates/nav_bar.html'
  };
};

exports.productDetails = function() {
  return {
    controller: 'ProductDetailsController',
    templateUrl: '/assessment/templates/product_details.html'
  };
};

exports.searchBar = function() {
  return {
    controller: 'SearchBarController',
    templateUrl: '/assessment/templates/search_bar.html'
  };
};
