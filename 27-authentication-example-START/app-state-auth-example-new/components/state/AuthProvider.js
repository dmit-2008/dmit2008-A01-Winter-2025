import
// what we're going to do here.
// 1. create the component and wrap the _app.js
// 2. create a context with an empty object
//    Note: dan uses an empty object so that he can pass multiple values
//    down to the context from the component so that you can access more stateful pieces



export default function AuthProvider({children}) {

  return <>
    {children}
  </>
}