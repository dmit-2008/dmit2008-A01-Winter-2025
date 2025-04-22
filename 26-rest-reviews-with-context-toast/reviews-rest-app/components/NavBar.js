import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar({title}) {
    return <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
           {title}
        </Typography>
      </Toolbar>
    </AppBar>
}