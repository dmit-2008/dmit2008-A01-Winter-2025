import Head from 'next/head'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'


import Navbar from '@/components/Navbar'


export default function Home() {
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
            Welcome to our application
          </Typography>
        </Box>
      </Container>
    </>
  )
}
