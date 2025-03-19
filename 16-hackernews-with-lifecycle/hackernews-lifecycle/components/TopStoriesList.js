import {useState, useEffect} from 'react'

import Button from "@mui/material/Button"


export default function TopStoriesList() {
  // state
    // one for the entirety
    // one for the "rendered list"
  const [isLoading, setIsLoading] = useState(false)
  const [allStories, setAllStories] = useState()

  // an effect that loads the topstories to a list
  // make the request to the url top stories
  // this should handle the loading state
  // this should update all stories.


  return <>
    {
      // a list of Story components that will have
      // a prop of id.
    }
    <Button variant="contained">Load five more stories</Button>
  </>
    // a "load 5 more button"

}