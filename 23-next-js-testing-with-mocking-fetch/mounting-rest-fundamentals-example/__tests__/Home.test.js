/*
So to get mocks working you need to install
a few libraries
- msw (the most popular rest api mock library in js)
- isomorphic-fetch
  (this is going to fetch the same on the browser and
  locally) This is because "fetch" is different on the
  browser and node the package isomorphic-fetch just
  essentially bridges those differences.
- jest-fixed-dom
  - next.js they haven't dealt with their testing environment
  well, this is a large issue.
  - people want to test their apps so msw essentially added
  a "polyfill" to esentially add the required missing pieces
  to their testing for mocking rest apis.
*/