// remember destructure the prop.
export default function Story({id}) {
  // we're going to make an effect
  // that is going to listen to the changes
  // in the id
  // when the id is rendered
  // this will fetch s0tory url
  // from here https://github.com/HackerNews/API?tab=readme-ov-file#items

  // we're going to whip up some cards with some links
  // and wrap that up.

  return <p>
    {id}
  </p>

}