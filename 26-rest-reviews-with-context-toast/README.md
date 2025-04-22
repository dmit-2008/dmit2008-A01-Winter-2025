# React Application State (using useContext) to display Notifications

# What have we done so far?

Notifications, more specifically toast messages, are pretty common in react. In this example we'll be displaying how you can use a function to display toast notifications with the useContext hook in react.

In this existing reviews app we have quite a bit of functionality going on. We can load the data, we can add a new review, and we can also delete a review. What we're going to do is add nice little notifications every time an action is taken by a user.

# Steps

1. Create a folder named `state` in the components folder.
2.  Creact a file called `AppNotification`
    - import the `Snackbar` component [here](https://mui.com/material-ui/react-snackbar/)
    - and also import `MuiAlert` from the alert function from [here ](https://mui.com/material-ui/api/alert/#component-name) 
3. Create the AppNotification Component.
```jsx
import { useState } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function AppNotification(props) {
    const [open, setOpen] = useState(false);

  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return <>
      {props.children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6} variant="filled"  
          onClose={handleClose} severity="success" sx={{ width: '100%' }}
        >
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </>
}
```

4. in your `_app.js` file import the component and wrap the `Component` in `MyApp` with your newly created `AppNotification` component.
your _app.js should look like the code below.
```jsx
import '../styles/globals.css'

import AppNotification from '../components/state/AppNotification'

function MyApp({ Component, pageProps }) {
  return <AppNotification>
    <Component {...pageProps} />
  </AppNotification>
}

export default MyApp
```
- Note: you won't see a difference to your application yet. If you want to see this being displayed you can change the state of `open` in your `AppNotification` function to true. This should display a little message in the bottom left of your application. You should go try this now (and then set that stateful value back to false.)

5. Let's create a react context so that this can be accessed by other components (the components that should notify users that something is happening). Also let's wrap the entire component in the context provider in our JSX.
```jsx 
import { useState } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const AppNotificationContext = createContext({})

export default function AppNotification(props) {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
      console.log(event)
      console.log(reason)
  
      setOpen(false);
    };

    return <AppNotificationContext.Provider value={{}}>
      {props.children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6} variant="filled"  
          onClose={handleClose} severity="success" sx={{ width: '100%' }}
        >
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </AppNotificationContext.Provider>
}
```
Note: What we've done here is that we've exposed a context through a named export `AppNotificationContext` that we'll import and use in other components (by using `useContext`) so that we can use the values that right now is an empty object that we're going to change that in the next step.

6.  Let's make a function that we'll pass to our "values" so that we can display the function. We're going to do the following steps below and the end result will be code following it.
    - Add new stateful values named text and severity
    - create a function named show notification.
      - this is going to set the severity and message in our `AppNotification` component, but will be use by all other components.
    - pass that show notification into prop the "values" of the `AppNotificationContext.Provider`. As note of preference, I like to put things in an object in case I'd like to "expose" another value or function to other functions.
    - change the severity of the `MuiAlert` to use the stateful value.
    - change the `MuiAlert`'s message to use the stateful value of text
    - once complete it should look something like below.
  
```jsx
import { useState, createContext  } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const AppNotificationContext = createContext({})

export default function AppNotification(props) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClose = (event, reason) => {
      console.log(event)
      console.log(reason)
  
      setOpen(false);
    };

    const showNotification = ({message, severity}) => {
        setText(message)
        setSeverity(severity)
        // display the message
        setOpen(true)
    }

    return <AppNotificationContext.Provider value={{showNotification}}>
      {props.children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6} variant="filled"  
          onClose={handleClose} severity={severity} sx={{ width: '100%' }}
        >
          {text}
        </MuiAlert>
      </Snackbar>
    </AppNotificationContext.Provider>
}
```

7. Let's use our function `showNotification` to our users in our `index.js` to notify users that the component has been loaded successfully. 
    - import `useContext` from react
    - import `AppNotificationContext` as a named import from the component file.
    - use the context in the application `const {showNotification} = useContext(AppNotificationContext)` so that we can now use our function in there.

```jsx 
import {useState, useEffect, useContext} from 'react'

// ... mui imports ...

import { AppNotificationContext } from '../components/state/AppNotification';

import { getReviews } from '../utils/api/reviews'

export default function Home() {
  const [reviews, setReviews] = useState([])
  
  const {showNotification} = useContext(AppNotificationContext)

  // ... rest of the home component below ...
```
- Now let's modify our `loadAllReviews` function so that we can display what's going on!
  - Once you add it to the showNotification to the reviews you should be able to see the message in the bottom right.
```jsx
export default function Home() {
  const [reviews, setReviews] = useState([])
  
  const {showNotification} = useContext(AppNotificationContext)

  // ... other functions here ...

  const loadAllReviews = () => {
    getReviews().then((data)=> {
      setReviews(data)
      // display the use the showNotification function!
      showNotification({
        message: "Loaded reviews successfully",
        severity: "info"
      })
    })
  }

  // ... rest of the home component below ...
```

8. Now let's modify `AdaptationReviewCard` to use our remove review notification once the "delete" request is made to the backend.
    - import useContext, the `AppNotificationContext` and initialize the `showNotification` function using the `useContext`.
    - call the function `showNotification` in the `removeCurrentReview` function.
    - Once you have all of the above in code (shown below) you'll see the notification show up in the bottom left hand corner but it'll be for removing instead of add a piece.
```jsx
import { useContext } from 'react'

// ... other imports here ...

import { AppNotificationContext } from '../components/state/AppNotification';

import { deleteReview } from '../utils/api/reviews';

export default function AdaptationReviewCard(props) {

  const {showNotification} = useContext(AppNotificationContext)

  const removeCurrentReview = () => {
    deleteReview(props.id).then((data)=> {
      props.removeReview(props.id)
      // added show notifcation.
      showNotification({
        message: `Removed review: "${props.title}"`,
        severity: "info"
      })
    })
  }

  // ... rest of the home component below ...
```

9. The Last step let's show a notification when we add a new review in the `AdaptationReviewForm`
    - import useContext, the `AppNotificationContext` and initialize the `showNotification` function using the `useContext`.
    - in the `handleSubmit` and in the promise resolution of the `postReview`
    - now once you post a new review you should be able 
```jsx
import { useState, useContext } from 'react'

// ... other imports here ...

import { AppNotificationContext } from '../components/state/AppNotification';

import { postReview } from '../utils/api/reviews';

export default function AdaptationReviewForm(props) {
  const {showNotification} = useContext(AppNotificationContext)
  
  // ... stateful values here ...
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValidForm()) {
      return
    }
    postReview({
      title: title,
      comment: comments,
      rating: rating
    }).then((newReviewData)=> {
      props.setReviews([newReviewData, ...props.reviews])
      // added notification
      showNotification({
        message: `Successfully added review for "${title}"`,
        severity: "success"
      })

      resetForm()
    })    
  }

  // ... rest of the home component below ...
```

10. (**Optional**) Creating a custom hook for our new Notification context. We'll show you how you can use context but we can take this one step further and create a custom context notification react hook.
    - Open the `AppNotification` and import `useContext` from `react`
    - create and export a function named `useNotification`
    - in the function use the `useContext` hook with our newly created created app notification, and return it. We'll also throw an error if it's not 
    - this will make it so that you can import `useNotification` as a hook and make it a tad bit more readable.
    - The code is shown below.
```jsx
import { useState, useContext, createContext  } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const AppNotificationContext = createContext({})

export function useNotification() {
  const context = useContext(AppNotificationContext)
  if (!context) {
    throw new Error(`useCount must be used within a AppNotification`)
  }
  return context
}

export default function AppNotification(props) {
  //  ... rest of the home component below ...
```
Note: 

11. Now let's change where we used "useContext" to use our new hook.
    - Open `AdaptationReviewForm` and if you look at the top of the component you should see something like below.
```jsx
// ... other imports here ...

import { AppNotificationContext } from '../components/state/AppNotification';

import { postReview } from '../utils/api/reviews';

export default function AdaptationReviewForm(props) {
  const {showNotification} = useContext(AppNotificationContext)

  //  ... rest of the home component below ...
```
This is great but let's make the modification to this code to import and use our new `useNotification` hook.
```jsx 
// ... other imports here ...

import { useNotification } from '../components/state/AppNotification';

import { postReview } from '../utils/api/reviews';

export default function AdaptationReviewForm(props) {
  const {showNotification} = useNotification()
  
  //  ... rest of the home component below ...
```
Note: Functionality wise you shouldn't be able to see anything different going on, but you can see how this is readable and neat that we can create our own hooks!

## Challenge
With your newly created `useNotification` hook go and modify the `index.js` and the `AdaptationReviewCard` components to use the `useNotification` hook.

## Conclusion 

This should show how you can use React's context api to import a function that will modify state of another Component not by prop drilling.

As well this is a really handy techique to display notifications. Now the only thing that's going to be different in our other projects will be just the UI framework to display the notifications.
