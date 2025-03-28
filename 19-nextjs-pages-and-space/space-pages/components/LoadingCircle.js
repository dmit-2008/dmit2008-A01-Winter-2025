/*
Docs for this loading circle.

https://mui.com/material-ui/react-progress/#circular

*/

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle() {
  return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      direction="row"
    >
      <CircularProgress />
    </Box>
}
