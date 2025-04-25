// we're going to import all of the react pieces we're going to use.
import {useState, useContext, createContext} from 'react'
// what we're going to do here.

// 2. create a context with an empty object
//    Note: dan uses an empty object so that he can pass multiple values
//    down to the context from the component so that you can access more stateful pieces
export const AuthContext = createContext({})

// 1. create the component and wrap the _app.js
export default function AuthProvider({children}) {
  // 4. we're going to create some state that we know
  //    we're going to need from our backend
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)



  // 3. we're going to use AuthContext.Provider and pass in the empty object
  //    that we'll edit to use the state in this component.
  //    In react 19.1 this syntax slightly changes to <AuthContext value={{}}>
  return <AuthContext.Provider value={{
    // 5. some state form the component
    token, user, isAuthenticated
    // a few functions like signIn and signOut
  }}>
    {children}
  </AuthContext.Provider>
}