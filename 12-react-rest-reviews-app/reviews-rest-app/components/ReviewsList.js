export default function ReviewsList({
  reviews,
  // we are passing these props down more than one level
  // not using them in this components
  // we'll take a look later at the context api
  // so that you can clearly import without passing
  // as props
  setReivews,
  loadReviews
}) {

  // I'm going to put all of the cards created
  // from the map in a fragment which below is used
  // by the <> </> tags (this is the shorthand.)
  // doesn't create an extra node in html
  // makes it usable in react.
  return <>
    {reviews.map((adaptation)=> {
      // we remove the old card and change it
      // with our new component.
      return <ReviewCard
        key={adaptation.id}
        rating={adaptation.rating}
        id={adaptation.id}
        title={adaptation.title}
        comment={adaptation.comment}

        reviews={reviews}
        setReviews={setReviews}
        loadReviews={loadReviews}
      />
      // a slightly different way of writing
      // the above. what we can do is spread
      // the object of adaptation as props.
      // return <ReviewCard
      //   key={adaptation.id}
      //   {...adaptation}
      //   reviews={reviews}
      //   setReviews={setReviews}
      //   loadReviews={loadReviews}
      // />

    })}
  </>
}