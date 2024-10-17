import React from 'react';
import { Box, Chip } from '@mui/material';
import { FaFilm, FaTv } from 'react-icons/fa';

const TypeSelector = ({ type, setType }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
    <Chip
      label="Movies"
      icon={<FaFilm />}
      onClick={() => setType('movie')}
      sx={{
        backgroundColor: type === 'movie' ? '#555' : '#333',
        color: 'white',
        cursor: 'pointer',
      }}
    />
    <Chip
      label="Shows"
      icon={<FaTv />}
      onClick={() => setType('tv')}
      sx={{
        backgroundColor: type === 'tv' ? '#555' : '#333',
        color: 'white',
        cursor: 'pointer',
      }}
    />
  </Box>
);

export default TypeSelector;
