// since we'll be using the path variables
// need to import the router
import {useRouter} from 'next/router'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import NavBar from '@components/NavBar';

export default function Agency() {
  // we're going initialize the router.
  const router = useRouter()
  // we're going to use the "agencyId" variable
  // from the path because our filename is [agencyId].js
  // which is a dynamic path


  return (
    <div>
      <NavBar />
      <Container sx={{paddingTop:2}} component="main" maxWidth="xs">
        <Typography variant="h3">
          Agency
        </Typography>
        <Typography variant="p">
          Our agency data...
        </Typography>
      </Container>
    </div>
  )
}
