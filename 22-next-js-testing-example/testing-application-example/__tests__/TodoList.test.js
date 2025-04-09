// is we're going to import a few things from
// react testing library see here https://testing-library.com/docs/react-testing-library/example-intro
// so that we can render our application.
import {render, screen} from '@testing-library/react'
// this is needed to render the component and access pieces within that component
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
  expect(titleElement).not.toBeInTheDocument()
})