/* reference for material ui components used
https://mui.com/material-ui/react-card/#media

*/

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AgencyCard(props) {
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
      <Button size="small">Go to Agency</Button>
    </CardActions>
  </Card>
}