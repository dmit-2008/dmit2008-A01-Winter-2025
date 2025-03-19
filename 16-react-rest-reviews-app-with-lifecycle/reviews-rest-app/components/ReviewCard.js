import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';

import { deleteReview } from '../utils/api/reviews';


export default function ReviewCard({
  rating, id, title, comment,
  // based on the rendering options here.
  // option 1 in remove review for rendering we'd use
  reviews,
  setReviews,
  // option 2 we'd use load reviews.
  loadReviews
}) {
  // since we're passing id as a prop
  // as an option you remove the param to this function
  // why? because you're passing as a prop.
  const removeReview = async (id) => {
    console.log(`you want to remove ${id}`)
    // implement the delete

    // delete from backend
    try {
      const data = await deleteReview(id)
      console.log(data)
      // update frontend
      // we have the same options as the post request
      // we have those same options
      // Option 1 filtering state on the frontend
      // we'll filter through the id.
      // let currentReviews = reviews.filter((review) => {
      //   // he's if you're the id that we're trying to delete
      //   // you're not in.
      //   return review.id !== id
      // })
      // console.log(currentReviews)
      // setReviews(currentReviews)
      // Option 2: refetching/refreshing the data.
      // this is just calling our loadReviews
      await loadReviews()

    } catch (error) {
      // we'll display errors to the user in a bit here.
      console.log(error)
    }
  }

  return <Card
    sx={{marginTop: 4}}
  >
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
          {rating}
        </Avatar>
      }
      action={
        // adapatation is each review
        // we want to use the
        <IconButton
          onClick={() => removeReview(id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      title={
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      }

    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {comment}
      </Typography>
    </CardContent>
  </Card>
}