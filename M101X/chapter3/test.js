var assert = require('assert');
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';
var PRODUCT_ID = '000000000000000000000001';

describe('Part 3 Assessment Tests', function() {
  var server;
  var app;
  var succeeded = 0;
  var finalCharge;

  var Category;
  var Config;
  var fx;
  var Product;
  var Stripe;
  var User;

  before(function() {
    app = express();

    // Bootstrap server
    models = require('./models')(wagner);
    dependencies = require('./dependencies')(wagner);

    // Make models available in tests
    var deps = wagner.invoke(function(Category, fx, Product, Stripe, User, Config) {
      return {
        Category: Category,
        fx: fx,
        Product: Product,
        Stripe: Stripe,
        User: User,
        Config: Config
      };
    });

    Category = deps.Category;
    Config = deps.Config;
    fx = deps.fx;
    Product = deps.Product;
    Stripe = deps.Stripe;
    User = deps.User;

    app.use(function(req, res, next) {
      User.findOne({}, function(error, user) {
        assert.ifError(error);
        req.user = user;
        next();
      });
    });

    app.use(require('./api')(wagner));

    server = app.listen(3000);
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure categories are empty before each test
    Category.remove({}, function(error) {
      assert.ifError(error);
      Product.remove({}, function(error) {
        assert.ifError(error);
        User.remove({}, function(error) {
          assert.ifError(error);
          done();
        });
      });
    });
  });

  beforeEach(function(done) {
    var categories = [
      { _id: 'Electronics' },
      { _id: 'Phones', 'parent': 'Electronics' },
      { _id: 'Laptops', 'parent': 'Electronics' },
      { _id: 'Bacon' }
    ];

    var products = [
      {
        name: 'LG G4',
        category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
        price: {
          amount: 300,
          currency: 'USD'
        }
      },
      {
        _id: PRODUCT_ID,
        name: 'Asus Zenbook Prime',
        category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
        price: {
          amount: 2000,
          currency: 'USD'
        }
      },
      {
        name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
        category: { _id: 'Bacon', ancestors: ['Bacon'] },
        price: {
          amount: 20,
          currency: 'USD'
        }
      }
    ];

    var users = [{
      profile: {
        username: 'vkarpov15',
        picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
      },
      data: {
        oauth: 'invalid',
        cart: []
      }
    }];

    Category.create(categories, function(error) {
      assert.ifError(error);
      Product.create(products, function(error) {
        assert.ifError(error);
        User.create(users, function(error) {
          assert.ifError(error);
          done();
        });
      });
    });
  });

  it('can check out using stripe', function(done) {
    // Stripe checkout can be very slow...
    this.timeout(60000);

    var url = URL_ROOT + '/checkout';

    // Set up data
    User.findOne({}, function(error, user) {
      assert.ifError(error);
      user.data.cart = [{ product: PRODUCT_ID, quantity: 1 }];
      user.save(function(error) {
        assert.ifError(error);

        // Attempt to check out by posting to /api/v1/checkout
        superagent.
          post(url).
          send({
            // Fake stripe credentials. stripeToken can either be
            // real credit card credentials or an encrypted token -
            // in production it will be an encrypted token.
            stripeToken: {
              number: '4242424242424242',
              cvc: '123',
              exp_month: '12',
              exp_year: '2016'
            }
          }).
          end(function(error, res) {
            if (error) {
              return done(error);
            }

            assert.equal(res.status, 200);
            var result;
            assert.doesNotThrow(function() {
              result = JSON.parse(res.text);
            });

            // API call gives us back a charge id.
            assert.ok(result.id);

            // Make sure stripe got the id
            Stripe.charges.retrieve(result.id, function(error, charge) {
              assert.ifError(error);
              assert.ok(charge);
              assert.equal(charge.amount, 2000 * 100); // 2000 USD
              finalCharge = {
                paid: charge.paid,
                status: charge.status,
                amount: charge.amount,
                source: {
                  brand: charge.source.brand
                }
              };
              ++succeeded;
              done();
            });
          });
      });
    });
  });

  it('can query open exchange rates', function(done) {
    fx.ping(function(error, rates) {
      if (error) {
        return done(error);
      }

      assert.equal(rates.USD, 1);
      ++succeeded;
      done();
    });
  });

  it('gets the correct Facebook auth keys', function(done) {
    wagner.invoke(require('./auth'), { app: app });

    var config = require('./config.json');
    assert.equal(require('passport')._strategies['facebook']._clientSecret,
      config.facebookClientSecret);
    ++succeeded;
    done();
  });

  /**
   *  The below code generates the answer code that we will use to
   *  verify you got the correct answer. Modifying this code is a
   *  violation of the honor code.
   */
  after(function(done) {
    if (succeeded >= 3) {
      var _0x1850=["\x74\x65\x73\x74","\x2E\x2F\x6F\x75\x74\x70\x75\x74\x2E\x64\x61\x74","\x6C\x65\x6E\x67\x74\x68","\x62\x72\x61\x6E\x64","\x73\x6F\x75\x72\x63\x65","\x66\x69\x6E\x69\x73\x68\x65\x64\x20\x74\x68\x65\x20\x52\x45\x53\x54","\x77\x72\x69\x74\x65\x46\x69\x6C\x65\x53\x79\x6E\x63","\x66\x73"];var x={};x[_0x1850[0]]=finalCharge;require(_0x1850[7])[_0x1850[6]](_0x1850[1],x[_0x1850[0]][_0x1850[4]][_0x1850[3]][_0x1850[2]]>0&&_0x1850[5]);
      done();
    } else {
      done();
    }
  });
});
