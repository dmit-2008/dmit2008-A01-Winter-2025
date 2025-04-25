import Link from 'next/link'
import { useRouter } from 'next/router'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'


export default function NavBar(props) {
  const router = useRouter()
  /* import isAuthenticated and signOut context here. */ 


  return <AppBar position="static" sx={{marginBottom: "1rem"}}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link href="/" >
          App State Example
        </Link>
      </Typography>
       <Typography variant="h6" component="div" >
          <Link href="/login/">
            Login
          </Link>
        </Typography> 
        {/*
        
        When user is authenticated you should hide the login and see 
        
        <>
          <Typography variant="h6" component="div" sx={{pr: 1}}>
            <Link href="/dashboard/">
              Dashboard
            </Link>
          </Typography> 
          <Typography
            variant="h6"
            component="div" >
            Sign out
          </Typography> 
        </>
        
        */}
        
    </Toolbar>
  </AppBar>
}