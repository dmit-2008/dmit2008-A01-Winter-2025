// to use a context you'll need the useContext hook.
import {useState, useEffect, useContext } from 'react'

import Container from '@mui/material/Container';

import AdaptationReviewList from '../components/AdapatationReviewList';
import AdaptationReviewForm from '../components/AdaptationReviewForm';
import NavBar from '../components/NavBar'
import SEO from '../components/SEO'

// let's import just the context
import { AppNotificationContext } from '../components/state/AppNotification';

import { getReviews } from '../utils/api/reviews'

export default function Home() {
  // we're going get the notification using the context
  const notification = useContext(AppNotificationContext)

  const [reviews, setReviews] = useState([])

  useEffect(()=> {
    loadAllReviews()
  }, [])

  const removeReview = (id) => {
    let currentReviews = reviews.filter((review)=> {
      return review.id !== id
    })
    setReviews(currentReviews)
  }

  const loadAllReviews = () => {
    // we're going to add a message here
    // that the reviews were successfully loaded.

    getReviews().then((data)=> {
      setReviews(data)
      // use my function here
      notification.show({
        message: "Reviews loaded succesfully",
        type: "info"
      })
    }).catch((error)=> {
      notification.show({
        message: "Error while loading reviews",
        type: "error"
      })
    })
  }

  return <>
    <SEO />
    <NavBar title={'Adaptation Reviews'} />
    <Container
      sx={{
        pt: 2,
        pb: 2,
      }}
      maxWidth="md"
      component="main"
    >
      <AdaptationReviewForm
        reviews={reviews}
        setReviews={setReviews}
      />
      <AdaptationReviewList
        reviews={reviews}
        removeReview={removeReview}
      />
    </Container>
  </>
}
