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
  const {agencyId} = router.query

  // let's also take a look at the router
  // observe the router.isReady
  console.log(router)

  return (
    <div>
      <NavBar />
      <Container sx={{paddingTop:2}} component="main" maxWidth="xs">
        <Typography variant="h3">
          {/* We can observe the agencyId in the JSX */}
          Agency {agencyId}
        </Typography>
        <Typography variant="p">
          Our agency data...
        </Typography>
      </Container>
    </div>
  )
}
