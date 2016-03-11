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


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function CartDAO(database) {
    "use strict";

    this.db = database;

    
    this.getCart = function(userId, callback) {
        "use strict";
        
        /*
        * TODO-lab5
        *
        * LAB #5: 
        * Query the "cart" collection by userId and pass the cart to the 
        * callback function.
        *
        */
        var doc ="";
        this.db.collection("cart")
            .find({"userId" :  userId })
            .toArray(function(err, userCart) {
                doc = JSON.stringify(userCart);
                console.log(doc);
                assert.equal(null, err);
                var userCart = {
                    userId: userId,
                    items: doc
                }
                callback(userCart);
        });

        /*var dummyItem = this.createDummyItem();
        userCart.items.push(dummyItem);*/
        
        // TODO-lab5 Replace all code above (in this method).


        //console.log(userCart);
        //callback(userCart);
    }


    this.itemInCart = function(userId, itemId, callback) {
        "use strict";

        /*
         *
         * TODO-lab6
         * 
         * LAB: #6
         *
         * Write a query that will determine whether or not the cart associated 
         * with the userId contains an item identified by itemId. If the cart 
         * does contain the item, pass the item to the callback. If it does not, 
         * pass the value null to the callback. 
         *
         * NOTE: You should pass only the matching item to the callback. Do not 
         * pass an array of one or more items or the entire cart.
         *
         * SUGGESTION: While it is not necessary, you might find it easier to 
         * use the $ operator in a projection document in your call to find() as 
         * a means of selecting the matching item. Again, take care to pass only 
         * the matching item (not an array) to the callback. See:
         * https://docs.mongodb.org/manual/reference/operator/projection/positional/
         *
         * As context for this method to better understand its purpose, look at 
         * how cart.itemInCart is used in the mongomart.js app. 
         *
         */

        callback(null);

        // TODO-lab6 Replace all code above (in this method).
    }

    
    /*
     * This solution is provide as an example to you of several query
     * language features that are valuable in update operations. 
     * This method adds the item document passed in the item parameter to the 
     * user's cart. Note that this solution works regardless of whether the
     * cart already contains items or is empty. addItem will be called only 
     * if the cart does not already contain the item. The route handler:
     * router.post("/user/:userId/cart/items/:itemId"...
     * handles this. Please review how that method works to have a complete 
     * understanding of how addItem is used.
     *
     * NOTE: One may use either updateOne() or findOneAndUpdate() to
     * write this method. We did not discuss findOneAndUpdate() in class,
     * but it provides a very straightforward way of solving this problem.
     * See the following for documentation:
     * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndUpdate
     *
     */
    this.addItem = function(userId, item, callback) {
        "use strict";

        // Will update the first document found matching the query document.
        this.db.collection("cart").findOneAndUpdate(
            // query for the cart with the userId passed as a parameter.
            {userId: userId},
            // update the user's cart by pushing an item onto the items array
            {"$push": {items: item}},
            // findOneAndUpdate() takes an options document as a parameter.
            // Here we are specifying that the database should insert a cart
            // if one doesn't already exist (i.e. "upsert: true") and that
            // findOneAndUpdate() should pass the updated document to the
            // callback function rather than the original document
            // (i.e., "returnOriginal: false").
            {
                upsert: true,
                returnOriginal: false
            },
            // Because we specified "returnOriginal: false", this callback
            // will be passed the updated document as the value of result.
            function(err, result) {
                assert.equal(null, err);
                // To get the actual document updated we need to access the
                // value field of the result.
                callback(result.value);
            });

        /*

          Without all the comments this code looks written as follows.

        this.db.collection("cart").findOneAndUpdate(
            {userId: userId},
            {"$push": {items: item}},
            {
                upsert: true,
                returnOriginal: false
            },
            function(err, result) {
                assert.equal(null, err);
                callback(result.value);
            });
        */
        
    };


    this.updateQuantity = function(userId, itemId, quantity, callback) {
        "use strict";
        
        /*
        * TODO-lab7
        *
        * LAB #7: Update the quantity of an item in the user's cart in the 
        * database by setting quantity to the value passed in the quantity 
        * parameter. If the value passed for quantity is 0, remove the item 
        * from the user's cart stored in the database.
        *
        * Pass the updated user's cart to the callback.
        *
        * NOTE: Use the solution for addItem as a guide to your solution for
        * this problem. There are several ways to solve this. By far, the 
        * easiest is to use the $ operator. See:
        * https://docs.mongodb.org/manual/reference/operator/update/positional/
        *
        */

        var userCart = {
            userId: userId,
            items: []
        }
        var dummyItem = this.createDummyItem();
        dummyItem.quantity = quantity;
        userCart.items.push(dummyItem);
        callback(userCart);
        
        // TODO-lab7 Replace all code above (in this method).

    }

    this.createDummyItem = function() {
        "use strict";

        var item = {
            _id: 1,
            title: "Gray Hooded Sweatshirt",
            description: "The top hooded sweatshirt we offer",
            slogan: "Made of 100% cotton",
            stars: 0,
            category: "Apparel",
            img_url: "/img/products/hoodie.jpg",
            price: 29.99,
            quantity: 1,
            reviews: []
        };

        return item;
    }

}


module.exports.CartDAO = CartDAO;
