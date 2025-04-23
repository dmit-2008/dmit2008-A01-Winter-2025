import {useState, createContext} from 'react'
// we're going to do a few things.
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// 2. create a context with an empty object (export it as well)
export const AppNotificationContext = createContext({})
// the above is going t o be what you're goping to import
// to essentially the values (provided later)


// 1. create a componetn that will wrap the _app.js
export default function AppNotification({children}) {
  // the state that will either open or close the notification
  const [open, setOpen] = useState(true) // debug: put the state to true
  // we're going to make the message and color stateful
  const [text, setText] = useState("")
  const [severity, setSeverity] = useState("info")

  // we're going to wrap all components in this provider
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // this function is going to be what we'll pass as a
  // value to the context here, with our knowledge of
  // object destructuring and useContext we can use this
  // in the other components (nested in AppNotification)
  const show = ({message, type})=> {
    setOpen(true) // to display the message
    setText(message)
    setSeverity(type)
  }

  // 3. in the component we'll create a Context provider (this is has changed we'll make a note)
  // Note AppNotificationContext.Provider in react 19+ is AppNotificationContext
  // we're passing in an empty object
  return <AppNotificationContext.Provider value={{}}>
    {children}
    {/* we're going to add our snackbar below
      so that other components can trigger (with the context)
    */}
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal:"right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      {/* we're going to change the message
      based on the state change */}
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  </AppNotificationContext.Provider>
}