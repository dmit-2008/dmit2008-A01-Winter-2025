import { BASE_URL } from "./base";

/* Sample usage
getReviews().then((data)=> {
  // do something with the data there.
})
*/

// the promise way.
const getReviews = () => {
  return fetch(`${BASE_URL}/reviews`, {
      method: "GET"
    }).then((response)=> {
      return response.json() // promise
    }).then((data)=> {
      return data // what is returned from getReviews
    })
}

// async await way of doing things.
// const getReviews = async () => {
//   const response = await fetch(`${BASE_URL}/reviews`)
//   const data = await response.json()
//   return data
// }

const postReview = ({title, comment, rating}) => {
  return fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'       
      },
      body: JSON.stringify({
        title: title,
        comment: comment,
        rating: rating
      })
    }) // this is a promise
    .then((response)=> {
      return response.json() // promise
    }).then((data)=> {
      return data // returned from postReview
    })
}

const deleteReview = (id) => {
  return fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE"
    }).then((response)=> {
      return response.json()
    }).then((data)=> {
      return data
    })
}


export { getReviews, postReview, deleteReview }