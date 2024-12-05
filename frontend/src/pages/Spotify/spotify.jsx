import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Container, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import SearchOptionSelect from '../../components/MusicNeeds/SearchOptionSelect';
import ArtistSearchField from '../../components/MusicNeeds/ArtistSearchField';
import GenreSelect from '../../components/MusicNeeds/GenreSelect';
import ArtistSelect from '../../components/MusicNeeds/ArtistSelect';
import RecommendationsList from '../../components/MusicNeeds/RecommendationsList';
import LoadingSpinner from '../../components/MusicNeeds/LoadSpinner';

const Spotify = () => {
  const [searchOption, setSearchOption] = useState('artist');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] = useState('');
  const [artists, setArtists] = useState([]);
  const [artistSearch, setArtistSearch] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const fetchWithRetry = useCallback(async (url, options, retries = 5) => {
    try {
      console.log('Request Headers:', options.headers); // Debugging
      const response = await axios(url, options);
      return response;
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after']
          ? parseInt(error.response.headers['retry-after'], 10) * 1000
          : Math.pow(2, 5 - retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return fetchWithRetry(url, options, retries - 1);
      }
      console.error('Request failed:', error.response?.data || error.message); // Debugging
      throw error;
    }
  }, []);
  

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`,
          },
        }
      );
  
      console.log('Access Token Fetched:', response.data.access_token); // Debugging
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error.response?.data || error.message);
      throw new Error('Failed to fetch Spotify access token');
    }
  }, [client_id, client_secret]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = await fetchAccessToken();
        console.log('Using token for genres:', token); // Debugging
        const response = await fetchWithRetry(
          'https://api.spotify.com/v1/recommendations/available-genre-seeds',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Genres fetched:', response.data); // Debugging
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error.response?.data || error.message);
      }
    };    

    fetchGenres();
  }, [fetchAccessToken, fetchWithRetry]);

  useEffect(() => {
    if (genre) {
      const fetchArtists = async () => {
        try {
          const token = await fetchAccessToken();
          const response = await fetchWithRetry(
            'https://api.spotify.com/v1/search',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                q: `genre:${genre}`,
                type: 'artist',
                limit: 10,
              },
            }
          );
          setArtists(response.data.artists.items);
        } catch (error) {
          console.error('Error fetching artists:', error);
        }
      };

      fetchArtists();
    }
  }, [genre, fetchAccessToken, fetchWithRetry]);

  useEffect(() => {
    setRecommendations([]);
  }, [searchOption]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let artistId = '';
    if (searchOption === 'artist') {
      const searchResponse = await fetchWithRetry(
        'https://api.spotify.com/v1/search',
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
          params: {
            q: artistSearch,
            type: 'artist',
            limit: 1,
          },
        }
      );

      if (searchResponse.data.artists.items.length > 0) {
        artistId = searchResponse.data.artists.items[0].id;
        console.log('Found Artist ID:', artistId); // Debugging
      } else {
        console.error('Artist not found');
        setLoading(false);
        return;
      }
    } else {
      artistId = artist;
    }

    const response = await fetchWithRetry(
      'https://api.spotify.com/v1/recommendations',
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken()}`,
        },
        params: {
          seed_artists: artistId,
        },
      }
    );

    console.log('Recommendations:', response.data.tracks); // Debugging
    setRecommendations(response.data.tracks);
  } catch (error) {
    console.error('Error fetching recommendations:', error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Container
      component={motion.div}
      sx={{
        bgcolor: 'transparent',
        color: 'white',
        minHeight: '80vh',
        height:"100%",
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        border: 'none',
        marginTop: "80px",
      }}
      
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h3" gutterBottom align="center" color="#D3D3D3">
        Song Recommendations
      </Typography>
      <Divider sx={{ my: 2, borderColor: '#333' }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#1E1E1E',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 600,
          border: 'none'
        }}
      >
        <SearchOptionSelect
          searchOption={searchOption}
          setSearchOption={setSearchOption}
        />

        {searchOption === 'artist' && (
          <ArtistSearchField
            artistSearch={artistSearch}
            setArtistSearch={setArtistSearch}
          />
        )}

        {searchOption === 'genre' && (
          <>
            <GenreSelect genre={genre} setGenre={setGenre} genres={genres} />
            {genre && (
              <ArtistSelect artist={artist} setArtist={setArtist} artists={artists} />
            )}
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#B0B0B0', color: '#000', '&:hover': { backgroundColor: '#A0A0A0' } }}
        >
          Get Recommendations
        </Button>
      </Box>

      <Box
        sx={{
          mt: 4,
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2
        }}
      >
        {/* <Typography variant="h5">Recommendations:</Typography> */}
        <Divider sx={{ my: 2, borderColor: '#333' }} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <RecommendationsList recommendations={recommendations} />
        )}
      </Box>
    </Container>
  );
};

export default Spotify;
