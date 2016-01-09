# Code Exercise

In this part, you set up several REST API endpoints:

* `GET /category/id/:id`
* `GET /category/parent/:id`
* `GET /product/id/:id`
* `GET /product/category/:id`
* `PUT /me/cart`
* `GET /me`
* `POST /checkout`
* `GET /product/text/:query`

Which depend on 5 services:

* Category
* Product
* User
* Stripe
* fx

The configuration for these services was defined using environment variables.
Specifically, there are 4 environment variables that you had to set to make
this API work correctly: `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`,
`STRIPE_API_KEY`, and `OPEN_EXCHANGE_RATES_KEY`. While environment variables are
good for one-off examples, having to set 4 environment variables is cumbersome
for development. The purpose of this exercise is to create a new `config`
service that loads these credentials from a single file when the server starts.

## Homework 3.4

The first step is to make sure you have all 4 of these keys. This step is
necessary to run a fully-functional server for the AngularJS and Ionic framework
parts of this course.

In the `code` directory, open up the `config.json` file. You should see the
following code:

```javascript
{
  "facebookClientId": "TODO",
  "facebookClientSecret": "TODO",
  "stripeKey": "TODO",
  "openExchangeRatesKey": "TODO"
}
```

As you might expect, the `facebookClientId`, `facebookClientSecret`,
`stripeKey`, and `openExchangeRatesKey` keys correspond to the
`FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, `STRIPE_API_KEY`, and
`OPEN_EXCHANGE_RATES_KEY` environment variables, respectively. Replace the
"TODO" strings with strings representing the credentials for your Facebook app,
your Stripe API key, and your Open Exchange Rates key. Once you have done this,
run `npm run check-credentials`. If you have entered keys successfully,
`npm run check-credentials` will output a short phrase.
Please enter that phrase in your browser to validate
that you have successfully completed this exercise.

## Homework 3.5

There are 3 places where you access environment variables:

* `auth.js` and the `setupAuth()` function, where you get the
Facebook environment variables.
* `dependencies.js`, where you get the Stripe key.
* `fx.js`, where you get the Open Exchange Rates key.

You need to modify each of these to use the new `Config` service that's defined
in `dependencies.js` and registered in `dependencies.js`. The
`Config` service simply reads the `config.json` file in the assessment's top
level directory. You will also have to fill out `config.json` with your
Facebook app keys, Stripe key, and Open Exchange Rates key.

Once you have successfully entered your keys into `config.json` and modified
the above 3 code locations to use the `Config` service, `npm run watch` will
output a short phrase. Please enter that phrase in your browser to validate
that you have successfully completed this exercise.
