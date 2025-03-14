import { useState } from 'react'
import Head from 'next/head'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import Navbar from '../components/Navbar';
import NewReviewForm from '../components/NewReviewForm';
import ReviewCard from '../components/ReviewCard';
import ReviewsList from '../components/ReviewsList';

import { deleteReview } from '../utils/api/reviews';
// learned exercise
import reviewsAPI from '../utils/api/reviewsAPIAsObject';


export default function Home() {
  // the stateful values.
  const [reviews, setReviews] = useState([])

  // fetch the data.
  // and render it on the page.
  // with a function that will be triggered with the
  // load button.
  const loadReviews = async () => {
    // const data = await getReviews()
    // learned exercise
    const data = await reviewsAPI.get()
    // set the reviews
    setReviews(data)
  }

  // put the form in it's component
  // know what props are needed and what state needs
  // to be in that component vs this component.

  return (
    <div>
      <Head>
        <title>Adaptation Reviews.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Container maxWidth="md">
          <NewReviewForm
            reviews={reviews}
            setReviews={setReviews}
            loadReviews={loadReviews}
          />
          <Box
            sx={{
              pt: 2,
              pb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={loadReviews}
            >
              Load All Current Reviews
            </Button>
          </Box>
          <ReviewsList
            reviews={reviews}
            setReviews={setReviews}
            loadReviews={loadReviews}
          />
        </Container>
      </main>
    </div>
  )
}
