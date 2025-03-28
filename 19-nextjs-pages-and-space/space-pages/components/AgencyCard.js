/* reference for material ui components used
https://mui.com/material-ui/react-card/#media

*/
// import the router
import { useRouter } from 'next/router';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AgencyCard(props) {
  // I want you to initialize the router from next
  // on button click I want you to navigate to
  // /agency/idfromprops (it doesn't exist yet)
  const router = useRouter()

  // do the navigation.
  const navigateToAgency = () => {
    // navigate to /agency/id... via imperative routing
    router.push(`/agency/${props.id}`)
  }

  // I want you to to create the agency page
  // with an path param of "agencyId"
  // I want to see if you can get the data
  // and display the agency name using the techniques
  // we've learned.

  return <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
    {props.imageUrl && <CardMedia
      component="img"
      height="140"
      image={props.imageUrl}
      alt="green iguana"
    />}
    <CardContent>
      <Typography variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        {props.abbreviation}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        onClick={navigateToAgency}
        size="small"
      >
        Go to Agency
      </Button>
    </CardActions>
  </Card>
}