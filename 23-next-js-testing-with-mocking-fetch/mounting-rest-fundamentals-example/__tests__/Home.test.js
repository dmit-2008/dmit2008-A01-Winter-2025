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
const QUOTE = "Every great story seems to begin with a snake"
const AUTHOR = "Nicholas Cage"


// we are going to set up our mock endpoints
// taking a look at getRandomQuote in `utils/api/quotes`
// we only have one request that we're going to mock.