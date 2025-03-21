import {useState, useEffect} from 'react'

import Button from "@mui/material/Button"

// let's import our own custom component
import Story from './Story'

export default function TopStoriesList() {
  const SLICE_SIZE = 5
  // state
    // one for the entirety
    // one for the "rendered list"
  const [isLoading, setIsLoading] = useState(false)
  const [allStories, setAllStories] = useState([])
  // let's make a paginator that's increase the slice size
  const [page, setPage] = useState(1) // multplied by five and use slice.


  const loadAllStories = async () => {
    setIsLoading(true)
    const URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
    const response = await fetch(URL)
    const data = await response.json()
    setAllStories(data)
    setIsLoading(false)
  }

  // an effect that loads the topstories to a list
  // make the request to the url top stories
  // this should handle the loading state
  // this should update all stories.
  useEffect(()=> {
    // we're going to make the load request here.
    loadAllStories()

  }, []) // [] on mount because we're not in a cleanup function

  const loadMoreStories = () => {
    // increase the page by 1
    setPage(page+1)
  }

  // if you're lazy like dan and you don't want to look at
  // the component profile  you can actually see all of the changes
  // of a stateful
  useEffect(()=> {
    console.log(allStories)
  }, [allStories]) // watch for any changes in all stories


  // handle the loading state by display a loading
  if (isLoading) {
    return "Loading..." // fix make nicer later.
  }

  return <>
    {
      // a list of Story components that will have
      // a prop of id.
      allStories.slice(0, page*SLICE_SIZE).map((storyId)=> {
        // is were
        return <Story key={storyId} id={storyId} />
      })
    }
    <Button
      onClick={loadMoreStories}
      variant="contained"
    >Load {SLICE_SIZE} more stories</Button>
  </>
    // a "load 5 more button"

}