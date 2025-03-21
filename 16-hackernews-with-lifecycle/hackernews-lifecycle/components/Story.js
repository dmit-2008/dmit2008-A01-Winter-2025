import {useState, useEffect} from 'react'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// remember destructure the prop.
export default function Story({id}) {
  // I want you to create a stateful value
  // for isLoading (defaults true)
  // for story (which will hold the data)
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState()

  const loadStory = async () => {
    // use a try catch is great practice, I'm not doing it
    // since isLoading is already true we don't need to set it true.
    const STORY_URL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    console.log("Story url", STORY_URL)
    const response = await fetch(STORY_URL)
    const data = await response.json()
    // after we fetch we're going to
    // set the data and set is loading to false.
    setStory(data)
    setIsLoading(false)
  }

  // I want you to make an effect
  // that is going to listen to the changes
  // in the id
  useEffect(()=> {
    // load the story
    loadStory()
  }, [id]) // listen to prop changes.

  // let's take a look at the changes in story
  useEffect(()=> {
    console.log(`onupdate of story ${id}`, story)
  }, [story])


  // see if you can handle the loading state
  // and print the title once loaded.

  // when the id is rendered
  // this will fetch story url
  // from here https://github.com/HackerNews/API?tab=readme-ov-file#items
  // example: https://hacker-news.firebaseio.com/v0/item/43434730.json?print=pretty

  // we're going to whip up some cards with some links
  // and wrap that up.

  // handle the loading state
  if (isLoading) {
    // so many options to display loading
    // a spinner, a skeleton, a progress bar.
    // pick one and go with it.
    return <p>
      {`Loading story ${id}...`}
    </p>
  }

  // if it hits here then we'll have our story
  // console.log(story)

  return <Card sx={{mt: 1}}>
    <CardContent>
      <Link href={story.url} underline="none">
        {story.title}
      </Link>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
        score {story.score} by {story.by}
      </Typography>
    </CardContent>
    <CardActions>
      {/* As a challenge one thing you folks can do
        is build a comment comment component using the
        exact same ideas as this component.
      */}
      <Button variant="contained"size="small">
        Load comments
      </Button>
    </CardActions>
  </Card>

}