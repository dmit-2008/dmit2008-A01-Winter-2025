import { BASE_URL } from "./base"


/*
This is uses guarded routes

please refer to https://github.com/jeremyben/json-server-auth#guarded-routes-

This is more of a concept that is enforced on the backend, and we can definitely
discuss more if you'd like.
*/
const getProtectedPosts = (authToken) => {
  let headers = {}
  if (authToken) {
    headers = {
      "Authorization": `Bearer ${authToken}`
    }
  }
  return fetch(`${BASE_URL}/660/posts/`, {
    method: "GET",
    headers: headers
  }).then((response)=> {
    return response.json()
  }).then((posts)=> {
    return posts
  })
}

export { getProtectedPosts }