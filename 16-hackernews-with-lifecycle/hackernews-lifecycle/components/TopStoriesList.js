import {useState, useEffect} from 'react'

import Button from "@mui/material/Button"


export default function TopStoriesList() {
  // state
    // one for the entirety
    // one for the "rendered list"
  const [isLoading, setIsLoading] = useState(false)
  const [allStories, setAllStories] = useState()

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


  // if you're lazy like dan and you don't want to look at
  // the component profile  you can actually see all of the changes
  // of a stateful
  useEffect(()=> {
    console.log(allStories)
  }, [allStories]) // watch for any changes in all stories



  return <>
    {
      // a list of Story components that will have
      // a prop of id.
    }
    <Button variant="contained">Load five more stories</Button>
  </>
    // a "load 5 more button"

}