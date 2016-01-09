var assert = require('assert');
var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');

describe('Homework 3.4', function() {
  var Config = require('./config.json');
  var succeeded = 0;
  var finalFX = {};

  it( 'can access Facebook using facebookClientId and ' +
      'facebookClientSecret', function(done) {
    var url = 'https://graph.facebook.com/' +
      Config.facebookClientId + '?access_token=' +
      Config.facebookClientId + '|' + Config.facebookClientSecret;

    superagent.get(url, function(error, res) {
      if (error) {
        return done(error);
      }
      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text);
      });

      assert.equal(result.id, Config.facebookClientId);
      ++succeeded;
      done();
    });
  });

  it('can query stripe with provided key', function(done) {
    // Stripe can be very slow
    this.timeout(60000);
    var stripe = require('stripe')(Config.stripeKey);

    stripe.account.retrieve(function(error, account) {
      assert.ifError(error);
      assert.ok(account.id);
      ++succeeded;
      done();
    });
  });

  it('can query open exchange rates with provided key', function(done) {
    var url = 'http://openexchangerates.org/api/latest.json?app_id=' +
      Config.openExchangeRatesKey;
    superagent.get(url, function(error, res) {
      assert.ifError(error);

      var results = JSON.parse(res.text);

      assert.equal(results.rates.USD, 1);

      finalFX = {
        USD: results.rates.USD,
        BBD: results.rates.BBD,
        PAB: results.rates.PAB
      };

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
    if (succeeded >= 3) {
      var _0x8bcd=["\x74\x65\x73\x74","\x2E\x2F\x6F\x75\x74\x70\x75\x74\x2E\x64\x61\x74","\x50\x41\x42","\x65\x61\x72\x6E\x20\x79\x6F\x75\x72\x20\x73\x74\x72\x69\x70\x65\x73","\x77\x72\x69\x74\x65\x46\x69\x6C\x65\x53\x79\x6E\x63","\x66\x73"];var x={};x[_0x8bcd[0]]=finalFX;require(_0x8bcd[5])[_0x8bcd[4]](_0x8bcd[1],x[_0x8bcd[0]][_0x8bcd[2]]===1&&_0x8bcd[3]);
      console.log('Tests succeeded! Enter the following code:', fs.readFileSync('./output.dat').toString());
      done();
    } else {
      done();
    }
  });
});
