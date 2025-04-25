import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'

import Navbar from '@/components/Navbar'

// 1. import and use the useAuth hook
import { useAuth } from '@/components/state/AuthProvider';

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user, token } = useAuth({authPage: true})

  // on an effect we're going to load the posts
  // using the token



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
            {/* use the user! */}
            Welcome {`${user?.firstname} ${user?.lastname}`}!
          </Typography>
          <Typography component="h2" variant="h5">
            This is your dashboard
          </Typography>
        </Box>
      </Container>
    </>
  )
}
