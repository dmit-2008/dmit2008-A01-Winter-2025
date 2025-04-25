import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Navbar from '@/components/Navbar'
import UserInfoForm from '@/components/UserInfoForm';


export default function Account() {

  return (<div>
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
            Account Information
          </Typography>
          <UserInfoForm/>
        </Box>
      </Container>
  </div>
  );
}