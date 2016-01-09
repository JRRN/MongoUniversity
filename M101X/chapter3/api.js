var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.put('/me/cart', wagner.invoke(function(User) {
    return function(req, res) {
      try {
        var cart = req.body.data.cart;
      } catch(e) {
        return res.
          status(status.BAD_REQUEST).
          json({ error: 'No cart specified!' });
      }

      req.user.data.cart = cart;
      req.user.save(function(error, user) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        return res.json({ user: user });
      });
    };
  }));

  api.get('/me', function(req, res) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }

    res.json({ user: req.user });
    //req.user.populate({ path: 'data.cart.product', model: 'Product' }, handleOne.bind(null, 'user', res));
  });

  api.post('/checkout', wagner.invoke(function(User, Stripe) {
    return function(req, res) {
      if (!req.user) {
        return res.
          status(status.UNAUTHORIZED).
          json({ error: 'Not logged in' });
      }

      // Populate the products in the user's cart
      req.user.populate({ path: 'data.cart.product', model: 'Product' }, function(error, user) {

        // Sum up the total price in USD
        var totalCostUSD = 0;
        _.each(user.data.cart, function(item) {
          totalCostUSD += item.product.internal.approximatePriceUSD *
            item.quantity;
        });

        // And create a charge in Stripe corresponding to the price
        Stripe.charges.create(
          {
            // Stripe wants price in cents, so multiply by 100 and round up
            amount: Math.ceil(totalCostUSD * 100),
            currency: 'usd',
            source: req.body.stripeToken,
            description: 'Example charge'
          },
          function(err, charge) {
            if (err && err.type === 'StripeCardError') {
              return res.
                status(status.BAD_REQUEST).
                json({ error: err.toString() });
            }
            if (err) {
              console.log(err);
              return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString() });
            }

            req.user.data.cart = [];
            req.user.save(function() {
              // Ignore any errors - if we failed to empty the user's
              // cart, that's not necessarily a failure

              // If successful, return the charge id
              return res.json({ id: charge.id });
            });
          });
      });
    };
  }));

  return api;
};

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
