# React Component Library - Bootstrap

# Why?

Almost all Apps have different pages, and with Next.js we want to learn and understand the page functionality. This is going to allow us to go back and forth and navigate our application.

# Steps

1. First let's take a look at the `pages` directory. There's two files there now `index.js` and `about.js`.
Note: you'll also need to install the dependencies and run your server there (`npm install` then `npm run dev`)
If you go to your browser you'll see there's now two pages that you can navigate to
	- `http://localhost:3000/` to render the `index.js` page component
	- `http://localhost:3000/about/` to render the `about.js` page component.
You'll also see that there's a `NavBar` component in both pages.
2. Open the `components/NavBar.js` file and add links so that we can navigate back and forth.
- Import Link for Next.js in `components/NavBar.js`
```jsx
import Link from 'next/link'

// ... rest of component
```
- Wrap the Typography components in a `Link` component and give the respective href props to the page.
So the `components/NavBar.js` goes from this
```jsx
// ... imports here ...

export default function NavBar(props) {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Space Agency App
      </Typography>
      <Typography variant="h6" component="div" >
        About
      </Typography>
    </Toolbar>
  </AppBar>
}
```
To have the `Link`s like so:
```jsx
// ... imports here ...

import Link from 'next/link'

export default function NavBar(props) {
  return <AppBar position="static">
    <Toolbar>
      <Link href="/">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Space Agency App
        </Typography>
      </Link>
      <Link href="/about/">
        <Typography variant="h6" component="div" >
          About
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
}
```
Now you can navigate back and forth between the pages and you can see the url change accordingly.

3. What we want to do in this application is add some Agencies and Give them their own page so that we can get more details on them. Let's render the agencies first.
- Observe in `utils/api/agencies.js` that we have a function `getAgencies` that will fetch the featured agencies. We'll use this.
Note: If you want to see what the RESTful API call returns, go put it into a rest client so that you can see the results (you can also go take a look at the space api documentation)
- Using our knowledge of the "React Lifecycle" let's fetch the agencies (in our `pages/index.js`) and use a stateful variable to "set" the data so we can use it in our JSX.
- Open `pages/index.js` and let's import the required pieces to implement the past step.
```jsx
import { useEffect, useState } from 'react'

// ... existing imports ...

import { getAgencies } from '@utils/api/agencies'

// ... rest of the component ...
```
- Let's create a stateful variable named `agenciesData` and set that variable when the page "mounts"
```jsx
// ... component imports

export default function Home() {
  const [agenciesData, setAgenciesData] = useState([])
  
  useEffect(()=> {
    // fire this on load.
    getAgencies().then((data)=> {
      console.log(data)
      setAgenciesData(data.results)
    })
  }, [])

  // jsx here.
```
Note that agenciesData is a list of agencies that we'll need to loop through.
- Now that we our `agenciesData` being set, notice that in our components we have `components/AgencyCard.js`, and there's a bunch of props that are being set to take a look at.
- Let's loop through the `agenciesData` (using `map`) use the `AgencyCard` in he `Box` in the component in `pages/index.js`.
```jsx
<Box
  sx={{
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  {agenciesData.map((agency)=> {
    return <AgencyCard
      key={agency.id}
      id={agency.id}
      imageUrl={agency.image_url}
      name={agency.name}
      abbreviation={agency.abbrev}
      description={agency.description}
    />
  })}
</Box>
```
Notes: Take a look at the props in the `AgencyCard` if you want to see the details.

Now you can see all of the agencies displayed on the home page of the application.

