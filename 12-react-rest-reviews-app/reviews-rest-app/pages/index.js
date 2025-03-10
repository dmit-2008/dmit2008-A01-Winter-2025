import { useState } from 'react'
import Head from 'next/head'

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';


import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';

import { getReviews, postReview, deleteReview } from '../utils/api/reviews';
// learned exercise
import reviewsAPI from '../utils/api/reviewsAPIAsObject';

// because the backend is on a different domain.
const BASE_URL = "http://localhost:5000"

export default function Home() {
  // the stateful values.
  const [reviews, setReviews] = useState([])

  // control the inputs.
  const [title, setTitle] = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState("1")

  // fetch the data.
  // and render it on the page.
  // with a function that will be triggered with the
  // load button.
  const loadReviews = async () => {
    // const data = await getReviews()
    // learned exercise
    const data = await reviewsAPI.get()
    // set the reviews
    setReviews(data)
  }

  // handle form
  const createNewReview = async (event) => {
    event.preventDefault()
    // validate to make sure the items aren't empty
    if (title.trim() === "" || comments.trim() === "") {
      // if either are empty we'll return early.
      return
    }
    // if you can create the fetch request to make
    // a post to the backend
    try {
      // const newReview = await postReview({
      //   title: title,
      //   comments: comments,
      //   rating, rating
      // })
      // the learned exercise
      const newReview = reviewsAPI.post({
        title: title,
        comments: comments,
        rating: rating
      })

      // set the state of reviews properly and discuss it.

      // Option 1.
      // newReview is a new review in this instance
      // the first way we could do this is by setting the state
      // on the frontend
      // setReviews([newReview, ...reviews])
      // this is the same idea as we did in state.

      // Option 2 ( react query uses this approach )
      // talk about invalidating a request, we're going to call
      // the function that originally sets the data.
      // for us this is loadReviews
      await loadReviews()
    } catch(error) {
      // handle this error
    }

    // reset the form values
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setComments("")
    setRating("1")
  }

  // create the delete icon
  // the id is going to be backend id
  const removeReview = async (id) => {
    console.log(`you want to remove ${id}`)
    // implement the delete

    // delete from backend
    const DELETE_URL = `${BASE_URL}/reviews/${id}`
    console.log(DELETE_URL)
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

  // put the form in it's component
  // know what props are needed and what state needs
  // to be in that component vs this component.

  return (
    <div>
      <Head>
        <title>Adaptation Reviews.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Adaptations Reviews
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <form
            onSubmit={createNewReview}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Adaptation Title"
                  fullWidth
                  variant="standard"
                  value={title}
                  onChange={(event)=> {
                    setTitle(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="review-comments"
                  name="review-comments"
                  label="Comments"
                  fullWidth
                  variant="standard"
                  value={comments}
                  onChange={(event)=> {
                    setComments(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="adaptation-rating">Rating</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="adaptation-rating"
                    name="rating-buttons-group"
                    onChange={(event)=> {
                      setRating(event.target.value)
                    }}
                    value={rating}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="6" control={<Radio />} label="6" />
                    <FormControlLabel value="7" control={<Radio />} label="7" />
                    <FormControlLabel value="8" control={<Radio />} label="8" />
                    <FormControlLabel value="9" control={<Radio />} label="9" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                  </RadioGroup>
               </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  type="submit"
                >
                  Add New Review
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box
            sx={{
              pt: 2,
              pb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={loadReviews}
            >
              Load All Current Reviews
            </Button>
          </Box>
          {reviews.map((adaptation, index)=> {
            return <Card
              key={index}
              sx={{marginTop: 4}}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
                    {adaptation.rating}
                  </Avatar>
                }
                action={
                  // adapatation is each review
                  // we want to use the
                  <IconButton
                    onClick={() => removeReview(adaptation.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                title={
                  <Typography variant="body2" color="text.secondary">
                    {adaptation.title}
                  </Typography>
                }

              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {adaptation.comment}
                </Typography>
              </CardContent>
            </Card>
          })}

        </Container>
      </main>
    </div>
  )
}
