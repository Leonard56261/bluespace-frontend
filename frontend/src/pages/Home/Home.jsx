import { React, useEffect } from 'react';
import CardMusic from '../../components/NavBar/card/CardMusic';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid } from '@mui/material';
import './Home.css';

import VintageJournal from "../../components/imgs/Vintage-journal.jpg"
import Spotify from "../../components/imgs/Spotify.jpg"
import Doodle from "../../components/imgs/Doodle.jpg"
import Movie from "../../components/imgs/Movie.jpg"
import Chat from "../../components/imgs/Chat.jpg"

export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "60px" }}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={4}>
          <CardMusic
            title="Mental Health Playlist"
            description="Need a mental boost? Let our playlist lift your spirits with relaxing tunes. Click here to find your personalized soundtrack for de-stressing!"
            imageUrl={Spotify}
            buttonText={<SearchIcon />}
            location="/music"
          />
        </Grid> */}

        <Grid item xs={12} sm={4}>
          <CardMusic
            title="Express Through Art"
            description="Feeling overwhelmed? Unwind and express yourself on a digital canvas. Create, draw, and relax with our guided doodle space."
            imageUrl={Doodle}
            buttonText="Start Drawing"
            location="/canvas"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardMusic
            title="Discover Films for Your Mood"
            description="Find movies or shows that match your emotional state. Get personalized recommendations to relax or uplift your mood."
            imageUrl={Movie}
            buttonText="Get Recommendations"
            location="/movies"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardMusic
            title="Your Mental Health Journal"
            description="Keep track of your thoughts and emotions in a private journal designed for reflection and self-care. Start your journey now!"
            imageUrl={VintageJournal}
            buttonText="Begin Journaling"
            location="/user/journal"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardMusic
            title="BluePal: Your 24/7 Support"
            description="Need someone to talk to? Chat with BluePal anytime for advice, support, or a comforting conversation. We're here for you."
            imageUrl={Chat}
            buttonText="Chat Now"
            location="/chat"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
