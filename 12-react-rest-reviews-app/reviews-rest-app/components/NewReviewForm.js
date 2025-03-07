
import { postReview } from '../utils/api/reviews';

// learned exercise
import reviewsAPI from '../utils/api/reviewsAPIAsObject';


export default function NewReviewForm () {

  // control the inputs.
  const [title, setTitle] = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState("1")

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

  return <form
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

}