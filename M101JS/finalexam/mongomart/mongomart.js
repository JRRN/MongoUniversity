/*
  Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


var express = require('express'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    ItemDAO = require('./items').ItemDAO,
    CartDAO = require('./cart').CartDAO;
    

// Set up express
app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));


/*
 Configure nunjucks to work with express
 Not using consolidate because I'm waiting on better support for template inheritance with
 nunjucks via consolidate. See: https://github.com/tj/consolidate.js/pull/224
*/
var env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var nunjucksDate = require('nunjucks-date');
nunjucksDate.setDefaultFormat('MMMM Do YYYY, h:mm:ss a');
env.addFilter("date", nunjucksDate);

var ITEMS_PER_PAGE = 5;

// Hardcoded USERID for use with the shopping cart portion
var USERID = "558098a65133816958968d88";

MongoClient.connect('mongodb://localhost:27017/mongomart', function(err, db) {
    "use strict";

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    var items = new ItemDAO(db);
    var cart = new CartDAO(db);
    
    var router = express.Router();

    // Homepage
    router.get("/", function(req, res) {
        "use strict";
        
        var page = req.query.page ? parseInt(req.query.page) : 0;
        var category = req.query.category ? req.query.category : "All";

        items.getCategories(function(categories) {
            
            items.getItems(category, page, ITEMS_PER_PAGE, function(pageItems) {

                items.getNumItems(category, function(itemCount) {

                    var numPages = 0;
                    if (itemCount > ITEMS_PER_PAGE) {
                        numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
                    }
                
                    res.render('home', { category_param: category,
                                         categories: categories,
                                         useRangeBasedPagination: false,
                                         itemCount: itemCount,
                                         pages: numPages,
                                         page: page,
                                         items: pageItems });
                    
                });
            });
        });
    });

    
    router.get("/search", function(req, res) {
        "use strict";

        var page = req.query.page ? parseInt(req.query.page) : 0;
        var query = req.query.query ? req.query.query : "";

        items.searchItems(query, page, ITEMS_PER_PAGE, function(searchItems) {

            items.getNumSearchItems(query, function(itemCount) {

                var numPages = 0;
                
                if (itemCount > ITEMS_PER_PAGE) {
                    numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
                }
                
                res.render('search', { queryString: query,
                                       itemCount: itemCount,
                                       pages: numPages,
                                       page: page,
                                       items: searchItems });
                
            });
        });
    });


    router.get("/item/:itemId", function(req, res) {
        "use strict";

        var itemId = parseInt(req.params.itemId);

        items.getItem(itemId, function(item) {
            console.log(item);

            if (item == null) {
                res.status(404).send("Item not found.");
                return;
            }
            
            var stars = 0;
            var numReviews = 0;
            var reviews = [];
            
            if ("reviews" in item) {
                numReviews = item.reviews.length;

                for (var i=0; i<numReviews; i++) {
                    var review = item.reviews[i];
                    stars += review.stars;
                }

                if (numReviews > 0) {
                    stars = stars / numReviews;
                    reviews = item.reviews;
                }
            }

            items.getRelatedItems(function(relatedItems) {

                console.log(relatedItems);
                res.render("item",
                           {
                               userId: USERID,
                               item: item,
                               stars: stars,
                               reviews: reviews,
                               numReviews: numReviews,
                               relatedItems: relatedItems
                           });
            });
        });
    });


    router.post("/item/:itemId/reviews", function(req, res) {
        "use strict";

        var itemId = parseInt(req.params.itemId);
        var review = req.body.review;
        var name = req.body.name;
        var stars = parseInt(req.body.stars);

        items.addReview(itemId, review, name, stars, function(itemDoc) {
            res.redirect("/item/" + itemId);
        });
    });


    /*
     *
     * Since we are not maintaining user sessions in this application, any interactions with 
     * the cart will be based on a single cart associated with the the USERID constant we have 
     * defined above.
     *
     */
    router.get("/cart", function(req, res) {
        res.redirect("/user/" + USERID + "/cart");
    });

               
    router.get("/user/:userId/cart", function(req, res) {
        "use strict";

        var userId = req.params.userId;
        cart.getCart(userId, function(userCart) {
            var total = cartTotal(userCart);
            res.render("cart",
                       {
                           userId: userId,
                           updated: false,
                           cart: userCart,
                           total: total
                       });
        });
    });

    
    router.post("/user/:userId/cart/items/:itemId", function(req, res) {
        "use strict";

        var userId = req.params.userId;
        var itemId = parseInt(req.params.itemId);

        var renderCart = function(userCart) {
            var total = cartTotal(userCart);
            res.render("cart",
                       {
                           userId: userId,
                           updated: true,
                           cart: userCart,
                           total: total
                       });
        };

        cart.itemInCart(userId, itemId, function(item) {
            if (item == null) {
                items.getItem(itemId, function(item) {
                    item.quantity = 1;
                    cart.addItem(userId, item, function(userCart) {
                        renderCart(userCart);
                    });
            
                });
            } else {
                cart.updateQuantity(userId, itemId, item.quantity+1, function(userCart) {
                    renderCart(userCart);
                });
            }
        });
    });


    router.post("/user/:userId/cart/items/:itemId/quantity", function(req, res) {
        "use strict";
        
        var userId = req.params.userId;
        var itemId = parseInt(req.params.itemId);
        var quantity = parseInt(req.body.quantity);

        cart.updateQuantity(userId, itemId, quantity, function(userCart) {
            var total = cartTotal(userCart);
            res.render("cart",
                       {
                           userId: userId,
                           updated: true,
                           cart: userCart,
                           total: total
                       });
        });
    });
    

    function cartTotal(userCart) {
        "use strict";

        var total = 0;
        for (var i=0; i<userCart.items.length; i++) {
            var item = userCart.items[i];
            total += item.price * item.quantity;
        }

        return total;
    }

    
    // Use the router routes in our application
    app.use('/', router);

    // Start the server listening
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Mongomart server listening on port %s.', port);
    });

});
