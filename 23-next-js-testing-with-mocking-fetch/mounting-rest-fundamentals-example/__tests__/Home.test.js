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

// we're going to run our server once before all of the tests are run.
// you can refer to these docs https://jestjs.io/docs/setup-teardown#one-time-setup
// to see what's up here.
// next class we'll begin by starting the server before all tests
beforeAll(()=> {
  // simulate the server starting
  server.listen()
  // refer to these docs: https://mswjs.io/docs/getting-started#step-3-integrate
})
// close the server after all tests
afterAll(()=> {
  server.close()
})

// we're going to perform two tests
// 1. tests quotes on load
it("should load a quote on the home page", async () => {
  // since we're doing a bit of a complex state change
  await act(()=> {
    render(<Home />)
  })
  // the above should load the quote
  // we're going to fetch the elements quote and author
  let quoteElement = screen.getByTestId("quote")
  let authorElement = screen.getByTestId("author")

  // we're going to make these tests fail
  // expect(quoteElement).not.toHaveTextContent(QUOTE)
  // expect(authorElement).not.toHaveTextContent(AUTHOR)
  // this should fail because it should have that QUOTE from the api.
  // let's make these tests pass
  expect(quoteElement).toHaveTextContent(QUOTE)
  expect(authorElement).toHaveTextContent(AUTHOR)
  // remember that the toHaveTextContent matcher is from testing-library/jsdom.
})

// 2. a new quote is loaded when button is clicked
it("should load a new quote when the button is clicked", async () => {
  // the thing that is going to be a tad bit different here is that
  // you're going to change what the mock returns in this test

  // 1. render the component
  await act(()=> {
    render(<Home />)
  })
  // 2. is i'm going swap the response of the server here at the endpoing
  //    to respond with something different
  // to do this we're going to use server.use docs here: https://mswjs.io/docs/api/setup-server/use/
  // we are going to "swap" what our server is going to respond with
  const NEW_QUOTE = "Family."
  const NEW_AUTHOR = "Vin Diesel"
  // hey server use this new api instance
  server.use(
    http.get(
      `${BASE_URL}/api/random_quote`, // path that's mocked
      () => { // the sample response
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
          // note here this is what changes.
          quote: NEW_QUOTE,
          author: NEW_AUTHOR
        })
      }
    )
  )
  // 3. get the elements: quote, author and button
  let button = screen.getByTestId("new-quote-button")

  // 4. we're going to click the new button
  // we're doing a complex state change like the above
  await act(()=> {
    button.click()
  })

  // we're going to get the elements
  let quoteElement = screen.getByTestId("quote")
  let authorElement = screen.getByTestId("author")

  // 5. make our assertions.
  // again you make it fail first
  // expect(quoteElement).toHaveTextContent(QUOTE)
  // expect(authorElement).toHaveTextContent(AUTHOR)
  // make them pass
  expect(quoteElement).toHaveTextContent(NEW_QUOTE)
  expect(authorElement).toHaveTextContent(NEW_AUTHOR)
})
