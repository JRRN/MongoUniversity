# Code Exercise

In this exercise, you will implement the search view for the mobile app.
Similar to the AngularJS chapter's assessment, this view will include a
search bar that searches for products by
text, that is, using the `/api/v1/product/text/:query` REST API endpoint.

You will primarily be concerned with writing code that passes the mocha tests
specified in the `test.js` file. Once you implement code that passes these
tests, you should be able to start the Ionic CLI with `ionic serve --lab`
and a server with `node index.js` from the server directory (as long as you
copied `config.json` from the REST API assessment) to see your app in action.
However, once again, we recommend implementing your code using the tests rather
than eyeballing it in `ionic serve --lab`.

To complete this assignment, you need to do 2 things:

1. You need to add a 'tab.search' state to `www/js/app.js` that displays the
'templates/tab-search.html' view when the user is directed on the `/search` URL.
1. You need to create a view in 'tab-search.html' that includes the
'searchBar' directive within an `ion-view` and an `ion-content` directive.

In order to run tests, you should:

1. Run `npm install` in the provided sample code
1. Start karma using `./node_modules/karma/bin/karma start ./karma.local.conf.js`
1. Modify `www/js/app.js` and `www/templates/tab-search.html` until the tests pass
and karma gives you the below output:

```
LOG: 'Tests Succeeded! Copy/paste the below code to complete this assignment:'
LOG: '<secret code here>'
Chrome 43.0.2357 (Linux): Executed 4 of 4 SUCCESS (0.21 secs / 0.126 secs)
```
