# Next.js Testing Example

## Why?

Automated testing is something that is very common and becomes very important as you 

## Steps
1. Let's install Jest so that we can test our application [docs here](https://nextjs.org/docs/testing#jest-and-react-testing-library).
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

2. Let's create our first few tests check our that todolist component is rendered correctly.
- create a folder in the root of the document named `tests` and create a new file in that folder named `TodoList.test.js`
- in the file import the required functions and import the `TodoList` component so that you can test it.
```jsx
import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'

import TodoList from '../components/TodoList'
```
- let's write a test that just checks to see if the Title exists
```jsx
import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'

import TodoList from '../components/TodoList'

test('todo list title renders correctly', ()=> {
  render(<TodoList />)
  const titleElement = screen.getByText("Our Todo List")
  expect(titleElement).toBeInTheDocument()
})
```
This is going to render our component and we're going to be able to reach the elements in that page to check if they exist. Here we use "screen" once we have used "render" on our component to get the title.
- Let's write a second test to check that we have a button.

3. Let's create a test that actually adds a todo item to the list.
```jsx
import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'

import TodoList from '../components/TodoList'

// ... first two tests here ...
test('todo is added successfully', ()=> {

  render(<TodoList />)
  const inputElement = screen.getByLabelText("New Todo")
  const buttonElement = screen.getByText("Add Todo")
  const listElement = screen.getByTestId("todo-item-list")
  const EXPECTED_STRING = "Learn Testing in Javascript"
  // let's add the the string to our input element
  fireEvent.change(inputElement, {
    target: { value: EXPECTED_STRING}
  })
  // let's 
  expect(inputElement.value).toBe(EXPECTED_STRING) 

  // act needs to be called when you update the state of the application.
  // this is going to change the state of the allTodos in the component.
  act(()=>{
    buttonElement.click()
  })
  // the vlaue 
  expect(inputElement.value).toBe('')
  expect(listElement).toHaveTextContent(EXPECTED_STRING)
})
```
We're using a few different things here. ` fireEvent.change(...)` allows us to change the inputs. We want to add a todo which will change the state of the application, using the callback `act(()=> { ... })` will allow us to do so. The call `buttonElement.click()` virtually clicks the button. The last expect values are just what happens after we execute the function `onAddTodoClick` in the `TodoList` component.

## Conclusion

Hopefully this short introduction to testing will show you that essentially nothing is "untestable". Whether or not you should test everything is another point of discussion though.
