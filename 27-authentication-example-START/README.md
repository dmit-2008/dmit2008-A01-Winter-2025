# Authentication Application 

## Why?

Most applications that you're going to build need to uniquely identify users and you need to save data associated to them.

## Authentication Backend

We will be extending our use of the [json-server project](https://github.com/typicode/json-server) by using the [json-server-auth project](https://github.com/jeremyben/json-server-auth) on top of it.

Please refer to the [backend setup](./authentication-mock-backend/README.md), as we'll need to learn how to use the json-server as our backend. 

Note: setting up a backend is litterally an entire course, but you can always start to learn some of the concepts on your own.

## Before We Build.

Before we build let's go take a look at what's in this application.
- in `componenets/state/AppNotification.js` you can see that we have our `AppNotification` from last class.
- take a look at how we can use the "Authentcation Backend" that uses ["json-server-auth"](https://www.npmjs.com/package/json-server-auth) which is a package that allows us to "simulate" a jwt authentication to the backend.
- There's a `LoginForm.js` (finish this)

## Options and whhat we're going to build.
We can implement "server side" authentication or we can implement "client-side" authentication. We're going to implement "client side" authentication.

If you want to implement server side authentication you can take a look at the  [next-auth package](https://next-auth.js.org/).

## Frontend Steps


### 1. Let's take a look at the pages that we're going to work with.
- Login page
  - This is going to be where an unauthenticated user "signs in" to our application and our application should be aware that our user is authenticated
- Home Page
  - This is the page where all users (unauthenticated and authenticated) users should be able to see.
- Dashboard
  - This is page should be unique to a given authenticated user and be the "application" as a whole.
- (*Challenge page*) Account page.
  - This is a page that is unique to an authenticated user and allows the user to update their personal information.
- (*Challenge page*) Registration Page.
  - This is a page that allows a user

*Challenges pages are pages that you can optionally create on your own.* 

### 2. Let's talk about what pages should be only allowed for our "authenticated" users and which should not.
- We have a few pages that our unauthenticated users should be able to access to either become an authenticated user or visit our site
  - Home page (all users should be able to access and see this)
  - Login Page (users need to become authenticated users)
  - (*Challenge page*) Registration (we need to get users to sign up on our site!)

- We also have pages that are only available 
  - Dashboard (needs to be unique to a given user.)
  - (*Challenge page*) Account Page (users need to be able tot)

Next we'll build the functionality to have some of this client side authentication and authenicated protected pages.

### 3. Create a hook that is going to login the user.
- Create folder named `state` in the `components` folder and create a file named `AuthProvider.js` in it.
- Create the context named `AuthenticationContext` using the createContext api that we've learned in previous classes.
- Create an `AuthProvider` component that will wrap its' nested child components.
- Wrap all children in the jsx the `AuthenticationContext.Provider`  with a `value` prop of an empty object. After the above steps it should look like this.
```jsx
import {useState, useContext, createContext} from 'react'

import { login } from '@/utils/api/auth'

export const AuthenticationContext = createContext({})

export default function AuthProvider({children}) {
  return <AuthenticationContext.Provider value={{}}>
    {children}
  </AuthenticationContext.Provider>
}
```

### 4. Create the authentication functionality in the AuthProvider component.

- create the state in the `AuthProvider` component with the following variables
  - `token`
    - this is going to contain the "access" token that our api is going to need to authenticate rest api requests.
  - `user` details
    - This is going to contain details on the user.
  - `isAuthenticated`
    - This is going to be a boolean that is either true if the user is authenticated or false if the user is not authenticated
- create the `signin` function that uses the `login` function which calls our backend to login.
  - please refer to the [backend README](../authentication-mock-backend/README.md) for the understanding of the authentication piece of the api.
  - on the promise resolution using the data returned set the following stateful values.
    - use `setUser` with the `user` data.
    - set the the authentication to true using `setIsAuthenticated`
    - use `setToken` with the `accessToken` data
- create the `signOut` function reset all of the values you set in your `signIn` function.
  - `useUser` to nothing
  - `setIsAuthenticated` to `false` because the user is no longer logged in
  - `setToken` to and empty string because you no longer have a token.
```jsx
import {useState, useContext, createContext} from 'react'

import { login } from '@/utils/api/auth'

const AuthenticationContext = createContext({})

export default function AuthProvider({children}) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // make the api request and define the state.
  const signIn = ({email, password}) => {
    return login({email, password}).then((loginData)=> {
      /*
      Note this is going to contain both the 
      access token and the user. This is not 
      always the case with a login endpoint.
      For the response please refer to https://www.npmjs.com/package/json-server-auth
      */
      setIsAuthenticated(true)
      setToken(loginData.accessToken)
      setUser(loginData.user)
      
    })
  }


  const signOut = () => {
    setIsAuthenticated(false)
    setUser()
    setToken("")
  }
  
  /* 
  You can implement a registration here!
  - implement the register in the api.
  - do essentially the same as above.
  */
  return <AuthenticationContext.Provider value={{
      token, user, isAuthenticated, signIn, signOut    
    }}>
      {children}
    </AuthenticationContext.Provider>
}
```

### 5. Create the fundamental hook for authentication

Using the context and the `useContext` hook (that you'll need to import from react) in a hook named `useAuth`.
```jsx
import {useState, useContext, createContext} from 'react'

import { login } from '@/utils/api/auth'

export const AuthenticationContext = createContext({})

// custom hook with default argument
export const useAuth = () => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

// rest of the AuthProvider component
```

Note: This is what we're going to use to access the context in other files, so you'll need to export this custom hook.

### 6. Create an AppProvider component that will wrap both the AuthProvider and the AppNoitification together.
  - create the wrapper.
  - wrap the app with it.
```jsx
import AppNotification from "./AppNotification";
import AuthProvider from "./AuthProvider";

export default function AppProviders({children}) {
  return <AppNotification>
    <AuthProvider>
      {children}
    </AuthProvider>
  </AppNotification>
}
```

### 7. Let's implement the login component.
- First take a look at the Navbar you see here that there's a link to the login page. In the future we'll change this to a link to the dash when we're logged in.
- import our newly created `login` function from the `useAuth` hook to our `LoginForm` 
- import your notification that we created last class.
```jsx
// ... other imports ...

import { useAuth } from './state/AuthProvider';

export default function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  /* import the hook here */
  const { signIn } = useAuth()
  const {showNotification} = useNotification()
  const handleLogin = (event)=> {
    event.preventDefault()

  }

  // ... rest of the component ...
```
- implement the login functionlity using the `signIn` function from our `useAuth`
  - display notifications if the login was successful or if the login had an error like shown below. Note this is going to be using our `showNotification` from the last page.
```jsx
// ... other imports ...

import { useAuth } from './state/AuthProvider';

export default function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  /* import the hook here */
  const { signIn } = useAuth()
  const {showNotification} = useNotification()

  const handleLogin = (event)=> {
    event.preventDefault()
    signIn({email, password}).then(()=> {
      showNotification({
        message: "Login successful",
        severity: "success"
      })
      router.push('/dashboard/')
    }).catch((error)=> {
      showNotification({
        message: "Login unsuccessful",
        severity: "error"
      })
    })
  }

  // ... rest of the component ...
```
- Now if you open the "Components" in react dev tools on the "AuthProvider" and look at the state, you can see that it updates the user, the token and the isAuthenticated piece!

### 8. Let's update the `Navbar` so that it displays a link to the dashboard and a signout button.
- import the `isAuthenticated` and `signOut` from the `useAuth` hook that we've created. Your component should look like below.
- also import your notification that we created last class.
```jsx
// ... rest of the imports ...

import { useAuth } from './state/AuthProvider';


export default function NavBar(props) {
  const router = useRouter()
  /* import isAuthenticated and signOut context here. */ 
  const { isAuthenticated, signOut } = useAuth()

  // ... rest of the component ...
```
- now let's update our jsx with a ternary to display the dashboard link and the sign out link
```jsx 
// ... rest of the imports.
import { useAuth } from './state/AuthProvider';
import { useNotification } from './state/AppNotification';

export default function NavBar(props) {
  const router = useRouter()
  /* import isAuthenticated and signOut context here. */ 
  const { isAuthenticated, signOut } = useAuth()
  const {showNotification} = useNotification()
  
  const handleSignOut = () => {
    signOut()
    showNotification({
      message: "Signed out successfully",
      severity: "success"
    })
  }

  return <AppBar position="static" sx={{marginBottom: "1rem"}}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link href="/" >
          App State Example
        </Link>
      </Typography>
      {!isAuthenticated ?
        <Typography variant="h6" component="div" >
          <Link href="/login/">
            Login
          </Link>
        </Typography> 
        :
        <>
          <Typography variant="h6" component="div" sx={{pr: 1}}>
            <Link href="/dashboard/">
              Dashboard
            </Link>
          </Typography> 
          <Typography
            onClick={()=> {handleSignOut()}}
            variant="h6"
            component="div" >
            Sign out
          </Typography> 
        </>
      }  
    </Toolbar>
  </AppBar>
}
}
```
- Now if you open the "Components" in react dev tools on the "AuthProvider" and look at the state. You'll see that it updates the user, the token and the isAuthenticated piece are not set back to when we're unauthenticated.

### 9. Let's protect our Dashboard page (this should only available to users that are authenticated) so we want to reroute our unauthenticated users. Let's do this with our useAuth hook!
  - in the dashboard page import the `user` from the `useAuth` hook that we've created.
  - modify JSX so that it displays the name.

```jsx
// ... rest of the imports ...
import { useAuth } from './state/AuthProvider';

export default function Dashboard() {
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user } = useAuth()

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Welcome {user && user.firstname}!
          </Typography>
        </Box>
      </Container>
    </>
  )
}
```

- Note: that if you click signout button it's going to show just "Welcome!" but we want this piece to route the user to the home page if they are not logged in (we could also route them to the login page)
  - Take a look at the [custom hooks documentation in react.](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component)
  - here they are are using the useEffect hook in their component, so we're going to do the same (as we're already using the useContext hook in our custom useAuth hook). We're also going to import the useRouter hook to do the same
- create a default argument to `useAuth` in the `AuthProvider` javascript file named options
### 10. Let's import useEffect and useRouter as we're going to use it in our hook.
```jsx
import {useRouter} from 'next/router'

import {useState, useContext, createContext, useEffect} from 'react'

// ... other imports and context ...

export const useAuth = (options = {protectedPage: false}) => {
// ... rest of hook and component ...
```

  - under where we define the context what we've going to useRouter, useEffect, `options.protectedPage` and `context.isAuthenticated` to route the user to the home page if they are not authenticated. Making these changes let's take a look at what our hook should look like.

```jsx
// ... other imports and context ...

// custom hook with default argument
export const useAuth = (options = {protectedPage: false}) => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  /* reroute the user if they have logged out */
  const router = useRouter()
  useEffect(()=> {
    // check if the user is authenticated and if it's a protected page.
    if (!context.isAuthenticated && options.protectedPage) {
      // route to the home page that isn't protected.
      router.push("/")
    }
  }, [context.isAuthenticated])
  return context
}
// ... rest of hook and component ...
```
- Let's talk about this a bit more.
  - under the context we define the router.
  - here our `useEffect` is listening to changes in the `isAuthenticated` piece from the `context`.
  - if we are not authenticated and the `protectedPage` is true, then we know that we are not "signed in" to the application, so we'll route to a page that isn't authenticated (the home page or the login page your choice). 
    - Note as an extension you could even pass a redirect option to the `options`

- Now that this works let's go back to our "dashboard" page 
```jsx 
// ... rest of the imports...
import { useAuth } from '@/components/state/AuthProvider';

export default function Dashboard() {
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user } = useAuth({protectedPage: true})

// 
```
  - Now signout of the application, you should now see that you're rerouted to the page you specified!

Note: Now you should have the complete flow done, but you don't have the registration complete!

## (Optional) Protected api endpoints.
### 1. Let's use our token to make an authenticated request to our server so that we can understand how this works.
- Take a look in the `utils/api/posts.js` you should see something like the following.
```jsx
const getProtectedPosts = (authToken) => {
  let headers = {}
  if (authToken) {
    headers = {
      "Authorization": `Bearer ${authToken}`
    }
  }
  return fetch(`${BASE_URL}/660/posts/`, {
    method: "GET",
    headers: headers
  }).then((response)=> {
    return response.json()
  }).then((posts)=> {
    return posts
  })
}

export { getProtectedPosts }
```
### 2. Let's take a look at what's going on in the `getProtectedPosts` function
- our `getProtectedPosts` has one parameter named `authToken`.
- if we have an `authToken` we're creating an object namedd `headers` with the token that we'll be passing into the object. This is essentially going to tell our backend who is logged in when making the request.
  - if we don't have the `authToken` you'll see that we get a `401: Missing authorization header` error.
### 3. Let's use this function to display some posts using our `getProtectedPosts` function.
  - import our `getProtectedPosts`
  - import `useState` and `useEffect` from react
  - get the token from our `useAuth` custom hook.
  - create a stateful value for `posts` that will be used for when we fetch the posts.
```jsx
import {useState, useEffect} from 'react'

// ... other imports ...

import { getProtectedPosts } from '@/utils/api/posts';

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user, token } = useAuth({protectedPage: true})

  // rest of your component
```

### 4. Let's display the posts on the dashboard page.
- import the `SimpleDetailsCard`
- create a `useEffect` that will fire on mount (empty dependency array)
  - in the `useEffect` call `getProtectedPosts` with the `token` and use `setPosts` with the "data" returned from our api.
- In the JSX using the `SimpleDetailsCard` loop through the posts and 
```jsx
import SimpleDetailsCard from '@/components/SimpleDetailsCard';

import { useAuth } from '@/components/state/AuthProvider';

import { getProtectedPosts } from '@/utils/api/posts';

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user, token } = useAuth({protectedPage: true})

  useEffect(()=> {
    // experiment removing token and see the "401" error
    getProtectedPosts(token).then((postData)=> {
      console.log(postData)
      setPosts(postData)
    })
  }, [])

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        {/* other components in your jsx */}
        <Box>
          {posts.map((post)=> {
            return <SimpleDetailsCard
              key={post.id}
              title={post.title}
              description={post.body}
            />
          })}
        </Box>
      </Container>
    </>
  )
}

```
- Observe that if you remove the `token` from the `getProtectedPosts` that you will not be able to fetch the posts because you're unauthorized to do so!


## Conclusion
You can now see some of the fundamentals of creating a rudimentary client side authentication. 

Take a look at a couple of the challenges to continue to build this out even more!

## Challenge
- implement the regitration page.
  - make a page for registration
  - make the endpoint that will hit the /register that was done in the backend README.md [refer to the docs here](https://github.com/jeremyben/json-server-auth#register-)
  - add a function in the AuthProvider for registration
- implement the update user info account page.
  - use the endpoint in "utils/api/user for the user update [refer to these docs](https://github.com/jeremyben/json-server-auth#examples) for a deeper understanding
  - add a function in the AuthProvider for updating the user.
  - using the `UserInfoForm` pass the information 

Note: if you'd like to ask how this is done, please ask and I'd love to elaborate on this with you.

## Where do we go from here.
- This is an implementation of a frontend version of logging into the application.You can also use next/auth to do server side authentication for the user.