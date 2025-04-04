// this is essentially for your purposes not necessary
// but a different flavour of solving the reviews api.
const BASE_URL = "http://localhost:5000"

// this is an object but we could make this a class
// that's initialized.
const reviewsAPI = {
  // below would be called with reviews.get()
  get: async function() {
    const REVIEWS_URL = `${BASE_URL}/reviews`
    const response = await fetch(REVIEWS_URL)
    const data = await response.json()
    return data
  },

  post: async function({title, rating, comments}) {
    // maybe another good name would be create()
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
  },

  delete: async function(id) {
    const DELETE_URL = `${BASE_URL}/reviews/${id}`

    const response = await fetch(DELETE_URL, {
      method: "DELETE"
    })
    console.log(response)
    // what this does is that it checks to see
    // if the status is ok which means it's in the 200s range
    // if it's not okay normally if it's not throwing an error
    // and it's not okay this means it's a 400s
    if (!response.ok) {
      throw Error("no found")
    }
    // don't like this? take a look axios, you can do it.

    const data = await response.json()
    return data
  }
}

// for this example we would use export default

export default reviewsAPI

