// import the useEffect and usestate
import { useEffect, useState } from 'react';

// since we'll be using the path variables
// need to import the router
import {useRouter} from 'next/router'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import NavBar from '@components/NavBar';

// let's import the api function to get the data from the agency
import { getAgency } from '@utils/api/agencies';

export default function Agency() {
  // initialize to load the data
  const [isLoading, setIsLoading] = useState(true) // we're going to fetch it when the page loads
  const [agency, setAgency] = useState()

  // we're going initialize the router.
  const router = useRouter()
  // we're going to use the "agencyId" variable
  // from the path because our filename is [agencyId].js
  // which is a dynamic path
  const {agencyId} = router.query

  // let's also take a look at the router
  // observe the router.isReady
  console.log(router)

  // let's load the data
  const loadAgency = async () => {
    const data = await getAgency(agencyId)
    // set the agency data and the loading to false.
    setAgency(data)
    setIsLoading(false)
  }

  // let's get this data when the router is ready or when the agency id is
  // populated.
  useEffect(()=> {
    // sometimes the page is going to load without the router being ready.
    // You'll have to use a "guard pattern" here to stop execution if
    // agencyId is not defined and that's we'll do in the following lines
    // note you can also check here for "router.isReady" as if the router is
    // ready you'll get the id.
    if (!agencyId) {
      return // skip everything below this.
    }

    loadAgency() // load the specific data for a given page.
  }, [agencyId])

  // we're going to handle the loading state
  // on your own you can handle the error state
  if (isLoading) {
    return `Loading ${agencyId}`
  }

  // we're going to display the agency info


  return (
    <div>
      <NavBar />
      <Container sx={{paddingTop:2}} component="main" maxWidth="xs">
        <Typography variant="h3">
          {/* We're going to use our data to display the piece
            show the agency name and the abbreviation.
          */}
          {`${agency.name} (${agency.abbrev})`}
        </Typography>
        <Typography variant="p">
          Our agency data...
        </Typography>
      </Container>
    </div>
  )
}
