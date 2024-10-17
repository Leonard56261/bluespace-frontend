import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import TypeSelector from '../../components/MovieNeeds/TypeSelector';
import GenreSelect from '../../components/MovieNeeds/GenreSelect';
import LanguageSelect from '../../components/MovieNeeds/LanguageSelect';
import DecadeSelect from '../../components/MovieNeeds/DecadeSelect';
import RecommendationsList from '../../components/MovieNeeds/RecommendationsList';

const MovieShowRecommendations = () => {
  const [type, setType] = useState('movie');
  const [genre, setGenre] = useState('any');
  const [genres, setGenres] = useState([]);
  const [decade, setDecade] = useState('any');
  const [recommendations, setRecommendations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const api_key = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list`, {
          params: { api_key },
        });
        setGenres([{ id: 'any', name: 'Any' }, ...response.data.genres]);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [type, api_key]);

  // Manually specify the top 10 popular languages
  const popularLanguages = [
    { iso_639_1: 'en', english_name: 'English' },
    { iso_639_1: 'hi', english_name: 'Hindi' },
    { iso_639_1: 'ko', english_name: 'Korean' },
    { iso_639_1: 'ja', english_name: 'Japanese' },
    { iso_639_1: 'es', english_name: 'Spanish' },
    { iso_639_1: 'fr', english_name: 'French' },
    { iso_639_1: 'zh', english_name: 'Chinese' },
    { iso_639_1: 'ru', english_name: 'Russian' },
    { iso_639_1: 'de', english_name: 'German' },
    { iso_639_1: 'pt', english_name: 'Portuguese' },
  ];

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const params = {
        api_key,
        sort_by: 'vote_average.desc',
        page: Math.floor(Math.random() * 500) + 1, // Random page for different recommendations each time
      };

      if (genre !== 'any') params.with_genres = genre;
      if (selectedLanguage) params.with_original_language = selectedLanguage;
      if (decade !== 'any') {
        params['primary_release_date.gte'] = `${decade}-01-01`;
        params['primary_release_date.lte'] = `${parseInt(decade, 10) + 9}-12-31`;
      }

      const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}`, { params });
      // Sort recommendations by vote_average
      const sortedRecommendations = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
      setRecommendations(sortedRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const decades = [
    { label: 'Any', value: 'any' },
    { label: '2020s', value: '2020' },
    { label: '2010s', value: '2010' },
    { label: '2000s', value: '2000' },
    { label: '1990s', value: '1990' },
    { label: '1980s', value: '1980' },
    { label: '1970s', value: '1970' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      sx={{
        color: 'white',
        mt: 4,
        minHeight: 'calc(100vh - 80px)', // Adjust height for the navbar or any header (if it's 80px)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures the footer is pushed to the bottom
        marginTop:"80px",
        marginBottom:"60px"
      }}
    >
      <Box>
        <Typography variant="h3" gutterBottom>
          Movie/Show Recommendations
        </Typography>
        <TypeSelector type={type} setType={setType} />
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 4,
            bgcolor: '#1E1E1E',
            p: 2,
            borderRadius: 2,
          }}
        >
          <GenreSelect genre={genre} setGenre={setGenre} genres={genres} />
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} languages={popularLanguages} />
          <DecadeSelect decade={decade} setDecade={setDecade} decades={decades} />
          <Button
            type="button" // Prevent form submission
            variant="contained"
            color="primary"
            onClick={fetchRecommendations}
            sx={{ bgcolor: '#B0B0B0', color: '#000', '&:hover': { backgroundColor: '#A0A0A0' }, width: '100%' }}
          >
            Get Recommendations
          </Button>
        </Box>
      </Box>
      <RecommendationsList isLoading={isLoading} recommendations={recommendations} />
    </Container>
  );
};

export default MovieShowRecommendations;
