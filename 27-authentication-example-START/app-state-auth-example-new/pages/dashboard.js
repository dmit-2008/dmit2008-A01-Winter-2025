import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'

import Navbar from '@/components/Navbar'
import SimpleDetailsCard from '@/components/SimpleDetailsCard';

// 1. import and use the useAuth hook
import { useAuth } from '@/components/state/AuthProvider';
import { getProtectedPosts } from '@/utils/api/posts';

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  /* import the user reroute to home.
  This should be a protected page.
  */
  const { user, token } = useAuth({authPage: true})

  // load the posts with the protected token
  // note: there's better ways to do this
  // read create a class with a token as a property
  // that all methods can read
  const loadPosts = async () => {
    const data = await getProtectedPosts(token)
    setPosts(data)
  }

  // on an effect we're going to load the posts
  // using the token
  useEffect(()=> {
    loadPosts()
  }, [])


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
          { posts.map((post)=> {
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