4. Let's create an "agency" page in our app and navigate to it via the id.
- in the `pages` directory create a folder named `agency` and within that folder create a file named `[id].js`.
- in the file `pages/agency/[id].js` add the following contents
```jsx
import Head from 'next/head'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import NavBar from '@components/NavBar';
import SimpleDetailsCard from '@components/SimpleDetailsCard'


export default function Agency() {
  return <>
    <NavBar />
    <Container sx={{paddingTop:2}}>
      <Grid container>
        <Grid item xs="2">
        </Grid>
        <Grid item xs="10">
          <Typography variant="h3" gutterBottom>
            Agency Page
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>
}
```
This is essentially just a plain old page in next.js You can navigate to this page by going to `http://localhost:3001/agency/4` and instead of `4` you can in the url you can put whatever you want.
- Let's modify this page so that it uses the url arguments. First you'll have to import the `useRouter` hook from `next/router` in the `pages/agency/[id].js` like below. We'll also initialize the router so that we can use the "id" in our component.
```jsx
import { useRouter } from 'next/router'

// ... rest of the imports ...

export default Agency() {
	const router = useRouter()
	const { id } = router.query // Note: this uses destructuring!

	return  <>
    <NavBar />
    <Container sx={{paddingTop:2}}>
      <Grid container>
        <Grid item xs="2">
        </Grid>
        <Grid item xs="10">
          <Typography variant="h3" gutterBottom>
            Agency Page for {id}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>
}
```
Now you can see the id is being rendered on the page, observe the differences on going to the url `http://localhost:3001/agency/200` and `http://localhost:3001/agency/4` in your browser.
5. Let's Navigate to that page from the "Home" page via the `AgencyCard` component, now that we have a page that is unique per "id" for each agency.
- open the `components/AgencyCard.js` file and import the next.js `useRouter` hook, and 
```jsx
import { useRouter } from 'next/router'

// ... other imports ...

export default function AgencyCard(props) {
	const router = useRouter()

	// ... agency card jsx ...
```
- Now let's add a callback function to the buttons' `onClick` event to navigate to our new "agency" page. You'll use the `router.push` function with the path as the parameter
```jsx

export default function AgencyCard(props) {
    const router = useRouter()

    const navigateToAgencyPage = () => {
      router.push(`/agency/${props.id}`)
    }

    return <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
    {
    	//... other jsx ...
    }
    <CardActions>
      <Button
      	size="small"
        onClick={navigateToAgencyPage}
      >
      	Go to Agency
      </Button>
    </CardActions>
  </Card>
}
```
Note we passed in the "id" in the props in the `pages/index.js` page (shown below.)
```jsx
{agenciesData.map((agency)=> {
  return <AgencyCard
    key={agency.id}
    id={agency.id}
    imageUrl={agency.image_url}
    name={agency.name}
    abbreviation={agency.abbrev}
    description={agency.description}
  />
})}
```
Now that you have this call back go to the page and click the "Go To Agency" button you can see that our application navigates to each id, you can see that rendered on the page.
6. On the `pages/agency/[id].js` let's load the specific agency data using the `getAgency` method in `utils/api/agencies.js`.
- open the `pages/agency/[id].js` and import `useEffect` and `useState` from `"react"` and also `getAgency` and create the stateful variable `agencyDetails`
```jsx
import { useEffect, useState } from 'react'

// ... other imports ...

import {getAgency} from '@utils/api/agencies'

export default function Agency() {
    const [agencyDetails, setAgencyDetails] = useState()

    const router = useRouter()
    const { id } = router.query 

    // ... rest of the component ...
```
- let's load the data on on the agency page using "useEffect" but by passing the "id" to the dependency array from the `const { id } = router.query` like so.
```jsx
// ...imports ...
export default function Agency() {
    const [agencyDetails, setAgencyDetails] = useState()

    const router = useRouter()
    const { id } = router.query 

    useEffect(()=> {
        getAgency(id).then((data)=> {
            setAgencyDetails(data)
        })
    }, [id])

    // ... rest of the component ...
```
- once we have the data loaded let's change our JSX to use a ternary to display the information. (Notice the `components/LoadingCircle.js` component, that is just a spinner). Our component now becomes.
```jsx
export default function Agency() {
  const [agencyDetails, setAgencyDetails] = useState()

  const router = useRouter()
  const { id } = router.query

  useEffect(()=> {
      getAgency(id).then((data)=> {
          setAgencyDetails(data)
      })
  }, [id])

  return <>
    <NavBar />
    { !agencyDetails?
      <LoadingCircle />
      :
      <Container sx={{paddingTop:2}}>
        <Grid container>
          <Grid item xs="2">
          	<img
                alt={agencyDetails.name}
                src={agencyDetails.logo_url}
                style={{
                    width: `120px`
                }}
            />
          </Grid>
          <Grid item xs="10">
            <Typography variant="h3" gutterBottom>
              {`${agencyDetails.name} (${agencyDetails.abbrev})`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    }
  </>
}
```
Now we are leveraging our knowledge of ternaries and state. If the `agencyDetails` is undefined (original value as we didn't set it to anything) the `LoadingCircle` will be displayed. Once the data is loaded you see that we've changed the title in the `Typography` component to use the details from the REST API (note if you want to take a deeper look at this data look at the docs or execute the request in a REST API client). 
- Once we have that data loaded we add some more information to that agency let's add some inofmration about an agency launches like below. Notice that we're using the component `SimpleDetailsCard`, let's go take a look at the available props as well.
```jsx
// rest of the component 
<Container sx={{paddingTop:2}}>
  <Grid container>
    <Grid item xs="2">
    	<img
          alt={agencyDetails.name}
          src={agencyDetails.logo_url}
          style={{
              width: `120px`
          }}
      />
    </Grid>
    <Grid item xs="10">
      <Typography variant="h3" gutterBottom>
        {`${agencyDetails.name} (${agencyDetails.abbrev})`}
      </Typography>
    </Grid>
    <Grid item xs="4">
      <Typography variant="h5">
          {`Launch Details`}
      </Typography>
      <SimpleDetailsCard 
          title={'Total Launches'}
          description={agencyDetails.total_launch_count}
      />
      <SimpleDetailsCard 
          title={'Successful Launches'}
          description={agencyDetails.successful_launches}
      />
      <SimpleDetailsCard 
          title={'Successful Landings'}
          description={`${agencyDetails.successful_landings}`}
      />
    </Grid>
  </Grid>
</Container>
```
observe that now we have details specific to that agencys launches.
- Let's add some more data about the space agency.
```jsx
// rest of the component 
<Container sx={{paddingTop:2}}>
  <Grid container>
    {/* Reset of the grid*/}
    <Grid item xs="4">
      <Typography variant="h5">
          {`Agency Information`}
      </Typography>
      <SimpleDetailsCard 
          title={'administrator'}
          description={`${agencyDetails.administrator}`}
      />
      <SimpleDetailsCard 
          title={'Space Agency Details'}
          description={`Founded ${agencyDetails.founding_year}`}
          subDescription={agencyDetails.description}
      />
	  </Grid>
  </Grid>
</Container>
```
You can note here that if you wanted to you could break these sections into smaller components to not make the page so large.
- Let's add one more section for the spacecraft.
```jsx
// rest of the component 
<Container sx={{paddingTop:2}}>
  <Grid container>
    {/* Reset of the grid*/}
		<Grid item xs="4">
      <Typography variant="h5">
          {`SpaceCraft`}
      </Typography>
      { agencyDetails.spacecraft_list && agencyDetails.spacecraft_list.map((spaceCraft)=> {
          return <SimpleDetailsCard 
          		key={spaceCraft.id}
              description={`${spaceCraft.name}`}
              buttonCallback={()=> {
              	console.log("go to the space page")    
              }}
              buttonName="Go to SpaceCraft"
          	/>
      })}
  </Grid>
</Container>
```
Notice we're using our "short circuit" technique and listing all of the agency spacecraft. You can also not that we are passing a function as a prop that you can probably guess will navigate to a spacecraft page.

7. Let's create a spacecraft page that loads the data.
- create a folder in `pages` called `spacecraft` and within that folder create a file named `[spaceCraftId].js`
- within that file let's add the following information.
```jsx
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import NavBar from '@components/NavBar';
import SimpleDetailsCard from '@components/SimpleDetailsCard';
import LoadingCircle from '@components/LoadingCircle'

export default function SpaceCraft() {
  return  <>
    <NavBar />
    <Container sx={{paddingTop:2}}>
      <Grid container>
        <Grid xs="12" item>
          <Typography variant="h3" gutterBottom>
            SpaceCraft Page
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>
}
```
Now if you go to `http://localhost:3001/spacecraft/1235` you should have the page rendered correctly.
- Let's set a stateful variable `spaceCraftDetails` from the `getSpaceCraft` api call from `utils/api/spaceCraft.js`. We'll set `spaceCraftDetails` using `useEffect` with a dependency array of `spaceCraftId` which we'll get with our router. Let's see what this looks like.
```jsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ... other imports ...

import { getSpaceCraft } from '@utils/api/spaceCraft';

export default function SpaceCraft() {
    const [spaceCraftDetails, setSpaceCraftDetails] = useState()

    const router = useRouter()
    const { spaceCraftId } = router.query
    
    useEffect(()=> {
      getSpaceCraft(spaceCraftId).then((data)=> {
        setSpaceCraftDetails(data)
      })
    }, [spaceCraftId])

    // ... JSX ...
}
```
Notice here that the `spaceCraftId` is the same as the file name, so everytime the url changes the page will load different data.
- Edit the JSX of the spaceCraft component like below.
```jsx
// ... rest of the component ...
	return  <>
    <NavBar />
    {!spaceCraftDetails ? 
      <LoadingCircle />
      :
      <Container sx={{paddingTop:2}}>
        <Grid container>
          <Grid xs="12" item>
            <Typography variant="h3" gutterBottom>
               {spaceCraftDetails.name}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    }
  </>
```
- Now if you go back to your `pages/agency/[id].js` page, change the `buttonCallback` to the spacecraft page, using the `spaceCraft.id`.
```jsx
// rest of the component 
  { agencyDetails.spacecraft_list &&
  	agencyDetails.spacecraft_list.map((spaceCraft)=> {
      return <SimpleDetailsCard 
      		key={spaceCraft.id}
          description={`${spaceCraft.name}`}
          buttonCallback={()=> {
          	router.push(`/spacecraft/${spaceCraft.id}`)     
          }}
          buttonName="Go to SpaceCraft"
      	/>
  })}
```
Notice if you click on the button now it navigates to our new "spacecraft" page.
- Lastly let's add a bit more information in the JSX of the spacecraft page.
```jsx
	return  <>
    <NavBar />
    {!spaceCraftDetails ? 
      <LoadingCircle />
      :
      <Container sx={{paddingTop:2}}>
        <Grid container>
          <Grid xs="12" item>
            <Typography variant="h3" gutterBottom>
               {spaceCraftDetails.name}
            </Typography>
          </Grid>
	        <Grid item xs="4">
	          <SimpleDetailsCard 
	            title={`${spaceCraftDetails.name} details`}
	            subDescription={spaceCraftDetails.description}
	          />
	        </Grid>
	        <Grid item xs="4">
	          <SimpleDetailsCard 
	            title={`${spaceCraftDetails.name} configuration`}
	            subDescription={spaceCraftDetails.spacecraft_config.details}
	          />
	        </Grid>
        </Grid>
      </Container>
    }
  </>
```

## IMPORTANT NOTE:
In the base of our project we have a `jsconfig.json` that allows us to not to have to use relative file paths in our own imports. 
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components/*": ["components/*"],
      "@layouts/*": ["layouts/*"],
      "@styles/*": ["styles/*"],
      "@utils/*": ["utils/*"],
    }
  }
}
```

# Conclusion

With this lengthy example you should feel comfortable now creating your own pages and using some of the next router components.

# Challenges
- Create a button that will load more data to the agencies
- create a launcher page and display the information
