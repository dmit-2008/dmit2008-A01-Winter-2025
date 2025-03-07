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

  post: async function() {
    // maybe another good name would be create()

  },

  delete: async function() {

  }
}

// for this example we would use export default

export default reviewsAPI

