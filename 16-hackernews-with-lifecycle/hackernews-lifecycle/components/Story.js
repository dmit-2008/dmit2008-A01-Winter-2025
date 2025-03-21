import {useState, useEffect} from 'react'

// remember destructure the prop.
export default function Story({id}) {
  // I want you to create a stateful value
  // for isLoading (defaults true)
  // for story (which will hold the data)
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState(true)

  const loadStory = async () => {
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

  }, [id]) // listen to prop changes.

  // see if you can handle the loading state
  // and print the title once loaded.


  // when the id is rendered
  // this will fetch story url
  // from here https://github.com/HackerNews/API?tab=readme-ov-file#items
  // example: https://hacker-news.firebaseio.com/v0/item/43434730.json?print=pretty

  // we're going to whip up some cards with some links
  // and wrap that up.




  return <p>
    {id}
  </p>

}