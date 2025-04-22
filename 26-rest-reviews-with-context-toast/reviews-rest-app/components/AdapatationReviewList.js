import AdaptationReviewCard from '../components/AdaptationReviewCard'

export default function AdaptationReviewList(props) {
  return <>
    {props.reviews.map((adaptation, index)=> {
        return <AdaptationReviewCard
            key={index}
            id={adaptation.id}
            rating={adaptation.rating}
            title={adaptation.title}
            comment={adaptation.comment}
            removeReview={props.removeReview}
          />
      })}
  </>
}