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
    - you have to edit the testEnvironment in jest.config.js
    for this to work.
*/
// note this line is explained above
import 'isomorphic-fetch'

// let's import what we need from react testing
// library: render, screen, act
import {render, screen, act} from "@testing-library/react"
// import all of the matchers
import '@testing-library/jest-dom'

// we're going to need a few things from msw
// so that we can mockout the rest endpoint
// reference: https://mswjs.io/docs/getting-started#step-1-install
import { http, HttpResponse } from 'msw'
// this is going to be used for the "mock" requests and responses
import { setupServer } from 'msw/node' // setup the server

// le'ts import our component
import Home from '../pages/index.js'
// let's import the base url
import { BASE_URL } from '../utils/api/base.js'

// let's setup a sample quote
// this is going to be "dummy"/mock data of our endpoint
const QUOTE = "Every great story seems to begin with a snake"
const AUTHOR = "Nicholas Cage"


// we are going to set up our mock endpoints
// taking a look at getRandomQuote in `utils/api/quotes`
// we only have one request that we're going to mock.
// first we need to set up a server
const server = setupServer(
  // this will have all of the endpoints as arguments
  http.get(
    `${BASE_URL}/api/random_quote`, // path that's mocked
    () => { // the sample response
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        quote: QUOTE,
        author: AUTHOR
      })
    }
  )
)

// next class we'll begin by starting the server before all tests

// close the server after all tests


// we're going to perform two tests
// 1. tests quotes on load
// 2. a new quote is loaded when button is clicked