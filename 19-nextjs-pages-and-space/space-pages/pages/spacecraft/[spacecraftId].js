// import the router
import {useRouter} from 'next/router'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import NavBar from '@components/NavBar';

export default function Spacecraft() {
  // initialize the router from the hook
  const router = useRouter()

  // i'm just going to get the spacecraftId we know
  // that our router.query will have the spacecraftId
  // because our filename is [spacecraftId].js
  const {spacecraftId} = router.query
  return (
    <div>

        <NavBar />

        <Container sx={{paddingTop:2}} component="main" maxWidth="xs">

          <Typography variant="h3">
            Spacecraft id: {spacecraftId}
          </Typography>
          <Typography variant="p">
            Challenge show: crew capability, flight life, image, maiden flight (on your own from the api.)
          </Typography>
        </Container>

    </div>
  )
}
