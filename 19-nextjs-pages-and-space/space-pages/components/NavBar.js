// static links
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'


export default function NavBar(props) {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {/* Example of a static path, links are links. */}
        <Link href="/">
          Space Agency App
        </Link>
      </Typography>
      <Typography variant="h6" component="div" >
        <Link href="/about">
          About
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
}
