# React RESTFul APIs, State, in a Review App.

# Why

Working in a local environment with a separate frontend code and backend code 

# Steps

1. In one terminal navigate to the `reviews-rest-app` and run the project with `npm run dev`
2. In a second separate terminal (without closing the terminal from the previous step) navigate to the folder `reviews-mock-backend`
- We're going to be using the [json-server project](https://github.com/typicode/json-server) to run a "mock-backend". The mock is going to be where we make rest api calls. If you have trouble conceptualizing this there's a live website that's essentially just a live json-server named [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
3. In the `reviews-mock-backend` take a look at the `package.json` file. You'll see in `scripts` a command for `server` this executes `json-server --watch reviews-db.json --port 5000`. 
- run the command `npm run server` in the terminal (of course once you've done an `npm install`) you should see something like this. Leave this running.
```bash
> reviews-mock-backend@1.0.0 server
> json-server --watch review-db.json


  \{^_^}/ hi!

  Loading review-db.json
  Done

  Resources
  http://localhost:5000/reviews

  Home
  http://localhost:5000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```
- Let's also take a look at the file `reviews-db.json`, when we make post requests to this it's going to change this file and act as our database and our RESTful api backend all at once! (As a note if you have any errors in your `reviews-db.json` you can always copy below as your starting point.)
```json
{
  "reviews": [
    {
      "id": 1,
      "title": "Wheel of time",
      "comment": "Books were great but the show was just okay. ",
      "rating": 8
    },
    {
      "id": 2,
      "title": "The Lord of the rings",
      "comment": "A classic movie and a classic book series as well!",
      "rating": 10
    } 
  ]
}
```

3. Once you have the server running open a rest api client and let's make a couple of requests.
- First make a `GET` request with the url `http://localhost:5000/reviews`
you should see something like this. 
```json
[
    {
        "id": 1,
        "title": "Wheel of time",
        "comment": "Books were great but the show was just okay. ",
        "rating": 8
    },
    {
        "id": 2,
        "title": "The Lord of the rings",
        "comment": "A classic movie and a classic book series as well!",
        "rating": 10
    }
]
```
Note: you should see as well that there's a status code of "200 ok", if you didn't most likely your server isn't running.

- Second let's make a `POST` request to the url `http://localhost:5000/reviews` with a header of `'Content-Type': 'application/json'` and a body that looks like this
```json
{
    "title": "Game of thrones",
    "comment": "Books were graphic, show was great until the last 2 seasons",
    "rating": 9 
}
```
Note: you should see a status code of "201 created". A second note is that the `'Content-Type': 'application/json'` sends the information that the body being sent with the request is of the json type.

- Third let's see the changes to our file by executing a `GET` request with the url `http://localhost:5000/reviews`
the response below should reflect the changes in the `reviews-db.json` file.
```json
{
  "reviews": [
    {
      "id": 1,
      "title": "Wheel of time",
      "comment": "Books were great but the show was just okay. ",
      "rating": 8
    },
    {
      "id": 2,
      "title": "The Lord of the rings",
      "comment": "A classic movie and a classic book series as well!",
      "rating": 10
    },
    {
      "title": "Game of thrones",
      "comment": "Books were graphic, show was great until the last 2 seasons",
      "rating": 9,
      "id": 3
    }
  ]
}
```
Note: hopefully these steps clarify how we're going to use our mock-backend. Take note that we're going to be running to separate terminals for this, but you don't need to stress, once you run the command `npm run server` you just leave it running.

4. Let's take a look at the `index.js` page in our frontend. Make sure our frontend is running (`npm run dev` in the folder `reviews-rest-app`).
- First take a look at the form.
  - we're using the `Grid` material ui (mui) component in our form to layout the form.
  - we have two mui `TextField`s to get the "title" and the "comments" of the review so we know we're going to have to use "stateful" variables to get that input.
  - You can see as there's a `RadioGroup` with `Radio` buttons in the form group. You know that you'll need to use state for this as well.
- Second let's take a look at the "Load All Current Reviews" `Button`.
  - This is going to load all of the reviews, so we'll have to click this first and that will call a handler function of sorts that will load the "Adaptation Ratings" that will populate cards (via map below.)
- Third let's take a look at the `Card` in the map that is looping over the const `MOCK_ADAPTATION_RATING`
  - you can see that the object `adaptation` is being used in the JSX in the `Avatar` the `Typography` in the "title" and the `Typography` in the `CardContent`.
  - you can observe that the js looks like our REST API that we took a look at previous steps.
```js
  const MOCK_ADAPTATION_RATING = [{
    'title': 'Fight Club',
    'comment': 'Great movie and book',
    'rating': 10
  }]
```
Note: You can take a look at the MUI docs for this here.
- [React card](https://mui.com/material-ui/react-card/)
- [Radio Buttons](https://mui.com/material-ui/react-radio-button/#main-content)
- [Grid](https://mui.com/material-ui/react-grid/#main-content)
- [TextField](https://mui.com/material-ui/api/text-field/#main-content)

5. Let's refactor the card content so that it simplifies the map for us.
- Create a folder named `components` and create a component named `AdaptationReviewCard` (remember you'll need a file and function to do so) and make sure that the function takes props like the following.
```js
// in the file components/AdaptationReviewCard.js
export default function AdaptationReviewCard(props) {
  // the our code.
}
```
- We're going to copy over the `Card` code from the "map" in our `index.js` page into our code as the "return" value of our new component. We also are going to pass in values via the "props" like follows.
```js
export default function AdaptationReviewCard(props) {
  return <Card sx={{mt: 2 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
          {props.rating}
        </Avatar>
      }
      
      title={
        <Typography variant="body2" color="text.secondary">
          {props.title}
        </Typography>
      }
      
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {props.comment}
      </Typography>
    </CardContent>
  </Card> 
}
```
Note: You'll have to import all MUI components: `Avatar`, `Card`, `CardHeader`, `CardMedia`, `CardContent`, and `Typography` need to be imported.
- now import that component in the `index.js` and we'll change the loop so that we pass the "adaptation" data as props like so.
```js
// import our new component.
import AdaptationReviewCard from '../components/AdaptationReviewCard'

// later where we loop through the code in the JSX
  {MOCK_ADAPTATION_RATING.map((adaptation)=> {
    return <AdaptationReviewCard
        key={key}
        rating={adaptation.rating}
        title={adaptation.title}
        comment={adaptation.comment}
      />
  })}
```
Note: You might be thinking, it would be awesome to do this with the form as well. Your thinking is correct but we will learn this later with global application state.

6. Let's use fetch to get all of the adaptation review data and modify the state to do so.
- Let's add an event handler on the "Load all current reviews button" `Button` and fire this function on the `onClick` of the button. 
```js
// before the jsx but in the component define
  const loadAllReviewsButton = () => {
    console.log('button fired!')
  }
```
- in the jsx
```jsx
<Button
  variant="contained"
  onClick={loadAllReviewsButton}
>
  Load All Current Reviews
</Button>
```
- the let's import `useState` from `react` (in our `index.js` file) and let's make a stateful array for our reviews.
```js
// at the top of the file.
import {useState} from 'react'

// right under the function definition
  const [reviews, setReviews] = useState([])
```
- fetch the data in the load all reviews button. To do this, modify the `loadAllReviewsButton` like so.
```js
  const loadAllReviewsButton = () => {
    fetch(`http://localhost:5000/reviews`)
      .then((response)=> {
        return response.json()
      }).then((data)=> {
        console.log(data)
      })
  }
```
- we need to loop through our new statful `reviews` variable and also set that variable using `setReviews` in the `loadAllReviewsButton`.
Change the `MOCK_ADAPTATION_RATING` to `reviews`
```js
  {reviews.map((adaptation)=> {
    return <AdaptationReviewCard
        rating={adaptation.rating}
        title={adaptation.title}
        comment={adaptation.comment}
      />
  })}
```
Next in the `loadAllReviews` use our function `setReviews` to change the `reviews` to what we've fetched from our backend json server like so.
```js
  const loadAllReviewsButton = () => {
    fetch(`http://localhost:5000/reviews`)
      .then((response)=> {
        return response.json()
      }).then((data)=> {
        setReviews(data)
      })
```
Notes:
- You can now remove the `MOCK_ADAPTATION_RATING` from our code.
- You might be thinking "why I don't I load this on load" and you're right we'll be learning this when we take a look at the component lifecycle and useEffect.

7. Let's give the functionality to be able to POST a new review and save it to our database.
- let's add a submit handler that is going to make the post request to our server (we'll do this in a few steps) and attach to this `onSubmit` event to our `form` in our JSX.
```js
  // in the component above your jsx.
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("submitted form!")
  }
```
- your jsx should look like follows.
```jsx
  <form
    onSubmit={handleSubmit}
  >
```
- let's add a stateful variables for the text fields, so that we can keep track of the state of the `TextField`s
```js
  // under the other stateful variables (it's a good idea to keep)
  // them together.
  const [title, setTitle] = useState("")
  const [comments, setComments] = useState("")
```
- On both `TextField`s we use a callback function on the `onChange` event to execute a function that calls the `setTitle` and `setComments`.
We also set the "value" to the stateful variables of `title` and `comment` respectively like follows.
```jsx
  <>
  <Grid item xs={12} sm={12}>
    <TextField
      id="title"
      name="title"
      label="Adaptation Title"
      fullWidth
      variant="standard"
      value={title}
      onChange={(event)=> { setTitle(event.target.value) }}
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
      onChange={(event)=> { setComments(event.target.value) }}
    />
  </Grid>
  </>
```
- to make sure that everthing is working correctly you `console.log` these variables in your handler function
```js
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("submitted form! our stateful vars are below")
    console.log(title)
    console.log(comments)  
  }
```
8. We also have to get the rating so let's do the same for our `RadioGroup`.
- add a stateful variable for the rating.
```js
  const [rating, setRating] = useState(0)
```
- set the "value" and the `onChange` so that the changes are reflected in the `rating` variable 
```jsx
  <RadioGroup
    row
    aria-labelledby="adaptation-rating"
    name="rating-buttons-group"
    value={rating}
    onChange={(event)=> {setRating(event.target.value)}}
  >
  {
    // all radio button options.
  }
  </RadioGroup>
```
Note: To make sure again you can verify by `console.log` the `rating` in the `handleSubmit` function.

9. Post the data to the server using the stateful variables by modifying the `handleSubmit` to make a "POST" request using `fetch`
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
      console.log(data)
    })
  }
```
Notes about the above:
- You see that we have to add an js object to add all of the options we need to post data to the server.
- the key value pair of `method: "POST",` is how we define the type of request. In the `loadAllReviewsButton` we don't have an object in our fetch request, but really the default is just `{method: "GET"}` if you want to understand both notations.
- the key value pair of for the headers (shown below) just lets the server know that you're going to be sending over a JSON body. Note if you're going to be sending over images or files then you'll need to use a different content type. Another note is that we're going to use our "headers" object to specify "Authorization" to use tokens to log users in (more in this later in the course).
```js
      headers: {
        'Content-Type': 'application/json'       
      },
```
- the last key value pair "body" is the data we're sending. You can see that we're sending over a JSON string of all of our stateful variables. In the body you see that we're just using "title" and "rating", but you can interpret this as `title: title` and `rating: rating` respectively (it's a short hand I want you to get familiar with.).
```js
      body: JSON.stringify({
        title,
        comment: comments,
        rating
      })
```
- You see as well that we're not saving the result and we're just printing it out to the console.

10. Save the review to the new list.
- modify the console 
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

The link to what we're going to do [next class is here](./README-DAY-2.md).

Final Notes:
- We're going to talk about how to organize our network calls in a separate folder next class, with this example.
- We'll revisit this example when we talk about the component lifecycle and useEffect so that we can remove the "Load all current reviews" button and just get the reviews to load.
- We'll also revisit this to add a "Delete" and "Edit" when we discuss routing in our application.
- Using two terminals, one to run your front end and one to run your backend is a very common way of working. So make sure that you feel comfortable with the concepts of using "json-server" alongside you next.js app.
