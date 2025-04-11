// is we're going to import a few things from
// react testing library see here https://testing-library.com/docs/react-testing-library/example-intro
// so that we can render our application.
import {fireEvent, act, render, screen} from '@testing-library/react'
// this is needed to render the component and access pieces within that component
// we need fireEvent and act to perform state changes in our
// application
import '@testing-library/jest-dom'
// this library is needed so that we can use different matchers that
// will enhance how we test the application.
import TodoList from '../components/TodoList'
// above is the component we're going to test.
// a sample test in jest so you can see what's going here.
// the first arg is the description, the second is the function that will
// perform the test.
test("tests 2 - 1 is equal to one", () => {

  // our tested value
  let value = 2-1
  // let's make this test fail first just to see what it looks like
  // expect(value).toEqual(65)
  // the above fails but we could turn this into a positive using .not. (the opposite)
  expect(value).not.toEqual(65)

  // test that this is true
  expect(value).toEqual(1)

})

// to learn a little about how the testing
// works let's check that the title
// is what it is.
test("todo list title renders correctly.", ()=> {
  // we're going to render our component
  // with react testing libraries' render
  render(<TodoList />)

  // with screen (a part of react testing library)
  // we're going to get our element by it's text
  const titleElement = screen.getByText("Our Todo List")

  // using the matchers from @testing-library/jest-dom
  // I'm going to check to see if this is in the document
  // let's make it fail first.
  // expect(titleElement).not.toBeInTheDocument()
  // the above fails let's make it pass
  expect(titleElement).toBeInTheDocument()
})

test("todo item added to the list successfully", ()=> {
  // the process to do this:
  // render the component
  render(<TodoList />)
  // get the input, button, list elements via different methods
  const inputElement = screen.getByLabelText("New Todo") // reference: https://testing-library.com/docs/queries/about/#priority
  const button = screen.getByText("Add Todo")
  // this is a note, you can get by test id.
  const listElement = screen.getByTestId("todo-item-list")
  // "simulate" typing into the todo list
  // the value we'll put in here to our element
  const EXPECTED_STRING = "Testing, feels like the first time (the very first time)"
  // for elements that are just updating the state of an
  // an input and that's it you can use fireEvent which will
  // simulate the "change" event trigger, and we can customize
  // what the event object will look like.
  fireEvent.change(
    inputElement, // the element to fire the event on.
    { // the is going to be the simulated "event" object
      target: {
        value: EXPECTED_STRING
      }
    }
  )
  // check to see if the input has that text
  // but the first time you're going to make the test fail
  // expect(inputElement.value).not.toBe(EXPECTED_STRING)
  // make the tests pass.
  expect(inputElement.value).toBe(EXPECTED_STRING)
  // click the button of add todo
  // act needs to be called when you're doing a more complex
  // state change normally two or more
  act(()=> {
    button.click() // how to fire an event of a click on a button
  })
  // check to see if the input is empty
  // make the tests fail first (it changed after button click)
  // expect(inputElement.value).toBe(EXPECTED_STRING)
  expect(inputElement.value).toBe("")

  // check to see fi the list has the string.
  // we can check to see if the the list has some text content here
  // reference: https://github.com/testing-library/jest-dom?tab=readme-ov-file#tohavetextcontent
  // make the tests fail
  // expect(listElement).toHaveTextContent("gary")
  // make them pass
  expect(listElement).toHaveTextContent(EXPECTED_STRING)
})