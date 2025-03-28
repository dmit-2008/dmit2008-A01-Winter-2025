import Head from 'next/head'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import NavBar from '@components/NavBar';

export default function Agency() {

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
