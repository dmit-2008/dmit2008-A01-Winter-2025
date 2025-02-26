# React RESTFul APIs, State, in a Review App, Day 2.

# What have we done so far?

When your frontend and backend are running you should be able to create new reviews to adaptations and you should be able to load them on your page.

# Why are we changing it.

We've got a lot going on with our current project and we want to keep things organized so what we're going to do is that we're going to do.

There's a few differing opinions on how to do this but doing this is a very important part of development as a whole.

# Steps

1. Create a folder called `utils` and within that folder cre ate a folder named `api`
2. Within that folder create a file named `base.js` (within the `utils/api` folder)
this is goingto contain our `BASE_URL`.
This is going to allows us to keep this project organized. 
```js
export const BASE_URL = 'http://localhost:5000'
```
We're only going to add the BASE_URL this file.
3. Let's create a file named `reviews.js` (within the `utils/api` folder ). 
This is going to have our GET and POST requests we made earlier.
- The first step is that we're going to import the `BASE_URL` to our file. 
```js 
import { BASE_URL } from './base.js'
```
so our file should look like the above.
4. Let's see fetch calls we can put in our `utils/api/reviews.js` file.
- Now go back into your `index.js` file in the `pages` folder of your application (where we've been building all of last class you can refer back to the steps in the [README](./README.md) ).
You can see the that we have a couple of functions that make calls with `fetch` in our javascript, those are `handleSubmit` and `loadAllReviewsButton`.
- There a bit long.
These are going to be the network calls we're going to put in our `reviews.js` file.
5. Let's create our `getReviews` function.
- Create a function in your `reviews.js` file that looks like the following.
```js
const getReviews = () => {
  // our fetch requests here.
}
```
- in let's define our function to `getReviews` which we'll use in our `BASE_URL` to make the call.
```js
const getReviews = () => {
  // returning the fetch will make our "getReviews"
  // function a promise, because it is going over the
  // network it needs to be asynchronous.
  return fetch(`${BASE_URL}/reviews/`, {
  	  method: "GET",
      headers: {
        'Content-Type': 'application/json'       
      }
  	})
    .then((response)=> {
      return response.json()
    }).then((data)=> {
      // using Promise.resolve here will pass the data we have
      // fetched here as the returnedData passed when we use the function.
      // getReviews().then((returnedData)=> { // when used in other places.})
      return Promise.resolve(data)
    })
}
```
Note: although in this case we don't necessarily need to use the last `.then` since we're just using `return Promise.resolve(data)`, I would prefer you folks to use this as you can modify the returned object. Say for example you just a part of that object, then you could just return part of the returned object.

- next step to make this useable is that we need to export this function.
So below where you've defined this function use the export like so.

```js
export {getReviews}
```
Note: We're not making a default export because we need to also export other functions from this file.

6. Let's use our `getReviews` in our application.
- open the `pages/index.js` find the `loadAllReviewsButton` function, it should look like so.
```js
  const loadAllReviewsButton = () => {
    fetch(`http://localhost:5000/reviews`)
      .then((response)=> {
        return response.json()
      }).then((data)=> {
        setReviews(data)
      })
  }
```
- now we know where that is at the top of the file (below your other imports ) import the `getReviews` function from the `utils/api/reviews.js` that we've created.
```js
import { getReviews } from '../utils/api/reviews.js'
```

- change that function so that what you can do is change it to use our newly created function.
```js
  const loadAllReviewsButton = () => {
    getReviews().then((data)=> {
      setReviews(data)
    })
  }
```
This is a small change where we can see that we've saved a bit of lines. Next we'll take a look at the `handleSubmit` function that takes up a bit more space.

7. Let's create a `postReview` function in the `utils/api/reviews.js`
```js
const postReview = () => {
 	 
}
```

8. Let's take a look at the `handleSubmit` in the `pages/index.js` it looks like below.
```js
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:5000/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'       
      },
      body: JSON.stringify({
        title,
        comment: comments,
        rating
      })
    }).then((response)=> {
      return response.json()
    }).then((data)=> {
      // you see here we're making a new list
      // with the first element being "data", the object we've just created.
      // and the next elements as all of the rest of the existing "reviews"
      // this is using the spread operator.
      setReviews([data, ...reviews])
    })
  }
```
Now you might be thinking to your self, let's do just do the exact same thing as we did with the function definition of `getReviews`. But you have to notice something here, look at the `body` key of the `"POST"` request, we are using a few stateful variables from our component `title`, `comments` and `rating` so we'll have to pass those variables into our `postReviews` function.

8. Let's modify our  `postReview` function in the `utils/api/reviews.js`
- We're going to pass an object to the `postReviews` function so that we can pass the keys in no specific order. 
```js
const postReview = ({title, comment, rating}) => {
 	
}
```
- Let's now add our fetch request and resolve the promise.
```js
const postReview = ({title, comment, rating}) => {
  // always return the fetch, because you need to return the fetch promise!
  return fetch(`${BASE_URL}/reviews/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'       
    },
    body: JSON.stringify({
      title,
      comment,
      rating
    })
  }).then((response)=> {
    return response.json()
  }).then((data)=> {
    // using Promise.resolve here will pass the data we have
    // fetched here as the returnedData passed when we use the function.
    // postReview({title: title,
    //	 comment: comment,
    //   rating: rating}).then((returnedData) => { }))
    // where title, comment and rating or function 
  	return Promise.resolve(data)
  })
}
```
Now that we pass in the `title`, `comment` and `rating` as arguments we can pass them in.
9. We need to export our `postReview` function from our `utils/api/reviews.js`
```js
// rest of the reviews function.

export { getReviews, postReview }
```
10. Let's use this function in our `pages/index.js` 
- import the `postReview` function that you've exported in to that file.
```js
import { getReviews, postReview } from '../utils/api/reviews.js'
```
- Change the the `handleSubmit` function form the below.
```js
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:5000/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'       
      },
      body: JSON.stringify({
        title,
        comment: comments,
        rating
      })
    }).then((response)=> {
      return response.json()
    }).then((data)=> {
      // you see here we're making a new list
      // with the first element being "data", the object we've just created.
      // and the next elements as all of the rest of the existing "reviews"
      // this is using the spread operator.
      setReviews([data, ...reviews])
    })
  }
```
to use our newly created function, since our `title`, `comment`, and `rating` are passed in as an object we'll have to make sure we do the same. Like the following.
```js
  const loadAllReviewsButton = () => {
    fetch(`http://localhost:5000/reviews`)
      .then((response)=> {
        return response.json()
      }).then((data)=> {
        setReviews(data)
      })
  }
```

11. Let's now take a look at the logic in the `pages/index.js` all we have is the following.
```js 
// other imports

import { getReviews, postReview } from '../utils/api/reviews.js'

export default function Home() {
  const [reviews, setReviews] = useState([])
  const [title, setTitle] = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    postReview({
        title,
        comment: comments,
        rating
      }).then((data)=> {
        setReviews([data, ...reviews])
      })
  }

  const loadAllReviewsButton = () => {
    getReviews().then((data)=> {
      setReviews(data)
    })
  }

  return // the rest of the jsx here
```

Final Notes:
- Hopefully you can see here that we can keep our project a bit more organized. This is going to be a pretty standard way of organizing our projects.
- If we really wanted to take this further which we might in the future, is that we could add a default `headers` object so that we don't have tell the request that is `'Content-Type': 'application/json'` every single time.
- As well if we have another type of rest api request say for example `userComment` then we could create a new file in our `utils/api` folder to keep it organized.
 