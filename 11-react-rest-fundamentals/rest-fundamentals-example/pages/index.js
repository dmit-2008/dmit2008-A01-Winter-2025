
import { useState } from "react"

import Head from 'next/head'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Home() {
  // I want you to make essentially a stateful or values.
  const [quoteData, setQuoteData] = useState({
    quote: "Default quote",
    author: "default author"
  }) // there's none

  // I want you to create a function that is async
  // makes a request to https://stoic.tekloon.net/stoic-quote to get a random quote.
  const loadRandomQuote = async () => {
    const QUOTE_URL = "/api/random_quote"
    try {
      // let's essentially make a request here.
      const response = await fetch(QUOTE_URL);
      console.log(response)
      // let's parse the response from json to a js object
      const randomQuoteData = await response.json()

      console.log(randomQuoteData)
      setQuoteData(randomQuoteData)

    } catch (error) {
      console.log(error)
      // should be visible to the user whenever you handle an error
    }
  }

  // I want you to set the values in the jsx for this quote.
  return (
    <div>
      <Head>
        <title>We Love Quotes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            We Love Quotes
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            {/*
              Now that we've added this state,
              set the original state to a default
              or I can return early.
            */}
            <Typography variant="h5" align="center" color="text.primary" paragraph>
              {quoteData.quote}
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              {quoteData.author}
            </Typography>
            <Box
             display="flex"
             justifyContent="center"

            >
              <Button
                variant="contained"
                onClick={loadRandomQuote}
              >
                Get New Quote
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  )
}
