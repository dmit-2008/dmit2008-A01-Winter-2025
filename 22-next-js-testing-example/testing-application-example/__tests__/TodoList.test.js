// is we're going to import a few things from
// react testing library see here https://testing-library.com/docs/react-testing-library/example-intro
// so that we can render our application.





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