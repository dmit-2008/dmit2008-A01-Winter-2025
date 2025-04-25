import {useState, useEffect, useContext} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import UserContext from '@utils/context/UserContext'
// import SnackBarContext from '@utils/context/SnackBarContext';

// import {updateUser} from '@utils/api/user'

export default function UserInfoForm(props) {
    const [user, setUser] = useState({
      email: "",
      firstname: "",
      lastname: "",
      age: undefined,
    })
    // get the context of the user from useAuth

    useEffect(()=> {
      // update the form values based on the fetched user.
    }, [/* listen to changes from user context */])

    const handleChange = (key, value) => {
        let tempUser = {...user}
        tempUser[key] = value
        console.log(tempUser)
        setUser(tempUser)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // update the user calling the api from the useAuth function
    }

    return <>
    <Box component="form" noValidate sx={{ mt: 1 }}
        onSubmit={handleSubmit}    
    >
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      value={user.email}
      onChange={(event)=> handleChange("email", event.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="First-name"
      label="first name"
      name="First-name"
      autoComplete="First-name"
      value={user.firstname}
      onChange={(event)=> handleChange("firstname", event.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="last-name"
      label="last name"
      name="last-name"
      autoComplete="last-name"
      value={user.lastname}
      onChange={(event)=> handleChange("lastname", event.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      type="number"
      id="age"
      label="age"
      name="age"
      autoComplete="age"
      value={user.age}
      onChange={(event)=> handleChange("age", parseInt(event.target.value))}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Update
    </Button>
  </Box>
  </>
}