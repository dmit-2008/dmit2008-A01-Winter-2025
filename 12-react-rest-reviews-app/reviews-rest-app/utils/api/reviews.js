// because the backend is on a different domain.
// we make the domain separate because our domains
// will be different for production, testing, local.
const BASE_URL = "http://localhost:5000"

// a function that's going to fetch with get
// I want you to update the index.js to use function
// export and use it in index.js
// below would be called as getReviews()
const getReviews = async () => {
  // note if you don't want to export at the bottom
  // you can use `export const getReviews = async () => {`
  // instead for line 9 (pick one way go with it)
  const REVIEWS_URL = `${BASE_URL}/reviews`
  const response = await fetch(REVIEWS_URL)
  const data = await response.json()
  // normally you wouldn't catch your errors here.
  // you would handle them on the UI piece that
  // is calling the function
  return data
}

// do the post and do the delete requests
// you can do it on both
const postReview = async ({title, rating, comments}) => {
  // a post to the backend
  const REVIEWS_URL = `${BASE_URL}/reviews`
  // Note: wrap this in a try catch call.
  const response = await fetch(REVIEWS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      comment: comments,
      rating: parseInt(rating)
      // if just make the rating a stirng,
      // json server will still work.
      // but on a real backend you'll need to specify
      // the type otherwise it will break.
    })
  })
  const newReview = await response.json()

  return newReview
}


// put all of my exports at the bottom
export { getReviews, postReview }