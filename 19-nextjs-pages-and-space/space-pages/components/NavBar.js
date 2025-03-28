import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'


export default function NavBar(props) {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Space Agency App
      </Typography>
      <Typography variant="h6" component="div" >
        About
      </Typography>
    </Toolbar>
  </AppBar>
}
