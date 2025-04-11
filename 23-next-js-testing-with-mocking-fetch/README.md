# Next.js React Testing with Fetch Calls.

# Why?

Most of our applications will use fetch, and we only want to test code that we write. This means that we don't test any external packages that we import or any rest api calls we may make.

# Steps
1. Let's install Jest (like the last example) so that we can test our application [docs here](https://nextjs.org/docs/testing#jest-and-react-testing-library).
- install the required packages
```
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```
- at the base of your project create a file named `jest.config.js` and add the following contents to it.
```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
```
- in the `package.json` file add an entry in the script named "test" to run "jest"
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test-watch": "jest --watch"
  },
```
the command `npm run test-watch` will essentially just continue to run the tests as we change them. Run this now and we'll see that there's no tests so we'll go write one!

1. Install the mock server worker and isomorphic-fetch so that we can "mock" out the calls to quotable.io. also install install jest-fixed-dom.
```
npm install msw isomorphic-fetch jest-fixed-dom --save-dev
```
1. update the jest.config.js with jest-fixed-dom.
```js
// jest.config.js
// ... rest of the config ...
const customJestConfig = {
    // everything stays the same.
    testEnvironment: 'jest-fixed-jsdom', // change this.
}
// ... rest of the config ...
```
2. Create a `Home.test.js` in a newly created folder named `tests` that's at the root of the application, setup the mock service worker `msw` package and import our testing requirements.
- create the file `tests/Home.test.js`
- in the file import the following
```jsx
import 'isomorphic-fetch' // needed for no "fetch is not defined errors

import { render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'

import { rest } from 'msw'; // this will essentially mock the rest calls.
import { setupServer } from 'msw/node'; // we'll set up a "mocked" server

import { BASE_URL } from '../utils/api/base.js'; // we'll need this for our "mocked" server
import Home from '../pages/index.js'

```
- setup your server so that it begins to listen to `beforeAll` of the tests and closes `afterAll` of the tests are done.
```jsx
// ... imports from above ...

const QUOTE = "All I required to be happy was friendship and people I could admire."
const AUTHOR = "Charles Baudelaire"

const server = setupServer(

    rest.get(`${BASE_URL}/random`, (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            {"_id":"someid",
            "content": QUOTE,
            "author": AUTHOR,
            }
        ))
    })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

// ... we'll write our tests down here ...
```
Note:
Here we use `setupServer` with one argument, if you wanted to handle multiple requests just keep on adding them as different arguments. You could also add of the `rest` requests in an array and then spread that array in the `setupServer` as
arguments.
See that `beforeAll` will be called before all the `test`s
See that `afterAll` will be called after all the `test`s

3. Let's write a test that will wait for the `useEffect` to render our first load of the `Home` component.
```jsx
// ... imports here ...

// the following two lines are shown for emphasis.
const QUOTE = "All I required to be happy was friendship and people I could admire."
const AUTHOR = "Charles Baudelaire"

// ... server setup (above) here, mocked with QUOTE, AUTHOR ...
test("test home loads a quote on load", async () => {
    // wait for the home piece to render.
    await act(() => {
        render(<Home/>)
    })
    // get the author and quote element
    let quoteElement = screen.getByTestId("quote")
    let authorElement = screen.getByTestId("author")

    // check to see that they are equal to the new values.
    expect(quoteElement).toHaveTextContent(QUOTE)
    expect(authorElement).toHaveTextContent(AUTHOR)
})
```
This is using an using function because it needs to wait for the `useEffect` to fire on mount.
Second we see that our quotes are not the original values we see in the `Home` components (see they are different than `DEFAULT_QUOTE`, `DEFAULT_AUTHOR`) and that our values are now equal to the `QUOTE` and `AUTHOR`.

NOTE: this needs to be an "async" function that "awaits" the act or you'll struggle.

4. Let's write a test that checks the quote is changed on the `Home` component after the button is clicked.
```jsx
// ... imports here ...

// the following two lines are shown for emphasis.
const QUOTE = "All I required to be happy was friendship and people I could admire."
const AUTHOR = "Charles Baudelaire"

// ... server setup (above) here, mocked with QUOTE, AUTHOR ...
test("home loads a new quote when clicking the button.", async () => {
    // load the
    await act(() => {
        render(<Home/>)
    })

    // add a very important quote that will change your life like below.
    const NEW_QUOTE = "I can shoot 3s with my eyes closed."
    const NEW_AUTHOR = "Dan Mouris"

    // create a new request with the new quote and author.
    server.use(
        rest.get(`${BASE_URL}/random`, (req, res, ctx) => {
            // respond using a mocked JSON body
            return res(ctx.json(
                {"_id":"someid",
                "content": NEW_QUOTE,
                "author": NEW_AUTHOR,
                }
            ))
        })
    )
    // get the elements
    let quoteElement = screen.getByTestId("quote")
    let authorElement = screen.getByTestId("author")
    let buttonElement = screen.getByTestId("new-quote-button")

    // click the new button and wait for the state to change.
    await act(() => {
        buttonElement.click()
    })

    // ensure that the new values have been updated correctly.
    expect(quoteElement).toHaveTextContent(NEW_QUOTE)
    expect(authorElement).toHaveTextContent(NEW_AUTHOR)
})
```
First we have the `Home` component rendered with the `QUOTE` and `AUTHOR` values.
Second we mock the server to respond with the `NEW_QUOTE` and `NEW_AUTHOR` with the function `server.use` and passing in a `rest` request.
Third we get the elements and "await" the button click.
Fourth we test to make sure that our component has been updated successfully.

## Conclusion

This is how to mock out and test restful APIs in React. You'll need to do this a lot.
For more information about the [MSW package the docs are here](https://mswjs.io/docs/getting-started)
For mroe info about [isomorphic fetch the docs are here](https://github.com/matthew-andrews/isomorphic-fetch), although we did exactly what it does here.


## Challenge
Write a test that checks to see that the `numberOfQuotes` has been fetched the correct number of times.
- should expect once after load
- should expect twice after one button click
