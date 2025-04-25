import {useRouter} from 'next/router'

import {useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// 1. we're going to import the hooks
import { useNotification } from './state/AppNotification';
import { useAuth } from './state/AuthProvider';

export default function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  /* 2. use the hook here */
  const {showNotification} = useNotification()
  const {signIn} = useAuth()

  const handleLogin = async (event)=> {
    event.preventDefault()
    /* make the sign in request here. */
    try {
      // attempt to sign in
      await signIn({email: email, password: password})
      showNotification({
        message: "Login Successful",
        severity: "success"
      })
    } catch (error) {
      showNotification({
        message: "Incorrect credentials",
        severity: "error"
      })
    }
  }

  return <Box component="form" noValidate sx={{ mt: 1 }}
      onSubmit={handleLogin}
    >
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      value={email}
      onChange={(event)=> {setEmail(event.target.value)}}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={(event)=> {setPassword(event.target.value)}}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </Button>
  </Box>
}