import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import TopStoriesList from '@/components/TopStoriesList';

export default function Home() {
  return (
    <div>
      <Container maxWidth="md" component={"main"}>
        <Typography component="h1" variant="h5">
          Top Hacker News Stories
        </Typography>
        <TopStoriesList />
      </Container>
    </div>
  );
}
